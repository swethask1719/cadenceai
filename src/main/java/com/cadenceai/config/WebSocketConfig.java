package com.cadenceai.config;

import com.cadenceai.websocket.VoiceSessionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

/**
 * Registers the WebSocket endpoint that streams audio between the client
 * and the voice pipeline. Audio flows in as binary frames; transcript and
 * control messages flow as text frames on the same connection.
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final VoiceSessionHandler voiceSessionHandler;

    public WebSocketConfig(VoiceSessionHandler voiceSessionHandler) {
        this.voiceSessionHandler = voiceSessionHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(voiceSessionHandler, "/ws/voice")
                .setAllowedOrigins("*"); // tighten before anything resembling production
    }
}
