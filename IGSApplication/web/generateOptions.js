/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// http://zetcode.com/articles/jqueryautocomplete/ 
// https://api.jqueryui.com/autocomplete/

$(function () {
    var fields = ["#subject", "#predicate", "#object"];
    var field = "";
    var marker = "";
    for (i=0; i<fields.length; i++) {
        $(fields[i]).autocomplete({
            source: function(request, response){
                $.post("OptionController", { cat_name : $("input:radio[name=cat_0]:checked").val(), input_name : $("#input_name").val(), term : request.term }, function(data){
                    data = JSON.parse(data);    // convert to javascript object
                    response($.map(data, function(item) {
                        if (item.label == 0) { // needs to stay == not ===
                            marker = item.name;
                        } else { marker = item.name + " (Category)"; }    // add (Category) to every category, though only for autocomplete display
                        return { label: marker, value: item.name, id: item.label, link: item.link };
                }));
                });
            },
            minLength: 3,
            // https://stackoverflow.com/questions/18720359/jquery-autocomplete-force-choice/18724920
            change: function (event, ui) {
                if (!ui.item) {
                    this.value = ''; 
                    $("input[name=coin_input]").trigger("keyup");    // if selection isn't made, trigger event to disable add button in changeButtons.js (if there's no other input)
                }
            },
            select: function (event, ui) {
                if ($("#input_name").val() === "subject") {
                    field = "#subject";
                }
                else if ($("#input_name").val() === "predicate") {
                    field = "#predicate";
                }
                else if ($("#input_name").val() === "object") {
                    field = "#object";
                }
                $(field + "_link").val(ui.item.link);
                $(field + "_label").val(ui.item.id).trigger("change");    // set val and trigger event when label changes, for specifyPlacement.js
                $("#addbutton").prop("disabled", false);
            }
        });
    }
});

