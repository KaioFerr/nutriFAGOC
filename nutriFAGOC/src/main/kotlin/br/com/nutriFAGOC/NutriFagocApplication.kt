package br.com.nutriFAGOC

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.io.Encoders
import kotlinx.serialization.encoding.Encoder
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class NutriFagocApplication

fun main(args: Array<String>) {

	runApplication<NutriFagocApplication>(*args)
}
