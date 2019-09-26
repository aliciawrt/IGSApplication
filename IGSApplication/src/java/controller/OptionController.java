/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.jena.atlas.json.JsonArray;

import query.RequestSQL;
import query.StoredData;

/**
 *
 * @author Alicia
 */

@WebServlet(name = "OptionController", urlPatterns = {"/OptionController"})
public class OptionController extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try (PrintWriter out = response.getWriter()) { 
        response.setContentType("text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        StoredData stored = new StoredData();
        String table = null;

        String input_name = request.getParameter("input_name");
        String cat_name = request.getParameter("cat_name");
        
        // match correct views to selected pre-categories and input fields
        if (null != input_name)switch (input_name) {
                case "subject":
                    if ("person".equals(cat_name)){
                        table = stored.SQLperson;
                    }
                    else if ("animal".equals(cat_name)){
                        table = stored.SQLanimal;
                    }
                    else if ("plant".equals(cat_name)){
                        table = stored.SQLplant;
                    }
                    else if ("object".equals(cat_name)){
                        table = stored.SQLobject;    // atm same view as the view for iconographic object
                    }

                    break;
                case "predicate":
                    table = stored.SQLrelation;
                    break;
                case "object":
                    table = stored.SQLobject;
                    break;
            }
        
        String term = request.getParameter("term");

        JsonArray input = RequestSQL.showOptions(term, table);
        String json = input.toString();    // change JsonArray to String for javascript
        
        out.write(json);
        
        } catch (Exception e) {
            System.out.println(e.getMessage()); 
        }
    }
    

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
