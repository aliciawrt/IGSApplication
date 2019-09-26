/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// SHOW/DON'T SHOW IF HIERARCHY GETS DETECTED

var hierarchy = "false";     // for checking whether FILTER() etc is needed in generateSPARQL.js

$(document).ready(function() {
    // checks labels and select_placement fields
    $("div[name=specify]").on("change", function() {
        var label = $("#subject_label").val();
        
        if (($("#same_side").is(":selected") && !(array_same[0] == 0 && label == 0) || 
                $("#other_side").is(":selected") && count_side > 0 && !(array_side[0] == 0 && label == 0) || 
                $("#same_coin").is(":selected") && count_coin > 0 && !(array_coin[0] == 0 && label == 0)) 
                && !($("#subject").val() == "")) {
            // if anything except all_coins is selected and old and new label aren't 0 AND value of subject input isn't empty

            var pass_array = [];
            
            // set variables according to what is selected
            if ($("#same_side").is(":selected")) {
                pass_array = array_same;
            }
            else if ($("#other_side").is(":selected")) {
                pass_array = array_side;
            }
            else if ($("#same_coin").is(":selected")) {
                pass_array = array_coin;
            }

            // set relation according to label (category or direct entity)
            if (label == 0) {
                relation = " skos:exactMatch ";
            } else { relation = " rdf:type "; }

            // CHECK FOR BETWEEN OLD AND NEW ENTITY
            $.ajax({
            type:"POST",
            url: "HierarchyController",
            data: { prev_link : pass_array[1], prev_relation : pass_array[2], cur_link : $("#subject_link").val(), cur_relation: relation },
            success: function(data){
                hierarchy = data.toString();
                },
            async:false
            });


            if (hierarchy === "true") {
                $("#hierarchy_info").css("display", "block");
                $("#hierarchy_wrapper").css("display", "block");                
                // if a direct entity and a category are input
                if (pass_array[0] !== label) {
                    $("#same_entity").prop("checked", false);
                    $("#specify_placement").css("display", "none");
                } else if ($("#predicate").val() == "" && $("#object").val() == "")  {
                    // if two categories are input
                    
                    // also only if only subject is input, otherwise it doesn't make sense at the moment
                    // predicate can't be a category right now, so it only has one instance per id which is linked by skos:exactMatch therefore multiple instances can't 
                       // be added to predicate to the code -> they don't exist
                    // while object can be a category, one would have to check the labels of its inputs before as not to add multiple instances linked by skos:exactMatch -> can't be
                    // instead, additions to predicates or objects should be added like usually as in "Artemis holding bow, drawing arrow" -> "Artemis holding bow" and "Artemis drawing arrow"

                    $("#specify_placement").css("display", "inline-block");
                }
            // if hierarchy != true
            } else { 
                hierarchy = "false";
                $("#hierarchy_wrapper").css("display", "none");
                $("#hierarchy_info").css("display", "none");
                $("#specify_placement").css("display", "none"); //none
                $("#same_entity").prop("checked", false);
            }
        // if labels are both 0 or no subject input is made or all_coins is selected
        } else {
            hierarchy = "false";
            $("#hierarchy_wrapper").css("display", "none");
            $("#hierarchy_info").css("display", "none");
            $("#specify_placement").css("display", "none"); // none
            $("#same_entity").prop("checked", false);
        }
    });
});