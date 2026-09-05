package com.cadenceai.initiallearn;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.github.cdimascio.dotenv.Dotenv;

@Service 
public class Chatbot {
    Scanner scanner = new Scanner(System.in);

   List<Map<String, String>> history = new ArrayList<>();
    ObjectMapper mapper = new ObjectMapper();

    Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

   String API_KEY = dotenv.get("GEMINI_API_KEY");

    static final String URL =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent";

public void initialize(){
System.out.println("Chatbot started. Type 'exit' to stop.");
while (true) {

    String input = scanner.nextLine();

    if (input.equalsIgnoreCase("exit")) {
        System.out.println("Goodbye!");
        break;
    }

    if (input.isBlank()) {
        continue;
    }

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
    Map<String, Object> functionDeclaration = new HashMap<>();

        functionDeclaration.put("name", "calculateSum");
        functionDeclaration.put("description", "Adds two numbers");
    Map<String, Object> properties = new HashMap<>();

        properties.put("a", Map.of("type", "NUMBER"));
        properties.put("b", Map.of("type", "NUMBER"));
    
    Map<String, Object> parameters = new HashMap<>();

        parameters.put("type", "OBJECT");
        parameters.put("properties", properties);
        parameters.put("required", List.of("a", "b"));
    
        functionDeclaration.put("parameters", parameters);

    Map<String, Object> tool = new HashMap<>();

        tool.put("functionDeclarations",List.of(functionDeclaration));

        if (API_KEY == null || API_KEY.isBlank()) {
            throw new IllegalStateException("Set GEMINI_API_KEY before starting the chatbot.");
        }

        HttpClient client = HttpClient.newHttpClient();

        // CHANGED: create JSON using Jackson
        Map<String, Object> body = Map.of(
            "contents", List.of(
                Map.of(
                    "parts", List.of(
                        Map.of("text", prompt)
                    )
                )
            ),
            "tools", List.of(tool)
        );

        String jsonBody = mapper.writeValueAsString(body);
        System.out.println(jsonBody);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(URL + "?key=" + API_KEY))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new IllegalStateException("Gemini returned " + response.statusCode()
                    + ": " + response.body());
        }
        JsonNode json = mapper.readTree(response.body());
        JsonNode part = json
                .path("candidates")
                .path(0)
                .path("content")
                .path("parts")
                .path(0);

        if (part.has("functionCall")) {

            JsonNode functionCall =
                    part.path("functionCall");

            String functionName =
                    functionCall.path("name").asText();

            JsonNode args =
                    functionCall.path("args");

            int a = args.path("a").asInt();
            int b = args.path("b").asInt();


            if (functionName.equals("calculateSum")) {

                int result = ToolCalling.calculateSum(a, b);

                System.out.println("Result = " + result);

                return "Tool result: " + result;
            }

            return "Unknown tool: " + functionName;
        }

        return part
                .path("text")
                .asText("Gemini did not return a text response.");
    }
}


