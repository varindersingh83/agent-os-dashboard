import asyncio
from typing import List
from .rag import MemoryManager
from ..connectors.slack import SlackConnector
from ..connectors.gmail import GmailConnector
import litellm

class PassiveLearningEngine:
    def __init__(self, organization_id: str):
        self.organization_id = organization_id
        self.memory = MemoryManager()
        self.collection_name = f"org_{organization_id}_memory"

    async def ingest_slack(self, token: str, channel_id: str):
        slack = SlackConnector(token)
        messages = await slack.fetch_recent_messages(channel_id)
        summary = slack.summarize_for_memory(messages)
        
        # 1. Summarize with LLM (LiteLLM)
        llm_response = await litellm.acompletion(
            model="gpt-4-turbo-preview",
            messages=[{"role": "user", "content": f"Summarize these messages into 3 actionable bullet points for organziational memory:\n{summary}"}]
        )
        final_summary = llm_response['choices'][0]['message']['content']

        # 2. Store in Qdrant Vector (Assuming embedding generation logic here)
        # self.memory.store_memory(self.collection_name, vector, {"source": "slack", "text": final_summary})
        return final_summary

    async def ingest_gmail(self, token: str):
        gmail = GmailConnector(token)
        messages = await gmail.list_recent_emails()
        # Similar logic for summarization and memory insertion
        return f"Ingested {len(messages)} emails."
