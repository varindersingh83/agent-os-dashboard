import os
import httpx
from typing import List, Dict

class SlackConnector:
    def __init__(self, token: str):
        self.token = token
        self.base_url = "https://slack.com/api"

    async def fetch_recent_messages(self, channel_id: str, limit: int = 50) -> List[Dict]:
        headers = {"Authorization": f"Bearer {self.token}"}
        params = {"channel": channel_id, "limit": limit}
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.base_url}/conversations.history", headers=headers, params=params)
            data = response.json()
            if not data.get("ok"):
                raise Exception(f"Slack API error: {data.get('error')}")
            return data.get("messages", [])

    def summarize_for_memory(self, messages: List[Dict]) -> str:
        # Placeholder for LLM-based summarization before vectorization
        text_blob = "\n".join([m.get("text", "") for m in messages if "text" in m])
        # In a real run, this would be passed to litellm.acompletion
        return f"Summary of {len(messages)} Slack messages: {text_blob[:500]}..."
