from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams
import os

QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
QDRANT_PORT = os.getenv("QDRANT_PORT", 6333)

class MemoryManager:
    def __init__(self):
        self.client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)

    def init_collection(self, organization_id: str):
        collection_name = f"org_{organization_id}_memory"
        # 1536 is standard OpenAI embedding dimension
        self.client.recreate_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(size=1536, distance=Distance.COSINE),
        )
        return collection_name

    def store_memory(self, collection_name: str, vector: list, metadata: dict):
        self.client.upsert(
            collection_name=collection_name,
            points=[
                {
                    "id": metadata.get("id"),
                    "vector": vector,
                    "payload": metadata
                }
            ]
        )

    def search_memory(self, collection_name: str, query_vector: list, limit: int = 5):
        return self.client.search(
            collection_name=collection_name,
            query_vector=query_vector,
            limit=limit
        )
