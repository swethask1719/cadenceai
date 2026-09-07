# CadenceAI

A real-time voice agent that listens to you practice out loud — explaining a concept, rehearsing a pitch, walking through reasoning — and evaluates your performance across sessions so you can track improvement over time.

> Status: early build — voice loop and evaluation pipeline in progress. Follow the build-in-public series on [LinkedIn].

## Why

Most voice AI demos show off the *assistant* answering well. CadenceAI flips that: the interesting output isn't the AI's response quality, it's a structured, trackable score of **your** performance — clarity, structure, pacing, filler words — derived from what you said.

## Architecture

```mermaid
flowchart LR
    subgraph Client
        A[Mic Audio Stream]
    end

    subgraph Backend[Spring Boot Backend]
        B[WebSocket Handler]
        C[Gemini Live<br/>speech-to-speech]
        D[Session State<br/>Redis]
    end

    subgraph Async[Async Evaluation]
        E[Kafka<br/>turn events]
        F[Eval Consumer]
        G[LLM-as-Judge]
        H[Objective Metrics<br/>WPM, filler words, pauses]
        I[(Postgres<br/>scores + history)]
    end

    subgraph UI[Dashboard]
        J[React Dashboard]
    end

    A -->|audio chunks| B
    B --> C
    C -->|transcript + audio out| B
    B -->|turn event| E
    C --> D
    E --> F
    F --> G
    F --> H
    G --> I
    H --> I
    I --> J
```

**Flow:**
1. Audio streams from the client over a WebSocket into the Spring Boot backend.
2. Gemini Live handles the full voice loop directly — audio in, audio out, over one persistent bidirectional connection; session context lives in Redis.
3. Every turn is published to Kafka as an event — decoupling the real-time loop from evaluation so scoring never adds latency to the conversation.
4. An async consumer scores each session on objective transcript metrics (words per minute, filler word rate, pause patterns) and an LLM-as-judge pass on structure/clarity.
5. Scores persist to Postgres and surface in a React dashboard, with trends tracked across sessions.

## Stack

| Layer | Choice |
|---|---|
| Backend | Spring Boot (WebSocket) |
| Voice pipeline | Gemini Live API (speech-to-speech, WebSocket) |
| Event backbone | Kafka |
| Session state | Redis |
| Eval storage | Postgres |
| Dashboard | React |

## Roadmap

- [ ] Phase 1 — Core voice loop (audio round-trip working end-to-end)
- [ ] Phase 2 — Multi-turn conversation state + Kafka event logging
- [ ] Phase 3 — Evaluation pipeline (objective metrics + LLM-as-judge)
- [ ] Phase 4 — Dashboard + demo polish

## Notes on early exploration

`src/main/java/com/cadenceai/initiallearn/` holds scratch files from early research, kept for reference rather than deleted:

- `SpeechToText.java` — an initial Deepgram streaming STT integration, explored before settling on Gemini Live's built-in speech-to-speech pipeline, which covers STT/TTS in one connection and removes the need for a separate transcription provider.
- `Chatbot.java` / `ToolCalling.java` — early Gemini function-calling experiments that informed the pattern used in the real services.

These aren't wired into the app and will likely be removed once the core voice loop is fully in place.

## Running locally

```bash
./mvnw spring-boot:run
```

Requires a Gemini API key with Live API access — see `application.yml`.

## License
