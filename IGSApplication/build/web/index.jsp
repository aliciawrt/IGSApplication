<%-- 
    Document   : index.jsp
    Created on : 24.06.2019, 17:35:43
    Author     : Alicia
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>

<html>
    <head>
        <title>IGS</title>    <!-- IconoGraphic Search -->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <link rel="stylesheet" type="text/css" href="<c:out value='style.css'/>" />
        <link rel="stylesheet" type="text/css" href="<c:out value='bootstrap.min.css'/>"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

        <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script type="text/javascript" src="<c:out value='changeButtons.js'/>"></script>
        <script type="text/javascript" src="<c:out value='specifyPlacement.js'/>"></script>
        <script type="text/javascript" src="<c:out value='generateSPARQL.js'/>"></script>
        <script type="text/javascript" src="<c:out value='deleteSPARQL.js'/>"></script>
        <script type="text/javascript" src="<c:out value='generateOptions.js'/>"></script>
        
        <!-- 
        
        IMAGE SOURCES 
        all by me, except for...

	- #body background-image: 

            -> pexels-photo-725713
            Navneet Shanu
            Source: https://www.pexels.com/photo/ancient-bronze-coins-gold-725713/
            License: Pexel License, https://www.pexels.com/photo-license/
                     terms of service -> https://www.pexels.com/terms-of-service/
            modified

        - .coins background-image:

            -> coin2
            jharnum (pixabay.com), "Gold Coin Greek Free Picture"
            Source: https://www.needpix.com/photo/863264/gold-coin-greek-money-rich-sign-financial-metal-symbol
            License: https://www.needpix.com/about -> Creative Commons Zero (CC0),
                     https://creativecommons.org/publicdomain/zero/1.0/legalcode
            modified

            -> coin
            Hermann Junghans, "Hemidrachme Kios Vs"
            Source: https://de.wikipedia.org/wiki/Datei:Hemidrachme_Kios_Vs.JPG
            License: Creative Commons (CC) "Namensnennung - Weitergabe unter gleichen Bedingungen 3.0 Deutschland",
                     https://creativecommons.org/licenses/by-sa/3.0/de/legalcode
            modified

        -->
        
    </head>
    <body id="body">
        <div class="wrapper">
        <div class="head"></div>    <!-- for white header -->
                <!-- TUTORIAL -->
        <!-- https://www.w3schools.com/html/html5_video.asp#targetText=The%20controls%20attribute%20adds%20video,the%20browser%20may%20choose%20from. -->
        <div class="video" id="video"><br>
            <p style="font-family:Copperplate Gothic; color:#eeb55b;"><b>TUTORIAL</b></p>
            Use case: <b>"Severus Alexander"</b> with <b>"cuirass"</b> on one side and<br>
            <b>"Female Deities"</b> on the other side of a coin.<br><br>
            <video class="videoclip" id="videoclip" controls>
                <source src="video/Tutorial.mp4" type="video/mp4">Your browser does not support the video tag.
            </video>
            <button type="button" class="closetutorial" onclick="generate_help()">x</button><br>
        </div>

        <!-- HELP BUTTON -->
        <div class="info">
            <button type="button" class="tutorial" onclick="generate_tutorial()">TUTORIAL</button>
            <button type="button" class="btnhelp" title="Help" onclick="generate_help()"></button>
        </div>
        

        
        <div class="content">
            <p id="title" class="headline" style="font-family:Copperplate Gothic; color:#eeb55b; font-size:250%;">ICONOGRAPHIC &nbsp;SEARCH</p><br><br>

            <!-- PRE-CATEGORIES -->
            <div class="category_selector" id="category_selector">
                <div class="help-l">Choose between the supercategories persons, animals, plants or objects <font color="#eeb55b"><b>to serve as subject for querying</b></font>. <br>
                    <font size="1">Right now, only persons are fully functional since animals, plants and objects are not implemented in the RDF dataset yet.</font>
                </div>    <!-- help text -->
                
                <input type="radio" name="cat_0" class="cat_0" id="person" value="person" onclick="show_cat(value)">
                <label class="cat_0_selector person" for="person"></label>
               
                <input type="radio" name="cat_0" class="cat_0" id="animal" value="animal" onclick="show_cat(value)">
                <label class="cat_0_selector animal" for="animal"></label>

                <input type="radio" name="cat_0" class="cat_0" id="plant" value="plant" onclick="show_cat(value)"> 
                <label class="cat_0_selector plant" for="plant"></label>

                <input type="radio" name="cat_0" class="cat_0" id="object_main" value="object" onclick="show_cat(value)">
                <label class="cat_0_selector object_main" for="object_main"></label>
            </div>
            <br>

            <div id="if_show" style="display:none; position:relative">    <!-- shows only after pre-category got selected -->

                <!-- INPUT FIELDS -->
                <div class="help-r">Iconographic representations used to structure and query the dataset. They can be interpreted as <font color="#eeb55b"><b>components of a sentence</b></font>, 
                    e.g. "Artemis holding bow". There will always be a semantic link between the components.</div>
                
                <div style="position:relative;">     <!-- for positioning help-l to keyword input -->
                    <div class="input">
                        <input type="text" id="subject" name="coin_input" class="coin_input" placeholder="Subject" onkeyup="put_val(id)">
                        <input type="text" id="predicate" name="coin_input" class="coin_input" placeholder="Predicate" onkeyup="put_val(id)">
                        <input type="text" id="object" name="coin_input" class="coin_input" placeholder="Object" onkeyup="put_val(id)"><br><br><br>
                        <p style="line-height:14px;text-align:left; color:#eeb55b;"><font style="font-size:15px; font-family:Copperplate Gothic"><b>&nbsp; Keyword Search</b><br>
                            &nbsp;</font><font style="font-size:11px;"> separated by commas</font></p>
                        <input type="text" id="keyword_search" name="keyword_search" class="coin_input" placeholder="Keywords">
                    </div>
                    <div class="help-l" style="bottom:0">Will be matched as they are so check spelling.</div>
                </div>

                <!-- HIDDEN FIELDS TO SAVE LINKS OF INPUT FIELDS FROM OptionController FOR SPARQLController and generateSPARQL.js -->
                <input type="hidden" id="input_name" name="input_name" readonly>
                <input type="hidden" id="subject_link" name="subject_link" readonly>
                <input type="hidden" id="predicate_link" name="predicate_link" readonly>
                <input type="hidden" id="object_link" name="object_link" readonly>
                <div id="labels" name="specify">
                    <input type="hidden" id="subject_label" name="subject_label" readonly>
                    <input type="hidden" id="predicate_label" name="predicate_label" readonly>
                    <input type="hidden" id="object_label" name="object_label" readonly>
                </div>

                <!-- ADD BUTTON + SELECTION -->
                <br><br><div class="addtext">generate SPARQL</div><div class="placementtext">specify placement</div>
                <div style="position:relative;">
                    
                    <button type="button" id="addbutton" class="button" onclick="generate_SPARQL()" disabled>Add</button>
                    
                    <div class="help-r" style="top:0; max-width:35%;"> Possibly multiple <font color="#eeb55b"><b>criteria get added to build the query</b></font> on each click. Later on, 
                        a <font color="#eeb55b"><b>selection of where to place the criteria</b></font> on the marked coin might be made.<br>
                        <table style="border-collapse:collapse;">
                            <tr><td style="white-space:nowrap;"><font color="#eeb55b">new coin</font></td><td> Adds a new coin. Following actions will be taken on that coin and query solutions 
                                    of all coins unioned per or-link. Coins can be removed on click of the x button.</td></tr>
                            <tr><td style="white-space:nowrap;"><font color="#eeb55b">to same side</font></td><td> Adds criteria to the same side of the marked coin. Black box.</td></tr>
                            <tr><td style="white-space:nowrap;"><font color="#eeb55b">to other side</font></td><td> Adds criteria to the other side of the marked coin. Black box with 
                                    decreased opacity.</td></tr>
                            <tr><td style="white-space:nowrap;"><font color="#eeb55b">to coin</font></td><td> Adds criteria somewhere on the marked coin. Gray box.</td></tr>
                        </table>
                            The code is limited to add only two entities on one side of a coin correctly.
                    </div>
                    <div id="select_placement" name="specify" class="select_placement">
                        <select id="placement">
                            <option id="all_coins" value="1" title="or-link" selected>new coin</option>
                            <option id="same_side" value="same">to same side</option>
                            <option id="other_side" value="side">to other side</option>
                            <option id="same_coin" value="coin">to coin</option>
                        </select>
                    </div>
                </div>
                
                <!-- HIERARCHY INFO -->
                <div id="hierarchy_wrapper" style="position:relative; display:none;">
                    <div id="hierarchy_info"><img src="image/hierarchy.png" alt="hierarchy detected" title="Hierarchy detected" style="height:35px;">
                        <div id="specify_placement">to previous
                            <label id="same_entity_label" class="same_entity_label">
                                <input type="checkbox" id="same_entity" name="ifspecify" value="same_entity"> 
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="help-l" style="top:0; max-width:35%;">
                        <img src="image/hierarchy.png" alt="hierarchy detected" style="height:20px;"> 
                        &nbsp;marks the <font color="#eeb55b"><b>detection of an hierarchy</b></font> between the subject of a previously added entity and the new subject input on the 
                        same placement.<br><br>
                        If a direct entity like "Artemis" and a category like "Deities" are input, they will be <font color="#eeb55b"><b>interpreted as two different entities</b></font>. 
                        Errors might occur due to the link to the dataset. <br>
                        However, if two categories are input and an hierarchy gets detected, the user can decide using the <font color="#eeb55b"><b>to previous button</b></font> whether 
                        they want to <font color="#eeb55b"><b>add the input to the previous entity or create a new one</b></font>. Thus, queries like "Female Deities" and "Deities and 
                        Females" on one coin are possible.
                    </div>
                </div>

                <br><br>
                
                <!-- DISPLAY ADDED COINS -->
                <div id="search_container" class="search_container"></div>
                <br>
                
                <!-- QUERY FIELD -->
                <div style="position:relative">
                    <button type="button" id="showSPARQL" class="sparql_button" title="show SPARQL" onclick="show_SPARQL()">{ }</button>
                    
                    <div class="help-l" style="top:0;">Displays the <font color="#eeb55b"><b>generated query</b></font> which can be manually edited. Changes to the query won't be displayed 
                        in the search interface nor saved if new entities get added through it. <br><br>
                        Will be <font color="#eeb55b"><b>processed on click of the query button</b></font>.
                    </div>
                </div>

                <!-- FORM FOR SERVLET -->
                <form id="queryform" action="SPARQLController" method="post" target="_blank">
                        <div id="if_showSPARQL">
                            <textarea id="query" name="query" class="query_input"></textarea><div id="query_warn" title="Code manually edited"></div>
                            <input type="hidden" id="search_code" name="search_code">
                        </div><br>
                    <input type ="submit" id="query_submit" name="query_submit" class="button" value="Query" disabled>
                </form>
            </div>

            <div class="push"></div>    <!-- FOR WHITE FOOTER -->
        </div></div>
        <footer class="footer">
            <div class="sourcetext">IMAGE SOURCES
                <span class="sourcehover">
                    <table>
                        <tr>
                            <td><img src="image/pexels-photo-725713.png" alt="Background picture" width="100" height="75"></td>
                            <td><b>Navneet Shanu</b><br>
                                <b>Source:</b> <a href="https://www.pexels.com/photo/ancient-bronze-coins-gold-725713/">https://www.pexels.com/photo/ancient-bronze-coins-gold-725713/</a><br>
                                <b>License:</b> Pexel License, 
                                <a href="https://www.pexels.com/photo-license/">https://www.pexels.com/photo-license/</a><br>
                                terms of service -> <a href="https://www.pexels.com/terms-of-service/">https://www.pexels.com/terms-of-service/</a><br>
                                <b>modified</b></td>
                        </tr>
                        <tr>
                            <td><img src="image/coin.png" alt="Copper coin" width="100" height="100"></td>
                            <td><b>Hermann Junghans, "Hemidrachme Kios Vs"</b><br>
                                <b>Source:</b> <a href="https://de.wikipedia.org/wiki/Datei:Hemidrachme_Kios_Vs.JPG">https://de.wikipedia.org/wiki/Datei:Hemidrachme_Kios_Vs.JPG</a><br>
                                <b>License:</b> Creative Commons (CC) "Namensnennung - Weitergabe unter gleichen Bedingungen 3.0 Deutschland", 
                                <a href="https://creativecommons.org/licenses/by-sa/3.0/de/legalcode">https://creativecommons.org/licenses/by-sa/3.0/de/legalcode</a><br>
                                <b>modified</b></td>
                        </tr>
                        <tr>
                            <td><img src="image/coin2.png" alt="Golden coin" width="100" height="100"></td>
                            <td><b>jharnum (<a>pixabay.com</a>), "Gold Coin Greek Free Picture"</b><br>
                                <b>Source:</b> <a href="https://www.needpix.com/photo/863264/gold-coin-greek-money-rich-sign-financial-metal-symbol">https://www.needpix.com/photo/863264/gold-coin-greek-money-rich-sign-financial-metal-symbol</a><br>
                                <b>License:</b> <a href="https://www.needpix.com/about">https://www.needpix.com/about</a> -> Creative Commons Zero (CC0), 
                                <a href="https://creativecommons.org/publicdomain/zero/1.0/legalcode">https://creativecommons.org/publicdomain/zero/1.0/legalcode</a><br>
                                <b>modified</b></td>
                        </tr>
                    </table><br>
                    last visited on <b>18.09.2019</b>
                </span>
            </div>
        </footer>
    </body>
</html>