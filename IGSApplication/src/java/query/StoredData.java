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

// Change properties here!

public class StoredData {
    
    String SQLuser = "Reader";
    String SQLpass = "reader";
    String SQLdriver = "com.mysql.jdbc.Driver";
    String SQLconnection = "jdbc:mysql://localhost:3306/igs_application";
    
    public String SQLanimal = "animals";
    public String SQLplant = "plants";
    public String SQLperson = "persons";
    public String SQLrelation = "predicates";
    public String SQLobject = "objects";
    
    public String SPARQLendpoint = "http://localhost:3030/nlp_cnt/query";
            
}