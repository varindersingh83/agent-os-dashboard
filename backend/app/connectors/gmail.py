import httpx
from typing import List, Dict

class GmailConnector:
    def __init__(self, access_token: str):
        self.access_token = access_token
        self.base_url = "https://gmail.googleapis.com/gmail/v1/users/me"

    async def list_recent_emails(self, max_results: int = 10) -> List[Dict]:
        headers = {"Authorization": f"Bearer {self.access_token}"}
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.base_url}/messages", headers=headers, params={"maxResults": max_results})
            return response.json().get("messages", [])

    async def get_message_content(self, message_id: str) -> Dict:
        headers = {"Authorization": f"Bearer {self.access_token}"}
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.base_url}/messages/{message_id}", headers=headers)
            return response.json()
