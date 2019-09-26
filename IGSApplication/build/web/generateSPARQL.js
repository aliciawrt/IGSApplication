/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var count_all = 0;    // counts coins
var count_same = 0;    // counts additions to same coin/side or other side
var count_side = 0;    // counts additions to other side
var count_coin = 0;    // counts addition to same coin
var count_same_keyword = 0;    // counts keywords on one coin
var count_side_first = 0;    // saves first addition to the other side, used for putting all following additions together
var count_coin_first = 0;

var prefixes = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
        "PREFIX dcterms: <http://purl.org/dc/terms/>\n" +
        "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n";

var startQuery = prefixes + "\nSELECT DISTINCT ?id ?link WHERE {\n\n";

var newQuery = "";    // will get filled by function

var endQuery = "\t?bag rdf:li ?node .\n" +
    "\t?design dcterms:hasPart ?bag ;\n" +
    "\t\tdcterms:source ?coin .\n" +
    "\t?coin dcterms:title ?id ;\n" +
    "\t\tskos:exactMatch ?link .\n\n";


// initialization of arrays used to save certain subject aspects to use for specifying if hierarchy between subjects exists (specifyPlacement.js)
// form: [label, link, relation, count_same of last entity for that side]

// same side
var array_same = [];

// other side
var array_side = [];

// same coin
var array_coin = [];

// https://stackoverflow.com/a/11926475
var odd = function(x) {return x & 1;};    // to use a different background picture for coins when count_all is odd or even


function generate_SPARQL(){
    
    var coin_input = $("input[name=coin_input]");    // get subject, predicate, object input
            
    var placement_input = $("#placement option:selected").attr("id");    // get selected placement option id (coin, to coin, ...)
    var placement_val = $("#placement option:selected").attr("value");    // get value of selected option, only used for eval
    
    var keyword_val = $("#keyword_search").val();    // get keyword input
   
    var count_input = 0;    // counter to check whether input was made
    var count_keywords = 0;    // counter to check whether keyword input is made

    var addQuery = "";    // if addition to another coin is made
    var sameQuery = "";    // if addition to same coin is made
    var keywordQuery = "";    // for keyword search
    
    var relation = "";

    // arrays for user display
    var add_input = [];    // values of subject, predicate, object input
    var add_link = [];    // uri of subject, predicate, object input
    var keywords = "";    // keywords, separated by commas

    var prev_entity = 0;    // used for distinguishing between addition of new entity (0) or to previous entity (1), mostly for separating input
    var display_id = 0;    // to append to correct div for display
    
    
    
    // TRANSLATE SUBJECT, PREDICATE, OBJECT INPUT

    // checking all input fields is neccessary when generateSPARQL() is called, the code is only different by values and variable names thus for loop can be used to fill newQuery
    for (j=0; j<coin_input.length; j++) {
        // if there is an input
        if (coin_input[j].value !== "") {
            count_input = 1;

            var link = $("#" + coin_input[j].id + "_link").val();
            add_link.push(link.slice(1,-1));    // put uris to array for user display, get rid of <> needed for SPARQL
            add_input.push(coin_input[j].value);    // put names to array for user display

            var label = $("#" + coin_input[j].id + "_label").val();     // get label taken from SQL view and generate relation according to it
            if (label == 1) {
                relation = " rdf:type ";    // entity is a category
            } else { relation = " skos:exactMatch "; }    // entity is a direct subject or object

            // generate query according to selected placement
            if (placement_input == "all_coins") {
                // also if selection can't be made, program sets it to all_coins
                // addQuery is needed so it UNION can be added later on and all_coins can still be the default option if no coin is added yet
                addQuery += "\t?" + coin_input[j].id + relation + link + " .\n" +
                    "\t?node rdf:" + coin_input[j].id + " ?" + coin_input[j].id + " .\n";

                // save every first input of a coin for later use, especially for specifying where to place input if hierarchy exists and same_side is selected (specifyPlacement.js)
                if (coin_input[j].id == "subject") {
                    // for checking hierarchy
                    
                    array_same[0] = label;
                    array_same[1] = link;
                    array_same[2] = relation;
                    array_same[3] = "";
                }
            }
            else {
                // only needed if another entity is added, not when added to existing entity
                if (!($("#same_entity").is(":checked"))) {
                    newQuery += "\t?" + coin_input[j].id + count_same + relation + link + " .\n" +
                            "\t?node" + count_same + " rdf:" + coin_input[j].id + " ?" + coin_input[j].id + count_same + " .\n";
                    sameQuery = generate_entity(placement_val, coin_input[j].id, label, link, relation);

                // if same_entity is checked
                } else if (hierarchy == "true") {
                    prev_entity = 1;
                    // specify subject further
                    newQuery += "\t?" + coin_input[j].id + (eval("array_" + placement_val))[3] + relation + link + " .\n\n";
                    if ((eval("array_" + placement_val))[3] === "") {
                       // since same_side doesn't have count_same to their variables but the first .criteria-div starts with 0
                       display_id = 0;
                    } else { display_id = (eval("array_" + placement_val))[3] + 1; }
                }
            }
        }
        // empty fields
        $("#" + coin_input[j].id + "_link").val("");
        $("#" + coin_input[j].id + "_label").val("");;
        coin_input[j].value = "";
    }   


    // TRANSLATE REST OF QUERY
    
    // a new coin is added
    if (placement_input == "all_coins") {
        if (count_all > 0) {
            addQuery = "}\nUNION\n{\n\n" + addQuery;     // so newQuery can be put accordingly
        }
        // set everything to initial value for new coin
        count_same = 0;
        count_side = 0;
        count_coin = 0;
        count_same_keyword = 0;

        // array_same gets set above
        array_side.length = 0;
        array_side[3] = 0;
        array_coin.length = 0;
        array_coin[3] = 0;


        newQuery += addQuery + endQuery;
        count_all += 1;
    } else {

        // a new criteria is added to the same side of the marked coin
        if (placement_input == "same_side") { 
            // if there is no hierarchy and criteria get added as new entities
            if (prev_entity !== 1 && count_input == 1) { newQuery += "\t?bag rdf:li ?node" + count_same + " .\n\n" + sameQuery; }
            // newQuery gets modified here since ?bag only appears once
            // for every subject, predicate, object input, otherwise it's already given in endQuery
        }

        else {
            // new criteria are added to coin or other side of coin

            // only for first addition
            if ((eval("count_" + placement_val)) == 0) {
                // only if subject, predicate, object input is made, not needed for keywords
                if (count_input == 1) { newQuery += "\t?bag" + count_same + " rdf:li ?node" + count_same + " .\n"; }

                newQuery += "\t?design" + count_same + " dcterms:hasPart ?bag" + count_same + " ;\n" +
                    "\t\tdcterms:source ?coin . \n\n";
                if (placement_input == "other_side") { 
                    newQuery += "\tFILTER(?design != ?design" + count_same + ")\n\n"; 
                    count_side_first = count_same;     // save count_same for first other_side/to coin so it can be used to put all inputs in the same ?bag
                } else { count_coin_first = count_same; }
            }
            if (prev_entity !== 1) {
                if (count_input == 1 && (eval("count_" + placement_val)) == 1) { newQuery += "\t?bag" + (eval("count_" + placement_val + "_first")) + " rdf:li ?node" + 
                            count_same + " .\n\n" + sameQuery; }
                if (placement_input == "other_side") { count_side = 1 } else {count_coin = 1 }
            }
        }
    }


    // TRANSLATE KEYWORD INPUT

    if (keyword_val !== "") {
        count_keywords = 1;
        keyword_return = generate_keywords(keyword_val, count_same_keyword, placement_input, count_side_first, count_coin_first);
        keywords = keyword_return[0];
        if (count_input == 1) {
            keywords = ", " + keywords;    // because keywords will be put after S/P/O names
        }
        keywordQuery = keyword_return[1];
        count_same_keyword = keyword_return[2];
    }

    newQuery += keywordQuery;


    // OUTPUT FINAL QUERY

    if (count_all == 1) {
        $("#query").val(startQuery + newQuery + "}");
    } else {
        $("#query").val(startQuery + "{\n\n" + newQuery + "}\n\n}");     // add {} for UNION syntax
    }


    // GENERATE USER DISPLAY

    generate_display(prev_entity, placement_input, add_input, add_link, keywords, count_keywords, display_id);

}


// TRANSLATE KEYWORDS
function generate_keywords(keyword_val, count_same_keyword, placement_input, count_side_first, count_coin_first) {
    
    var keyword_list = keyword_val.split(",");
    $("#keyword_search").val("");

    var tempQuery = "";

    for (i=0; i<keyword_list.length; i++) {
        // ?design of all_coins or same_side doesn't have count_same
        if (placement_input == "all_coins" || placement_input == "same_side") {
            tempQuery += "\t?design dcterms:description ?string" + count_same_keyword + " .\n" +
                "\tFILTER regex(?string" + count_same_keyword + ", \"" + keyword_list[i].trim() + "\")\n\n";
        } else {
            if (placement_input == "other_side") {
                design_keyword = count_side_first;     // add keyword to correct design (other side, to coin)
            } else { design_keyword = count_coin_first; }
            tempQuery += "\t?design" + design_keyword + " dcterms:description ?string" + count_same_keyword + " .\n" +
                "\tFILTER regex(?string" + count_same_keyword + ", \"" + keyword_list[i].trim() + "\")\n\n";
        }
        count_same_keyword += 1;
    }
    keyword_list = keyword_list.join(", ");

    return [keyword_list, tempQuery, count_same_keyword];
}


// TRANSLATE NEW ENTITY
function generate_entity(placement_val, coin_input, label, link, relation) {
    
    var tempQuery = "";

    // will be saved for possible later use if e.g. an input is added to the other side of a coin, another input is added to the same side of a coin and the next
    // input should be added to the other side of that coin again
    if (coin_input == "subject") {
        // for checking hierarchy of newly added entity, based on it now and not previous entity
        eval("array_" + placement_val)[0] = label;
        eval("array_" + placement_val)[1] = link;
        eval("array_" + placement_val)[2] = relation;

        if (hierarchy == "true") {
            // the comparison (?subjectx != ?subjecty) doesn't work for certain iconographic subjects that are instances of multiple subjects in the rdf dataset
            // (high granularity) e.g. Apollo belongs to the subjects with id 12 and 168 who are either classes to the instances Greek or Roman
            // also "to coin" doesn't check for hierarchy between its subject and the old subjects of other_side or same_side
            // and it only workes for two hierarchical entites on one side atm -> no transitivity
            tempQuery = "\tFILTER(?subject" + (eval("array_" + placement_val))[3] + " != ?subject" + count_same + ")\n\n";
        }
        eval("array_" + placement_val)[3] = count_same;
    }
    return tempQuery;

}


// USER DISPLAY: MODIFY OR APPEND TO INDEX.JSP
function generate_display(entity, placement, input, links, keywords, count_key, display_id) {
    
    var placement_class = "";

    if (placement == "all_coins") {
        if (count_all == 1) {
            $("#query_submit").prop("disabled", false);
        }

        $("#select_placement").css("display", "inline-block");     // enable selection
        $(".placementtext").css("display", "inline-block");
        $("#coin_" + (count_all-1)).css({"border" : "none", "box-shadow" : "none"});     // change "focus" to newly added coin since next actions will be taken there

        // adding coin to search_container (for user display) as follows
        // .coins represents the coin itself, does also have a background image defined above
        // .criteria_wrapper defines the space in which .criteria get added so they won't overflow the round borders of .coins and a scrollbar can be added (style.css)
        // .criteria are the divs containing the input after each click on the add-button
        // .btncoin is added so each element of .coins can be deleted again (see deleteSPARQL.js)
        $("#search_container").append("<div id=\"coin_" + count_all + "\" class=\"coins\"><div id=\"criteria_wrapper_" + count_all + "\" class=\"criteria_wrapper\">\
            <div id=\"same_coin_" + count_all + count_same + "\" class=\"criteria\"></div></div>\
            <button id=\"btncoin_" + count_all + "\" class=\"btncoin\" onclick=\"delete_SPARQL(id)\">x</button></div>")

        if (!odd(count_all)) {
            $("#coin_" + count_all).css("background-image", "url(\"image/coin2.png\")");     // changes image every next coin
        }
        
    } else {
        if (placement == "same_side") {
            placement_class = "criteria";
        }
        else if (placement == "other_side") {
            placement_class = "side_criteria";
        }
        else if (placement == "same_coin") {
            placement_class = "coin_criteria";
        }
        
        // if there is no hierarchy and criteria get added as new entities
        if (entity !== 1) {
            count_same += 1;
            // add new placement_class to the correct .criteria_wrapper id
            $("#criteria_wrapper_" + count_all).append("<div id=\"same_coin_" + count_all + count_same + "\" class=\"" + placement_class + "\"></div>")

        }
    }
    
    put_display(input, links, keywords, entity, count_key, display_id);
    
    $("#search_code").val($("#search_container").html());   // save for servlet

    $("#addbutton").prop("disabled", true);

    $("#same_entity").prop("checked", false);
    $("#select_specified").css("display", "none");
    $("#hierarchy_info").css("display", "none");
    $("#hierarchy_wrapper").css("display", "none");
    if ($("#query_warn").css("display") == "inline-block") {
        $("#query_warn").css("display", "none");
        console.log("changes in code are not saved!");
    }
}


// PUT NAMES + URI TO USER DISPLAY
function put_display(input, links, keywords, entity, count_key, display) {

    for (i=0; i<input.length; i++) {
        // only for adding correct commas to separate inputs or keywords and put uris to input values
        
        if (i == 0) {
            input[i] = "<a href=\"" + links[i] + "\" title=\"" + links[i] + "\">" + input[i] + "</a>";
        } else { input[i] = ", <a href=\"" + links[i] + "\" title=\"" + links[i] + "\">" + input[i] + "</a>"; }

        // if same_entity is not checked, add new entity
        if (entity == 0) {
            $("#same_coin_" + count_all + count_same).append(input[i]);
        }
        
        // if same_entity is checked, add to previous entity with display_id
        if (entity == 1) {
            $("#same_coin_" + count_all + display).append(", " + input[i]);
        }
    }
    
    // add keywords
    if (count_key == 1) {
        $("#same_coin_" + count_all + count_same).append("<i>" + keywords + "</i>");
    }
}