package com.cadenceai.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.github.cdimascio.dotenv.Dotenv;

@Service 
public class GeminiService {

    ObjectMapper mapper = new ObjectMapper();

    Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

    String API_KEY = dotenv.get("GEMINI_API_KEY");

    static final String URL =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent";

    public String callGeminiApi(String prompt) throws Exception {
        
        if (API_KEY == null || API_KEY.isBlank()) {
            throw new IllegalStateException("Set GEMINI_API_KEY before starting the chatbot.");
        }


        HttpClient client = HttpClient.newHttpClient();

        // CHANGED: create JSON using Jackson
        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of(
                                "parts", List.of(
                                        Map.of("text", prompt))))
                );

        String jsonBody = mapper.writeValueAsString(body);
        System.out.println(body);

        JsonNode json = sendGeminiRequest(client, jsonBody);
        JsonNode part = json
                .path("candidates")
                .path(0)
                .path("content")
                .path("parts")
                .path(0);

        
        return part.path("text").asText("Gemini did not return a text response.");
    }

    private JsonNode sendGeminiRequest(HttpClient client, String jsonBody) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(URL + "?key=" + API_KEY))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new IllegalStateException("Gemini returned " + response.statusCode()
                    + ": " + response.body());
        }
        return mapper.readTree(response.body());
    }
}
