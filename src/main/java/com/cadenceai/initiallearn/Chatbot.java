package com.cadenceai.initiallearn;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.github.cdimascio.dotenv.Dotenv;

@Service 
public class Chatbot {
    Scanner scanner = new Scanner(System.in);

   List<Map<String, String>> history = new ArrayList<>();
    ObjectMapper mapper = new ObjectMapper();

    Dotenv dotenv = Dotenv.load();

   String API_KEY = dotenv.get("GEMINI_API_KEY");

    static final String URL =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent";

public void initialize(){
while (true) {

    String input = scanner.nextLine();

   try{
    String historyJson = mapper.writeValueAsString(history);

                String prompt =
                    historyJson + "\nUser: " + input;

    String response = callGeminiApi(prompt);

    System.out.println("Gemini: " + response);

   
    history.add(Map.of(
        "input", input,
        "response", response
    ));
} catch(Exception ex){
    ex.printStackTrace();
}
}
}

private String callGeminiApi(String prompt) throws Exception {

        HttpClient client = HttpClient.newHttpClient();

        // CHANGED: create JSON using Jackson
        Map<String, Object> body = Map.of(
            "contents", List.of(
                Map.of(
                    "parts", List.of(
                        Map.of("text", prompt)
                    )
                )
            )
        );

        String jsonBody = mapper.writeValueAsString(body);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(URL + "?key=" + API_KEY))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());
        // JsonNode response = mapper.map(response, JsonNode)
        return response.body();
    }
}



