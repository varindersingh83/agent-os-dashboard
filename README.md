# Agent OS: The Intelligent Organization Operating System

Agent OS is a Medusa-inspired, RAG-driven operating system for AI organizations. It transitions from traditional project management to an "Agentic Workflow" where every entity (User, Lead, Asset, Tool Log) is a live memory that agents can search, analyze, and learn from.

## 🚀 Core Architecture: "Council & Armies"
Agent OS is built on a non-hierarchical organizational design:
- **Organization Hub:** The central nexus of all memory and assets.
- **Council Members:** 4 default starter personas (Hacker-1, Hacker-2, Builder, Growth Hacker).
- **Armies:** Sub-agents and tool-connections assigned to each Council member for specialized execution.

## ✨ Key Features
- **Agent Asana (Kanban):** Real-time monitoring of agent runs (Active, Blocked, Completed).
- **Passive Learning Engine:** Autonomous ingestion and vectorization of Slack and Gmail history.
- **Asset Gallery:** A lineage-traced artifact gallery for agent-produced landing pages, code, and docs.
- **CEO Dashboard:** High-level "Pulse" summaries (TL;DR) and enterprise token vs. ROI metrics.
- **Human-in-the-Loop Hooks:** Real-time WebSocket overrides to unblock agents and re-inject credentials.

## 🛠 Tech Stack
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Shadcn/UI, React Flow.
- **Backend:** FastAPI (Python), LiteLLM, Pydantic.
- **Authentication:** NextAuth.js (Google, Apple, Facebook, Email/Password).
- **Memory Engine:** Qdrant (Vector DB) + PostgreSQL (Relational DB).

## 🚀 Quick Start (Local Docker)

The entire stack is containerized and orchestrated with a simple **Makefile**.

### 1. Pre-requisites
- Docker and Docker Compose
- A `.env` file (see `.env.example` for required keys)

### 2. Boot the OS
```bash
# Start the entire stack in the background
make up

# Start in the foreground for real-time logs (Recommended for dev)
make dev
```

### 3. Access Points
- **Dashboard UI:** [http://localhost:3000](http://localhost:3000)
- **Intelligence API:** [http://localhost:8000](http://localhost:8000)
- **Vector Memory (Qdrant):** [http://localhost:6333](http://localhost:6333)

## 🏗 Operations
- `make restart`: Restart all containers after code or .env changes.
- `make build`: Force a fresh rebuild of images.
- `make down`: Stop and remove all containers.
- `make logs`: Follow logs from all services.

## 📈 Current Implementation Status
See [IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md) for the detailed roadmap, technical backlog, and recently completed features.

---
**Maintained by Vir Nagra (Chiang Mai).**
_Strategic AI Organizations don't just use tools; they occupy an OS._
