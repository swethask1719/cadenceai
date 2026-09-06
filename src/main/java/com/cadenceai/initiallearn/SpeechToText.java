package com.cadenceai.initiallearn;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.WebSocket;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.github.cdimascio.dotenv.Dotenv;

public class SpeechToText {

    public static void main(String[] args) throws IOException, InterruptedException {
        ObjectMapper mapper = new ObjectMapper();
        byte[] audio = Files.readAllBytes(
                Path.of("src/main/resources/audio_copy.wav"));
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

        String apiKey = dotenv.get("DEEPGRAM_API_KEY");

        CountDownLatch done = new CountDownLatch(1);

        WebSocket webSocket = HttpClient.newHttpClient()
                .newWebSocketBuilder()
                .header("Authorization", "Token " + apiKey)
                .buildAsync(
                        URI.create(
                                "wss://api.deepgram.com/v1/listen?smart_format=true&language=en&model=nova-3"),
                        new WebSocket.Listener() {

                            @Override
                            public void onOpen(WebSocket webSocket) {
                                System.out.println("Connected to Deepgram");
                                System.out.println("Audio size: " + audio.length);

                                webSocket.sendBinary(ByteBuffer.wrap(audio), true)
                                        .thenRun(() -> {
                                            System.out.println("Audio sent");
                                            webSocket.sendText("{\"type\":\"Finalize\"}", true);
                                            webSocket.sendText("{\"type\":\"CloseStream\"}", true);
                                        });

                                webSocket.request(1);
                            }

                            @Override
                            public void onError(WebSocket webSocket, Throwable error) {
                                System.out.println("Deepgram error:");
                                error.printStackTrace();
                                done.countDown();
                            }

                            @Override
                            public CompletionStage<?> onText(
                                    WebSocket webSocket,
                                    CharSequence data,
                                    boolean last) {

                                try {
                                    JsonNode json = mapper.readTree(data.toString());

                                    boolean isFinal = json
                                            .path("is_final")
                                            .asBoolean(false);

                                    String transcript = json
                                            .path("channel")
                                            .path("alternatives")
                                            .path(0)
                                            .path("transcript")
                                            .asText();

                                    if (isFinal && !transcript.isBlank()) {
                                        System.out.println("Final transcript: " + transcript);
                                    }
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }

                                webSocket.request(1);
                                return null;
                            }

                            @Override
                            public CompletionStage<?> onClose(
                                    WebSocket webSocket,
                                    int statusCode,
                                    String reason) {

                                System.out.println("Deepgram closed: " + statusCode + " - " + reason);
                                done.countDown();
                                return null;
                            }
                        })
                .join();

        boolean closed = done.await(30, TimeUnit.SECONDS);
        if (!closed) {
            System.out.println("Timed out waiting for Deepgram to close the connection.");
        }
    }
}