/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function delete_SPARQL(id) {
    
    // https://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
    function get_position(str, pat, n) {
        var L= str.length, i= -1;
        while(n-- && i++<L){
            i= str.indexOf(pat, i);
            if (i < 0) break;
        }
        return i;
    }
    
    var coin_id = id.slice(3);    // because button.id is btncoin_x but we need coin_x
    
    var coin_num = parseInt(coin_id.slice(-1)) - 1;    // for later use, change id to int
    
    $("#" + coin_id).remove();    // remove coin
    
    var coins = $(".coins");
    var coins_btn = $(".btncoin");
    var criteria_wrapper = $(".criteria_wrapper");

    count_all -= 1;
    
    // when every coin got deleted, go back to starting point
    if (count_all <= 0 ) {
        $("#query_submit").prop("disabled", true);
        $("#addbutton").prop("disabled", true);
        $("#query").val("");
        $("#query_warn").css("display", "none");
        newQuery = "";
        count_all = 0;
        // other global counter and save variables get set to initial value by every selection of all_coins in generateSPARQL.js which is set at the end of the function
        array_same = [];
        array_side = [];
        array_coin = [];
    } else {
        // deletion uses the position of certain query elements (UNION, {, }) to find the substring that contains the code of the whole coin 
        // the substring will be replaced by ""

        // last or only one element
        if (coin_num === coins.length) {
            newQuery = newQuery.replace((newQuery.substring(get_position(newQuery, "}", coin_num), newQuery.length)), "");
        } else {
            // first or middle element
            if (coin_num < coins.length && coin_num !== 0) {
                newQuery = newQuery.replace((newQuery.substring(get_position(newQuery, "UNION", coin_num), get_position(newQuery, "}", coin_num+1)+2)), "");
            }
            // first (not only) element
            else if (coin_num === 0) {
                newQuery = newQuery.replace((newQuery.substring(0, get_position(newQuery, "{", 1)+3)), "");
            }

            // change following ids according to deletion of coins
            for (i=0; i<coins.length; i++) {
                var class_num = parseInt((coins[i].id).slice(-1));
                if (coin_num < class_num) {
                    coins[i].id = "coin_" + (class_num-1).toString();
                    coins_btn[i].id = "btncoin_" + (class_num-1).toString();
                    criteria_wrapper[i].id = "criteria_wrapper_" + (class_num-1).toString(); 
                    var coin_criteria = $("#" + criteria_wrapper[i].id + " div");
                    for (j=0; j<coin_criteria.length; j++) {
                        coin_criteria[j].id = "same_coin_" + (class_num-1).toString() + j.toString();
                    }
                }
                
            }
        }
        // set new queries into query field
        if (count_all === 1) {
            $("#query").val(startQuery + newQuery + "}");
        }
        else if (count_all > 1) {
            $("#query").val(startQuery + "{\n\n" + newQuery + "}\n\n}");
        } 
    }
    $("#search_code").val($("#search_container").html());
    $("#placement").val(1).change();    // set selection to all_coins
    $("#select_placement").css("display", "none");
    $(".placementtext").css("display", "none");
    $("#same_entity").prop("checked", false);
    $("#specify_placement").css("display", "none");
    $("#hierarchy_info").css("display", "none");
    $("#hierarchy_wrapper").css("display", "none");
    $("#subject_label").val("");    // since it's the only label that gets used by specifyPlacement.js at the moment
}