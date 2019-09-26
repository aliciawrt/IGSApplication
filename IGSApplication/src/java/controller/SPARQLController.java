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

import query.RequestFuseki;
import query.StoredData;

/**
 *
 * @author Alicia
 */

@WebServlet(name = "SPARQLController", urlPatterns = {"/SPARQLController"})
public class SPARQLController extends HttpServlet {

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
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            StoredData stored = new StoredData();
            RequestFuseki fuseki = new RequestFuseki();
            
            String query = request.getParameter("query");
            request.setAttribute("query", query);
            
            String search_container = request.getParameter("search_code");
            // just so XSS Auditor Error doesn't occur due to JavaScript being sent through Servlet
            search_container = search_container.replace("onclick", "name");
            request.setAttribute("search_container", search_container);
            
            String result = request.getParameter("result");

            if (query != null) {
                result = fuseki.queryAsHTML(stored.SPARQLendpoint, query);
                request.setAttribute("result", result);

                String querytype = "result";
                this.dispatch(querytype, request, response);
            }
            
        } catch (Exception e){
            System.out.println(e.getMessage()); 
        }
    }

    // @ QueryAFE by professorship
    
    void dispatch(String userPath, HttpServletRequest request, HttpServletResponse response) {
        // use RequestDispatcher to forward request internally
        String url = userPath + ".jsp";
        System.out.println("Requested URL: " + url);

        try {
            request.getRequestDispatcher(url).forward(request, response);
        } catch (Exception ex) {
            System.out.println(ex.getLocalizedMessage());
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
