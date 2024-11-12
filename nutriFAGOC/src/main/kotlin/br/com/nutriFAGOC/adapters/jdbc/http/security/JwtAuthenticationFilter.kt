package br.com.nutriFAGOC.adapters.jdbc.http.security

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.OncePerRequestFilter

class JwtAuthenticationFilter(
    private val jwtUltil: JWTUtil
): OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        if (request.headerNames.toList().contains("authorization")){
            val token = request.getHeader("Authorization")
            val jwt = getTokenDetail(token)

            if(jwtUltil.isValid(jwt)){
                val authentication = jwtUltil.getAuthotetication(jwt)
                SecurityContextHolder.getContext().authentication = authentication
            }
        }
        filterChain.doFilter(request, response)
    }

    private fun getTokenDetail(token: String?): String? {
        return token?.let { jwt ->
            jwt.startsWith("Bearer")
            jwt.substring(7, jwt.length)
        }
    }
}