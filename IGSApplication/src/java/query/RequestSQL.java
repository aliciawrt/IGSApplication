/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package query;

import java.sql.*;
import org.apache.jena.atlas.json.JsonArray;
import org.apache.jena.atlas.json.JsonObject;

/**
 *
 * @author Alicia
 */

public class RequestSQL {

    public static JsonArray showOptions(String input, String table) throws SQLException {
        
        JsonArray result = new JsonArray();

        Connection con = getSQLConnection.establishConnection();
        Statement stmtopt = con.createStatement();
        
        // query SQL statement
        // checks for siminar names, alternativenames or typos
        ResultSet options = stmtopt.executeQuery("SELECT t.name, t.link, t.label FROM " + table + " t WHERE t.name LIKE \"%" + input + "%\" OR t.alternativenames LIKE \"%" + 
                input + "%\" OR t.typos LIKE \"%" + input + "%\";");
        
        // put results to JsonObject
        while (options.next()) {
            JsonObject resultobject = new JsonObject();
            // https://stackoverflow.com/questions/20677326/how-to-add-whitepaces-between-each-capital-letter
            // change display of options to more user friendly one by adding whitespaces
            resultobject.put("name", options.getString("name").replace("_", " ").replaceAll("\\d+", "").replaceAll("(.)([A-Z])", "$1 $2").replace("II I", "III"));
            resultobject.put("link", "<" + options.getString("link") + ">");    // add <> for SPARQL
            resultobject.put("label", options.getString("label"));    // for knowing which relation to use (type for category, exactMatch for everything else)
            result.add(resultobject);
        }
        return result;
    }
    
     public static void main(String[] args) throws SQLException {  
         RequestSQL sql = new RequestSQL();
    }
}
