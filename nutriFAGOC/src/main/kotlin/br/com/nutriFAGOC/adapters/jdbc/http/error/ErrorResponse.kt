package br.com.nutriFAGOC.adapters.jdbc.http.error


import kotlinx.serialization.Serializable
import java.util.UUID

@Serializable
data class ErrorResponse (
    @Serializable(with = UUIDSerializer::class) val id: UUID? = null,
    val message: String,
)