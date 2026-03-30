# Product Requirements Document: Agent OS (Desktop)

## 1. Vision
An intelligent operating system for AI-driven organizations. Unlike traditional SaaS, every entity (User, Lead, Asset, Tool Log) is a "live memory" that agents can search, analyze, and learn from using RAG.

## 2. Technical Stack
- **Frontend**: Desktop-optimized React/Next.js (PWA).
- **Backend**: FastAPI (Python) using LiteLLM + Pydantic.
- **Authentication**: Multi-provider support using NextAuth.js (Google, Apple, Facebook, and Email/Password Credentials for testing).

## 3. Core Modules & Data Structure

### A. Identity & Org Structure
- **Table: `organizations`**: Logical tenant boundary.
- **Table: `users`**: Internal staff/admins.
- **Table: `vendors`**: External collaborators. Vendors have a "Transparent Interaction Log"—internal teams can read vendor threads, but vendor memory is strictly partitioned to avoid internal strategy pollution.

### B. Agent-Intelligence Engine
- **Table: `VectorMemoryStore`**: Every tool log (Slack/Email) is summarized and vectorized into "Context Snapshots."
- **Privacy Model**: Universal transparency *except* for `is_financial: true` records.
- **Memory Persistence**: Hybrid approach—Passive (auto-summarization of chats) and Active (User-commanded facts).
- **Learning Loop**: Agents cross-reference sources by hierarchy (Internal > PM Agent > External Logs). Conflicting information triggers a "Conflict Resolution" notification for the human user.
- **Intelligence Metadata**: Flexible Schema allowing for `Project_ID`, `Priority`, and `Customer_ID` tagging as the system matures.

### C. The Business Primitive (The Medusa Layer)
- **Table: `leads` & `customers`**: CRM records enriched via periodic agent summaries.
- **Table: `assets`**: Dynamic artifacts. Includes "Lineage" metadata to trace which memory chunk inspired the content.

## 4. UI/UX Workflow (Desktop Focus)

### Screen 1: Main Dashboard (The "Agent Asana")
- **Visuals**: A Kanban/List board of "Work Items" (Runs).
- **Functionality**:
    *   Columns: `Pending`, `Active` (Thought-stream visible), `Blocked` (Needs human help), `Completed`.
    *   **Agent Badge**: Shows which agent is assigned + current tool being executed (e.g. *Slack Search*).
    *   **Quick Action**: Ability to "Take Over" a blocked agent run directly from the card.

### Screen 2: The Council ("Round Table" & Armies)
- **Visuals**: A non-hierarchical "Hub-and-Spoke" diagram. In the center is the **Organization Hub**, surrounded by its **Council Members**. Clicking a Council Member zooms in to show their attached **Army** (sub-agents, tool connections, and specific work pipelines).
- **Functionality**:
    *   **The Starter Council**: Default organization seeds with 4 key chairs:
        1. **Hacker-1** (Product/Iterative lead)
        2. **Hacker-2** (GTM/Sales lead)
        3. **Engineer/Builder** (Infrastructure/Product lead)
        4. **Growth Hacker** (Acquisition/Conversion lead)
    *   **Add Hub Member**: A modular interface with fields for:
        *   **Title**
        *   **Role and job duties**
        *   **Input Fields** (The dynamic data source and tool connection triggers).
    *   **Direct Access**: One-click "Pull up a Chair" to chat directly with any Council Member or their Army.

### Screen 3: Assets Gallery
- **Visuals**: A multimodal card grid with filters for `Pages`, `Docs`, `Code`, `Images`.
- **Functionality**:
    *   **Lineage**: Metadata on each card showing the source document and agent that produced it.
    *   **Draft Preview**: View code snippets or landing page renders in an iframe modal.
    *   **Deployment**: One-click "Publish" for agent-generated marketing assets.

### Screen 4: CEO Dashboard (The "Big Picture")
- **Visuals**: High-level financial and velocity widgets.
- **Functionality**:
    *   **The TL;DR Paragraph**: AI-generated summary of company-wide progress since the last login.
    *   **Hacker Team Pulse**: Specific tracking for GTM experiments (e.g. "3 Landing Page Variations Live," "2 Pricing A/B Tests Active").
    *   **Spend vs. ROI**: Comparative chart of token costs vs. lead conversion/pipeline growth.
    *   **Confidence Score**: AI's aggregate "Health Check" based on task completion and feedback sentiment.

## 5. Security & Isolation
- Multi-tenant isolation at both the Relational AND Vector level.
- Vendor users must never be able to "recall" data outside their assigned scope.
