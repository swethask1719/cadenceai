import asyncio
import websockets
import json
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
MODEL = "gemini-3.1-flash-live-preview"
URL = (
    "wss://generativelanguage.googleapis.com/ws/"
    "google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent"
    f"?key={API_KEY}"
)


async def main():
    async with websockets.connect(URL) as ws:
        print("Connected")

        setup_message = {
            "setup": {
                "model": f"models/{MODEL}",
                "generationConfig": {
                    "responseModalities": ["AUDIO"]
                }
            }
        }
        await ws.send(json.dumps(setup_message))
        print("Setup sent")

        async for message in ws:
            if isinstance(message, bytes):
                message = message.decode("utf-8")

            print("Received:", message)

            if "setupComplete" in message:
                turn_message = {
                    "clientContent": {
                        "turns": [
                            {
                                "role": "user",
                                "parts": [{"text": "Say hello in one short sentence."}]
                            }
                        ],
                        "turnComplete": True
                    }
                }
                await ws.send(json.dumps(turn_message))
                print("Turn sent")


asyncio.run(main())