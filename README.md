# Agent OS Dashboard

A lightweight first prototype for an AI organization dashboard inspired by Paperclip, Medusa-style modular thinking, and agent/tool ecosystems.

## What is in this repo
- A first working dashboard screen
- Agent creation
- Skills and tools assignment
- Agent roster
- Selected-agent details
- Local chat with agents
- Product planning and context docs for the broader system

## Files
- [index.html](/Users/varindernagra/Documents/GitHub/agent-000/index.html): main dashboard UI
- [styles.css](/Users/varindernagra/Documents/GitHub/agent-000/styles.css): visual design and responsive layout
- [app.js](/Users/varindernagra/Documents/GitHub/agent-000/app.js): local state and interaction logic
- [master-plan.md](/Users/varindernagra/Documents/GitHub/agent-000/master-plan.md): master roadmap/spec
- [master-plan-context.md](/Users/varindernagra/Documents/GitHub/agent-000/master-plan-context.md): build context derived from the master plan
- [product-context.md](/Users/varindernagra/Documents/GitHub/agent-000/product-context.md): product and architecture framing

## Local run
From this folder:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000/
```

## Current prototype behavior
- The app stores agents in browser `localStorage`
- A starter agent is seeded on first load
- New agents can be created with a name, role, team, skills, tools, and goal
- Each agent has a local chat thread

## Next steps
- Add backend persistence
- Add auth and organizations
- Add vendor access controls
- Add real Slack, Gmail, Calendar, and WhatsApp connectors
- Replace local simulated replies with real agent execution
