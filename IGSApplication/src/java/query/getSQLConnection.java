/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package query;

/**
 *
 * @author Alicia
 */

import java.sql.Connection;
import java.sql.DriverManager;

public class getSQLConnection {
    
    public static Connection establishConnection() {
        StoredData stored = new StoredData();
        
        Connection con = null;
        
        try {
            Class.forName(stored.SQLdriver);
            con = DriverManager.getConnection(stored.SQLconnection, stored.SQLuser, stored.SQLpass);
            
        } catch(Exception exc) {
            exc.printStackTrace();
        }
        
       return con;
    }

}
