from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import os

app = FastAPI(title="Agent OS Intelligence Engine")

class AgentRun(BaseModel):
    id: str
    agent_id: str
    status: str
    thought_stream: Optional[str] = None
    output: Optional[str] = None

@app.get("/")
async def root():
    return {"status": "Agent OS Backend Online", "version": "0.1.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/agents/run")
async def trigger_agent_run(run: AgentRun):
    # Logic for starting LiteLLM-based agent loop
    return {"message": f"Run {run.id} started for agent {run.agent_id}"}
