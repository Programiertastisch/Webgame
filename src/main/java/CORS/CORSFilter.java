package CORS;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter("/*")
public class CORSFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialisierungscode, falls benötigt
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        // CORS-Konfiguration hier setzen, z.B. Header hinzufügen
        response.setHeader("Access-Control-Allow-Origin", "*"); // Hier können Sie die erlaubten Ursprungsdomains angeben
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        // Andere Einstellungen je nach Bedarf hinzufügen

        // Fortsetzen der Anfrageverarbeitung
        filterChain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // Aufräumen und Ressourcen freigeben, wenn benötigt
    }
}
