<%-- 
    Document   : result.jsp
    Created on : 24.06.2019, 17:35:43
    Author     : Alicia
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>

<html>
    <head>
        <title>IGS Result</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <link rel="stylesheet" type="text/css" href="<c:out value='style.css'/>" />
        <link rel="stylesheet" type="text/css" href="<c:out value='bootstrap.min.css'/>"/>
        <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script type="text/javascript" src="<c:out value='changeButtons.js'/>"></script>

        <script>
            // remove button that would allow to remove a coin
            $(document).ready(function() {
                $(".btncoin").remove();
                $(".coins").css({"border" : "none", "box-shadow" : "none"});
            });
        </script>
        
    </head>
    <body id="body">
        <div class="wrapper">
        <div class="content"> 
            
            <p style="font-family: Copperplate Gothic; color: #eeb55b; font-size: 250%;">ICONOGRAPHIC SEARCH</p>
            <p style="font-family: Copperplate Gothic; color: #eeb55b; font-size: 150%; font-weight:bold">RESULT</p><br><br>
                
                <!-- DISPLAY ADDED COINS -->
                <div id="search_container" class="search_container"><c:out value="${search_container}" escapeXml="false"/></div>
                <br>
                
                <!-- QUERY FIELD -->
                <button type="button" id="showSPARQL" class="sparql_button" onclick="show_SPARQL()">{ }</button>
                
                <div id="if_showSPARQL" style="display:none">
                    <textarea id="query" name="query" class="query_input" readonly><c:out value="${query}"/></textarea>
                </div><br>

                <!-- QUERY RESULT -->
                <div id="dvData">
                    <c:out value="${result}" escapeXml="false"/>
                </div>
            </div>
        </div>
                
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
    </body>
</html>