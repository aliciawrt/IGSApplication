/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var show_code = 0;
var show_content = 0;
var show_help = 0;

// SHOW/DON'T SHOW HELP
function generate_help() {
    if (show_help === 0) {
        $(".help-l").css("display", "block");
        $(".help-r").css("display", "block");
        $(".tutorial").css("display", "block");
        $("#video").css("display", "none");
        $("#videoclip").get(0).pause();
        $(".btnhelp").css("background-image", "url(\"image/help2.png\")");
        show_help = 1;
    } else {
        $(".help-l").css("display", "none");
        $(".help-r").css("display", "none");
        $(".tutorial").css("display", "none");
        $(".btnhelp").css("background-image", "url(\"image/help.png\")");
        show_help = 0;
    }
}


function generate_tutorial() {
    $("#video").css("display", "block");
    $(".help-l").css("display", "none");
    $(".help-r").css("display", "none");
    show_help = 0;
}

// SHOW CONTENT ON CLICK, ONLY ON FIRST CALL
// http://jsfiddle.net/QAaHP/16/
function show_cat(value) {
    $("#subject").attr("placeholder", "Subject " + value.charAt(0).toUpperCase() + value.slice(1));     
    // change placeholder to further stress link between radiobuttons and subject field
    if (show_content === 0) {
        $("#if_show").css("display", "block");
        show_content = 1;
    }
    if (value == "plant" || value == "object") {
        $("#subject").css("width", "99.45%")
        $("#predicate").css("display", "none");
        $("#object").css("display", "none");
    } else {
        $("#subject").css("width", "32.563%")
        $("#predicate").css("display", "inline-block");
        $("#object").css("display", "inline-block");
    }
}


// SHOW/DON'T SHOW SPARQL CODE
function show_SPARQL() {
    if (show_code === 0){
        $("#if_showSPARQL").css("display", "block");
        show_code = 1;
    } else {
        $("#if_showSPARQL").css("display", "none");
        show_code = 0;
    }
}


// PUT USED S/P/O FIELD NAME INTO HIDDEN FIELD, USED FOR OptionController (define which view to use for options)
function put_val(id) {
    var input_id = $("#" + id).attr("id");
    $("#input_name").val(input_id);
}


$(document).ready(function() {
    
    // FOR JS ETC TO RUN ON RELOAD (esp. for firefox)
    // https://stackoverflow.com/a/46532733
    if(performance.navigation.type == 2){
       location.reload(true);
    }


    // CHANGE POSITION OF SCROLLBAR ON CLICK
    // https://stackoverflow.com/a/50601078 
    $(".cat_0").click(function() {
       $("html,body").animate({
          scrollTop: $(".content").offset().top}, 1000);
    });
    $('#addbutton').click(function() {
       $("html,body").animate({
          scrollTop: $(".category_selector").offset().top-20}, 1000);
    });


    // ENDABLE/DISABLE QUERY-BUTTON IF INPUT IS ADDED/DELETED OR CODE MODIFIED
    $("#query").keyup(function () {
        $("#query_submit").prop("disabled", this.value == "" ? true : false);
        $("#query_warn").css("display", "inline-block");     // warn that code has been modified
    });
    
    
    // DISABLE ADDBUTTON + SPECIFIED PLACEMENTS IF SUBJECT, PREDICATE, OBJECT INPUT IS DELETED
    // ENDABLE/DISABLE ADDBUTTON IF KEYWORD INPUT IS CHANGED
    $(".coin_input").keyup(function () {
        if ($("#subject").val() == "" && $("#predicate").val() == "" && $("#object").val() == "" && $("#keyword_search").val() == "") {
            $("#addbutton").prop("disabled", true);
        }
        else if ($("#keyword_search").val() !== "") {
            $("#addbutton").prop("disabled", false);
        }
        if ($("#subject").val() == "" && ($("#specify_placement").css("display") == "block" || $("#hierarchy_info").css("display") == "block")) {
            $("#specify_placement").css("display", "none");
            $("#hierarchy_info").css("display", "none");
            $("#same_entity").prop("checked", false);
        }
    });
 });