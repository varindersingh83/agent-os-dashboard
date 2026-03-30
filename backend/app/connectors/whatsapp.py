import httpx
from typing import List, Dict

class WhatsAppConnector:
    def __init__(self, phone_id: str, access_token: str):
        self.phone_id = phone_id
        self.access_token = access_token
        self.base_url = f"https://graph.facebook.com/v19.0/{phone_id}"

    async def send_text_message(self, recipient: str, message: str) -> Dict:
        headers = {"Authorization": f"Bearer {self.access_token}"}
        payload = {
            "messaging_product": "whatsapp",
            "to": recipient,
            "type": "text",
            "text": {"body": message}
        }
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{self.base_url}/messages", headers=headers, json=payload)
            return response.json()
