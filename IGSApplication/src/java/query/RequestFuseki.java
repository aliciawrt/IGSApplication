/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package query;

import java.io.IOException;
import org.xml.sax.*;
import org.xml.sax.helpers.*;
import java.io.StringReader;
import java.io.FileNotFoundException;

import com.hp.hpl.jena.query.QueryExecution;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.query.ResultSetFormatter;

/**
 *
 * @author Alicia
 */

// https://jena.apache.org/documentation/query/app_api.html
// https://jena.apache.org/documentation/javadoc/arq/org/apache/jena/query/QueryExecution.html
// https://gist.github.com/thiloplanz/f2d279cfc0880327a197/

public class RequestFuseki {

        public boolean executeASK(String serviceURI, String query) {
            QueryExecution q = QueryExecutionFactory.sparqlService(serviceURI,
                            query);
            boolean result = q.execAsk();

            return result;
        }

	public String executeSPARQLQuery(String serviceURI, String query) {
		QueryExecution q = QueryExecutionFactory.sparqlService(serviceURI,
				query);
		ResultSet results = q.execSelect();

                return ResultSetFormatter.asXMLString(results);
	}
        
        
    // @ QueryAFE by professorship
    public String queryAsHTML(String service, String query) {
        return this.asHTML(executeSPARQLQuery(service, query));
    }
    //calling the SPARQLCMLHandler class to format the output table properly
    private String asHTML(String result) {
        SPARQLXMLHandler handler = new SPARQLXMLHandler();
        try {
            // generating a XMLReader
            XMLReader xmlReader = XMLReaderFactory.createXMLReader();
            // InputSource for XML Data
            InputSource inputSource = new InputSource(new StringReader(result));
            // ContentHandler 
            xmlReader.setContentHandler(handler);
            // start parsing
            xmlReader.parse(inputSource);
        } catch (FileNotFoundException e) {
        } catch (IOException | SAXException e) {
        }
        return handler.getSb().toString();
    }

    public static void main(String[] argv) throws IOException {
            RequestFuseki rq = new RequestFuseki();
    }
}