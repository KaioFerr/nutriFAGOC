package br.com.nutriFAGOC.adapters.jdbc.http.security

import br.com.nutriFAGOC.application.Food.usuario.UserService
import br.com.nutriFAGOC.domain.food.Foods.usuario.User
import io.jsonwebtoken.JwtBuilder
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.Jwts.SIG
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.util.Date
import javax.crypto.SecretKey

@Component
class JWTUtil (
    private val userService: UserService
) {

    private val expiration: Long = 24 * 60 * 60 * 1000

    @Value("\${jwt.secret}")
    private lateinit var secret: String

    fun generateToken(user: User): String?{
        return Jwts.builder()
            .id(user.id.toString())
            .subject(user.email)
            .expiration(Date(System.currentTimeMillis() + expiration))
            .signWith(getSecretKey(), SIG.HS512)
            .compact()
    }

    private fun getSecretKey(): SecretKey {
        val keyBytes = Decoders.BASE64.decode(secret)
        return Keys.hmacShaKeyFor(keyBytes)
    }

    fun isValid(jwt: String?): Boolean {
        return try {
            Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(jwt)
            true
        } catch (e : JwtException){
            throw e
        }
    }

    fun getAuthotetication(jwt: String?): Authentication {
        val username = Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(jwt).payload.subject
        return UsernamePasswordAuthenticationToken(username, null, null)
    }
}