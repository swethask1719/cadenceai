package com.cadenceai.websocket;

import java.io.IOException;
import java.nio.ByteBuffer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;

/**
 * Handles a single voice practice session over WebSocket.
 *
 * Responsibilities (to be wired up):
 *  - Stream incoming audio chunks to the STT provider
 *  - Forward transcribed text to the reasoning layer (Gemini) for the coach's next turn
 *  - Stream synthesized speech back to the client
 *  - Publish each turn (transcript, timestamps, session id) to Kafka for async evaluation
 *
 * Currently a skeleton: connection lifecycle only, no pipeline wiring yet.
 */
@Component
public class VoiceSessionHandler extends AbstractWebSocketHandler {

    private static final Logger log = LoggerFactory.getLogger(VoiceSessionHandler.class);

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        log.info("Voice session opened: {}", session.getId());
        session.sendMessage(
            new TextMessage("Welcome to CadenceAI")
    );
        // TODO: initialize session state in Redis, open STT stream
    }

    @Override
    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) throws Exception {
        // TODO: forward raw audio bytes to the STT stream for this session
        try {
            ByteBuffer bytes = message.getPayload();

    System.out.println("Received: " + bytes);

    session.sendMessage(
            new TextMessage("Echo: " + bytes)
    );
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // TODO: handle control messages (e.g. start/stop practice session, mode selection)
        String text = message.getPayload();

        switch (text) {
            case "start":
                session.sendMessage(new TextMessage("Practice started"));
                break;
            case "stop":
                session.sendMessage(new TextMessage("Practice stopped"));
                break;
            default:
                session.sendMessage(new TextMessage("Unknown command"));
                break;
        }
        
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        log.info("Voice session closed: {} ({})", session.getId(), status);
        // TODO: flush session, publish session-end event to Kafka
    }
}
