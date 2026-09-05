package com.cadenceai.websocket;

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
 *  - Forward transcribed text to the reasoning layer (Claude) for the coach's next turn
 *  - Stream synthesized speech back to the client
 *  - Publish each turn (transcript, timestamps, session id) to Kafka for async evaluation
 *
 * Currently a skeleton: connection lifecycle only, no pipeline wiring yet.
 */
@Component
public class VoiceSessionHandler extends AbstractWebSocketHandler {

    private static final Logger log = LoggerFactory.getLogger(VoiceSessionHandler.class);

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("Voice session opened: {}", session.getId());
        // TODO: initialize session state in Redis, open STT stream
    }

    @Override
    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
        // TODO: forward raw audio bytes to the STT stream for this session
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        // TODO: handle control messages (e.g. start/stop practice session, mode selection)
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        log.info("Voice session closed: {} ({})", session.getId(), status);
        // TODO: flush session, publish session-end event to Kafka
    }
}
