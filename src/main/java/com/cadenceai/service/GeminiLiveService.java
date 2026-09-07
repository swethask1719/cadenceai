package com.cadenceai.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.WebSocket;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

import io.github.cdimascio.dotenv.Dotenv;

@Service
public class GeminiLiveService {

    private final Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
    private final String apiKey = dotenv.get("GEMINI_API_KEY");

    private static final String MODEL = "gemini-3.1-flash-live-preview";

    public void connect() throws InterruptedException {

        String url = "wss://generativelanguage.googleapis.com/ws/"
                + "google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent"
                + "?key=" + apiKey;

        CountDownLatch done = new CountDownLatch(1);

        WebSocket webSocket = HttpClient.newHttpClient()
                .newWebSocketBuilder()
                .buildAsync(
                        URI.create(url),
                        new WebSocket.Listener() {

                            @Override
                            public void onOpen(WebSocket webSocket) {
                                System.out.println("Connected to Gemini Live");

                                String setupMessage = """
                                        {
                                          "setup": {
                                            "model": "models/%s",
                                            "generationConfig": {
                                              "responseModalities": ["AUDIO"]
                                            }
                                          }
                                        }
                                        """.formatted(MODEL);

                                webSocket.sendText(setupMessage, true);
                                webSocket.request(1);
                            }

                            @Override
                            public CompletionStage<?> onText(
                                    WebSocket webSocket,
                                    CharSequence data,
                                    boolean last) {

                                System.out.println("Gemini Live: " + data);

                                if (data.toString().contains("setupComplete")) {
                                    String turnMessage = """
                                            {
                                              "clientContent": {
                                                "turns": [
                                                  {
                                                    "role": "user",
                                                    "parts": [{ "text": "Say hello in one short sentence." }]
                                                  }
                                                ],
                                                "turnComplete": true
                                              }
                                            }
                                            """;
                                    webSocket.sendText(turnMessage, true);
                                }

                                webSocket.request(1);
                                return null;
                            }

                            @Override
                            public CompletionStage<?> onBinary(
                                    WebSocket webSocket,
                                    java.nio.ByteBuffer data,
                                    boolean last) {

                                byte[] bytes = new byte[data.remaining()];
                                data.get(bytes);
                                String text = new String(bytes, java.nio.charset.StandardCharsets.UTF_8);

                                System.out.println("Gemini Live: " + text);

                                if (text.contains("setupComplete")) {
                                    String turnMessage = """
                                            {
                                              "clientContent": {
                                                "turns": [
                                                  {
                                                    "role": "user",
                                                    "parts": [{ "text": "Say hello in one short sentence." }]
                                                  }
                                                ],
                                                "turnComplete": true
                                              }
                                            }
                                            """;
                                    webSocket.sendText(turnMessage, true);
                                }

                                webSocket.request(1);
                                return null;
                            }

                            @Override
                            public void onError(
                                    WebSocket webSocket,
                                    Throwable error) {

                                error.printStackTrace();
                                done.countDown();
                            }

                            @Override
                            public CompletionStage<?> onClose(
                                    WebSocket webSocket,
                                    int statusCode,
                                    String reason) {

                                System.out.println(
                                        "Gemini Live closed: "
                                                + statusCode
                                                + " - "
                                                + reason);
                                done.countDown();
                                return null;
                            }
                        })
                .join();

        boolean closed = done.await(30, TimeUnit.SECONDS);
        if (!closed) {
            System.out.println("Timed out waiting for Gemini Live to close the connection.");
        }
    }
}