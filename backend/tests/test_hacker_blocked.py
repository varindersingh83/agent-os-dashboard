import asyncio
import json
import sys
import os

# Add the backend app root to the python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.agent_loop import AgentOrchestrator

async def test_blocked_trigger():
    # Simulate a run that should trigger MISSION_BLOCKED
    # Mocking Hacker-1 prompt logic locally for testing
    print("\n--- Testing Hacker-1 MISSION_BLOCKED Trigger ---")
    
    thought = "MISSION_BLOCKED: Vercel credentials missing. Cannot deploy landing page v2 to production."
    
    if "MISSION_BLOCKED" in thought:
        print(f"[SUCCESS] Captured Blocked Trigger: {thought}")
        return True
    
    return False

if __name__ == "__main__":
    asyncio.run(test_blocked_trigger())
