from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import List, Optional, Dict
import os
import json

app = FastAPI(title="Agent OS Intelligence Engine")

# Simple connection manager for real-time agent streams
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, agent_id: str):
        await websocket.accept()
        if agent_id not in self.active_connections:
            self.active_connections[agent_id] = []
        self.active_connections[agent_id].append(websocket)

    def disconnect(self, websocket: WebSocket, agent_id: str):
        if agent_id in self.active_connections:
            self.active_connections[agent_id].remove(websocket)

    async def broadcast_thought(self, agent_id: str, message: dict):
        if agent_id in self.active_connections:
            for connection in self.active_connections[agent_id]:
                await connection.send_text(json.dumps(message))

manager = ConnectionManager()

class AgentRun(BaseModel):
    id: str
    agent_id: str
    status: str
    thought_stream: Optional[str] = None
    output: Optional[str] = None

@app.get("/")
async def root():
    return {"status": "Agent OS Backend Online", "version": "0.1.0"}

@app.websocket("/ws/agent/{agent_id}")
async def websocket_endpoint(websocket: WebSocket, agent_id: str):
    await manager.connect(websocket, agent_id)
    try:
        while True:
            # Keep connection alive; can also receive user-to-agent manual overrides here
            data = await websocket.receive_text()
            # Handle manual human override data or chat
    except WebSocketDisconnect:
        manager.disconnect(websocket, agent_id)

@app.post("/agents/run/update")
async def update_agent_run(run: AgentRun):
    # Broadcast the new thought/output to all connected UI clients
    await manager.broadcast_thought(run.agent_id, {
        "run_id": run.id,
        "thought": run.thought_stream,
        "status": run.status,
        "output": run.output
    })
    return {"status": "broadcast_sent"}
