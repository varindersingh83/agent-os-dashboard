# AI Organization Operating System With Agents, Assets, Customers, and Tool-Using Teams

## Summary
Build a multi-tenant, responsive PWA for running an AI-powered organization across web and mobile. The app should combine Paperclip-style agent orchestration with Medusa-style business primitives so it can manage agents, org structure, internal users, vendor users, customers, leads, assets, feedback, and work history in one operating system. V1 should support real runnable agents, text and voice interaction, generated business assets, limited-access external collaborators, and command-driven navigation to dashboards like org chart, token consumption, customer feedback, and tool activity.

## Key Changes
- Reframe the product from "agent dashboard" to "organization operating system":
  The core model should include internal people, vendor collaborators, external customers, leads, agents, work items, assets, feedback, tool access, and usage/cost analytics.
- Add vendor onboarding as a first-class user model:
  Vendors can be onboarded into an organization as restricted users with scoped access to specific screens, teams, agents, assets, or workflows.
  Vendor access should be policy-driven, auditable, and limited by role and resource assignment.
- Add an explicit tool-runtime layer for agents:
  Agents should be able to use external tools like Slack, WhatsApp, Gmail, Calendar, and similar SaaS systems through managed connectors, permissions, and execution logs.
- Add a built-in `Tooling Engineer` capability:
  If an agent gets blocked because a needed tool does not exist, the system should route to a tooling engineer workflow that:
  checks existing internal tools/connectors first,
  searches GitHub or approved registries for reusable tools next,
  and only then proposes or builds a new tool/adapter.
- Add an explicit asset generation and storage layer:
  Agents should be able to create and manage landing pages, marketing copy, campaigns, docs, summaries, pricing experiments, and other product/marketing artifacts.
- Add explicit business records inspired by e-commerce/back-office platforms:
  `Users` are internal operators.
  `Vendors` are restricted collaborators inside the org boundary.
  `Customers` are external contacts/accounts the org serves.
  `Leads` are prospective customers not yet converted.
  `Assets`, `Campaigns`, `FeedbackItems`, `Tickets`, `Runs`, and `ToolExecutions` link the business side to the agent side.
- Update the built-in starter team model:
  Seed the organization with CEO, Hackers, Engineering, Marketing, and Tooling Engineer.
  `Hackers` should mean an early-startup core team focused on winning the first 100 customers through rapid iteration across product, landing pages, conversion, pricing, positioning, and GTM.
- Maintain command-based voice/text UX:
  Commands like "show me the org chart," "show me token consumption," and "show me customer feedback" should return a short spoken/text confirmation plus open the relevant dashboard route.

## Public APIs / Interfaces / Types
- `Organization`
  Tenant boundary with members, vendors, teams, agents, customers, assets, tool connections, analytics, and billing isolation.
- `User`
  Internal app member with auth identity, org membership, role, permissions, and activity history.
- `VendorUser`
  Restricted org participant with scoped access to assigned screens, agents, teams, or workflows.
- `Customer`
  External person or account tied to feedback, campaigns, assets, tickets, and summaries.
- `Lead`
  Prospect record with source, status, notes, linked campaigns, and conversion path to customer.
- `Agent`
  Runnable worker with role, manager, skills, provider/runtime config, budgets, allowed tools, blocked-state handling, and template source.
- `SkillReference`
  Skill metadata imported/referenced from `skills.sh`, with source, install/import state, and compatibility info.
- `ToolConnection`
  External integration record for Slack, WhatsApp, Gmail, Calendar, and similar systems, including auth mode, scopes, status, and owning org.
- `ToolCapability`
  A normalized action surface exposed to agents such as `send_message`, `read_thread`, `send_email`, `create_calendar_event`, `search_contacts`.
- `ToolExecution`
  Auditable record of agent tool use, including requested action, permission context, outcome, retries, and failure reason.
- `ToolDiscoveryJob`
  Workflow record for resolving missing tooling by checking internal tools, searching external sources, or creating a new tool.
- `Asset`
  Generated or uploaded company artifact such as landing page, campaign copy, doc, brief, pricing experiment, or report.
- `Campaign`
  Marketing or GTM initiative linking leads/customers, assets, metrics, and assigned agents.
- `FeedbackItem`
  Customer or prospect feedback record with source, tags, linked customer, linked team/agent, and daily summaries.
- `Ticket` and `Run`
  Requested work plus execution history, outputs, token/cost usage, tool usage, and traceability.
- `UsageEvent`
  Normalized telemetry event supporting hourly/day rollups by org, team, agent, tool, customer, or campaign.
- `SummaryRecord`
  Daily and hourly TL;DR summaries for agent activity, team activity, feedback, tool usage, and asset production.
- `CommandRouter`
  Intent layer that maps typed/spoken requests to navigation or actions such as `open_org_chart`, `open_token_consumption`, `open_customer_feedback`, `open_assets`, `chat_agent`, `add_agent`.

## Implementation Plan
- Product structure
  Build a single responsive PWA with mobile-first command input and desktop-friendly dashboards.
  Design around 5 top-level modules: Organization, Agents, Tools, Business, Analytics.
- Organization module
  Support multi-org SaaS, role-based access, vendor onboarding, team hierarchy, org chart visibility rules, and seeded company templates from `paperclipai/companies`.
- Access control
  Implement resource-scoped permissions so internal users and vendor users can be limited to specific screens, teams, assets, conversations, and agent views.
  Include audit logs for who viewed, changed, or triggered what.
- Agents module
  Support chat with agents, add/import agents, assign managers and skills, launch tasks, inspect runs, and seed starter agents/personas using `agency-agents`.
  Add blocked-run handling so agents can escalate to Tooling Engineer when required capabilities are missing.
- Tools module
  Add connector infrastructure for Slack, WhatsApp, Gmail, Calendar, and future tools.
  Normalize tool actions behind a common interface so agents reason about capabilities instead of provider-specific APIs.
  Track tool permissions, execution logs, retries, failure handling, and human approvals where needed.
- Tooling Engineer workflow
  Add a built-in Tooling Engineer role or service agent responsible for resolving missing tool capability.
  Resolution order should be:
  use an existing approved internal tool,
  search GitHub or approved external sources for a reusable tool,
  build a new internal adapter/tool only if no safe reusable option exists.
- Business module
  Add first-class records for users, vendor users, customers, leads, feedback, assets, and campaigns.
  Make assets and feedback visible in the same operating model as agent work.
- Hacker team model
  Add a built-in `Hackers` team template optimized for the first-100-customers stage.
  Seed this team with workflows for product iteration, idea testing, landing page generation, pricing experiments, conversion optimization, customer interview synthesis, and go-to-market execution.
- Asset generation
  Let agents create business outputs such as landing page drafts, campaign copy, docs, reports, summaries, and pricing/conversion experiment artifacts.
  Store asset metadata, provenance, versions, linked entities, and output locations so generated work is inspectable and reusable.
- Skills integration
  Treat `skills.sh` as a skill catalog/import source. Users should be able to browse/select compatible skills and attach them to agents or starter templates.
- Analytics
  Track not only tokens and costs, but also what each agent worked on, what assets they produced, what customer/lead/campaign it affected, what tools they used, and when/why they got blocked.
- Command and voice UX
  Provide a unified router for typed and spoken requests.
  For "show me ..." intents, return a compact acknowledgement and open the canonical dashboard page or view.
- Extensibility approach
  Follow Medusa-style modular architecture and incorporate tool-use ideas from OpenClaw/NemoClaw for agentic tool execution, connector design, and extensible capability surfaces.

## Test Plan
- Verify multi-tenant isolation across organizations for users, vendor users, customers, leads, agents, assets, feedback, tools, runs, and analytics.
- Verify scoped vendor access:
  vendor users can only access assigned screens, agents, or assets and cannot view org-wide analytics unless explicitly granted.
- Verify tool permissions:
  agents can only use approved tools/capabilities for their org and role.
- Verify tool execution:
  Slack, WhatsApp, Gmail, and Calendar actions are logged, attributable, and recover cleanly from failures.
- Verify blocked-agent handling:
  when an agent lacks a needed tool, the Tooling Engineer workflow checks internal tools first, then external discovery, then custom build.
- Verify command routing from both text and voice for org chart, token consumption, customer feedback, assets, tool activity, and agent chat.
- Verify asset lifecycle:
  create asset from an agent run, version it, link it to a campaign/customer/lead, and reopen it from dashboards.
- Verify customer workflow:
  create/import customer and lead records, attach feedback, connect them to assets/campaigns, and summarize recent interactions.
- Verify hacker-team workflows:
  run experiments around landing pages, pricing, messaging, and conversion; track outputs and summaries under the Hackers team.
- Verify analytics:
  hourly token consumption, tool-use traces, daily TL;DRs, task counts, output links, and cost rollups match underlying telemetry.
- Verify responsive behavior on mobile:
  voice input, dashboard navigation, org chart access, analytics, and asset/customer/tool views remain usable on phone screens.

## Assumptions And Defaults
- Primary client is a responsive PWA for web and mobile browser use.
- V1 is multi-org SaaS.
- Agents are runnable in v1.
- Voice output is short spoken confirmation plus visible navigation/deep link.
- External ecosystems are integrated via import/reuse adapters, not strict wire-compatibility.
- `Hackers` means an early-stage cross-functional startup team focused on finding and winning the first 100 customers.
- Vendor users are inside the org boundary but always operate with restricted access by default.
- Tool use is a first-class capability of agents, not an afterthought.
- Missing-tool resolution should prefer reuse before custom tool building.
- Medusa is used as architectural inspiration for modular business records and extensibility, not as a requirement to implement full commerce/storefront/order flows in v1.

## Reference Inputs
- Paperclip orchestration concepts: [paperclipai/paperclip](https://github.com/paperclipai/paperclip)
- Company template source: [paperclipai/companies](https://github.com/paperclipai/companies)
- Agent persona source: [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents)
- Skills ecosystem: [skills.sh](https://skills.sh/)
- Modular business-platform inspiration: [medusajs/medusa](https://github.com/medusajs/medusa)
- Tool-use and agent-claw references: [openclaw/openclaw](https://github.com/openclaw/openclaw)
- NVIDIA agentic tool-use reference: [NVIDIA/NemoClaw](https://github.com/NVIDIA/NemoClaw)
