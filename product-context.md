# Product Context

## Current State
The current implementation is a greenfield static prototype that proves the first user flow:
- create an agent
- assign skills
- assign tools
- select the agent
- chat with the agent

## Who This Is For
- Founders
- Early startup operators
- Cross-functional growth teams
- Product and engineering leads
- External vendors who need selective access to specific screens or agent workflows

## What Makes This Different
- The system is designed around organizations, not isolated chat threads.
- Agents are expected to act like members of a company, not standalone assistants.
- Tool use is first-class.
- Early startup execution is a core product theme, especially around the first 100 customers.

## Data Concepts To Preserve
- `Organization`
- `User`
- `VendorUser`
- `Agent`
- `SkillReference`
- `ToolConnection`
- `Asset`
- `Customer`
- `Lead`
- `FeedbackItem`
- `Run`
- `UsageEvent`

## Integration Direction
- `paperclipai/paperclip` for orchestration inspiration
- `paperclipai/companies` for starter structures
- `agency-agents` for role/persona input
- `skills.sh` for skill ecosystem references
- `medusajs/medusa` for modular back-office architecture inspiration
- `openclaw` and `NemoClaw` for tool-use and extensible capability patterns

## Guardrails
- Do not collapse the product into a generic chatbot.
- Do not model Hackers as a security-only function.
- Do not treat tools as hardcoded UI tags only; they should evolve into real capabilities.
- Keep mobile usage in mind in every layout change.
