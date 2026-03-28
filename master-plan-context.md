# Master Plan Context

## Why This Exists
This file translates the master plan into practical working context for anyone building on top of the first dashboard. The product is not just an agent chat app. It is an operating system for a modern organization that combines AI agents, business records, customer context, vendor collaboration, tool use, and asset generation.

## Product Intent
- Help early-stage organizations build toward their first 100 customers.
- Give founders and operators a single place to create agents, assign skills and tools, and coordinate work.
- Make the system useful across desktop and mobile, with voice and text as input methods.
- Keep outputs navigable and inspectable through clear UI screens and deep-linkable routes.

## Core Mental Model
- Organizations contain people, vendor collaborators, customers, leads, agents, tools, assets, and analytics.
- Agents are teammates with roles, goals, skills, and tools.
- Teams are operating units such as Hackers, Engineering, Marketing, CEO Office, and Tooling Engineer.
- Tools are capabilities agents can use to act outside the app.
- Assets are things agents produce, such as landing pages, messaging, experiments, reports, and briefs.

## Important Starter Teams
- `Hackers` means an early startup core team in the PayPal-mafia sense.
- This team should iterate across product, positioning, conversion, pricing, onboarding, experiments, landing pages, and go-to-market.
- `Tooling Engineer` exists to help when agents are blocked by missing tooling or missing integrations.

## UX Priorities
- Fast agent creation.
- Clear assignment of skills and tools.
- One-click selection of an agent to inspect and chat.
- Lightweight conversation workflows that can later evolve into real orchestration and tool execution.
- A design language that feels intentional, founder-grade, and product-focused rather than generic enterprise UI.

## Current Prototype Scope
- Single-screen dashboard.
- Client-side local state only.
- Agent roster with creation form.
- Selected agent details with skills and tools.
- Basic local chat simulation.

## Next Build Direction
- Add backend persistence.
- Add authentication and org membership.
- Add vendor users with scoped access.
- Add real tool connections.
- Add dashboard routing for org chart, token use, feedback, and assets.
