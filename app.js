const STORAGE_KEY = "agent-os-dashboard-state";

const starterAgents = [
  {
    id: crypto.randomUUID(),
    name: "Nova",
    role: "Growth Hacker",
    team: "Hackers",
    goal: "Find the highest-conviction path to the first 100 customers.",
    skills: ["landing pages", "pricing", "copywriting", "customer insight"],
    tools: ["Slack", "Gmail", "Calendar"],
    messages: [
      {
        id: crypto.randomUUID(),
        author: "agent",
        text: "I am ready to tighten the landing page, sharpen positioning, and propose the next conversion experiment."
      }
    ]
  }
];

const state = loadState();

const agentForm = document.getElementById("agent-form");
const agentList = document.getElementById("agent-list");
const agentCount = document.getElementById("agent-count");
const selectedAgentName = document.getElementById("selected-agent-name");
const selectedAgentRole = document.getElementById("selected-agent-role");
const selectedAgentGoal = document.getElementById("selected-agent-goal");
const selectedAgentSkills = document.getElementById("selected-agent-skills");
const selectedAgentTools = document.getElementById("selected-agent-tools");
const selectedAgentEmpty = document.getElementById("selected-agent-empty");
const selectedAgentCard = document.getElementById("selected-agent-card");
const selectedTeam = document.getElementById("selected-team");
const selectedToolsCount = document.getElementById("selected-tools-count");
const chatThread = document.getElementById("chat-thread");
const chatEmpty = document.getElementById("chat-empty");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

agentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(agentForm);
  const agent = {
    id: crypto.randomUUID(),
    name: String(formData.get("name")).trim(),
    role: String(formData.get("role")).trim(),
    team: String(formData.get("team")).trim(),
    goal: String(formData.get("goal")).trim(),
    skills: splitValues(String(formData.get("skills")).trim()),
    tools: splitValues(String(formData.get("tools")).trim()),
    messages: [
      {
        id: crypto.randomUUID(),
        author: "agent",
        text: "I am online. Give me a goal and I will break it into next actions."
      }
    ]
  };

  state.agents.unshift(agent);
  state.selectedAgentId = agent.id;
  saveState();
  agentForm.reset();
  render();
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const agent = getSelectedAgent();
  const text = chatInput.value.trim();

  if (!agent || !text) {
    return;
  }

  agent.messages.push({
    id: crypto.randomUUID(),
    author: "user",
    text
  });

  agent.messages.push({
    id: crypto.randomUUID(),
    author: "agent",
    text: buildAgentReply(agent, text)
  });

  chatInput.value = "";
  saveState();
  renderChat();
});

function render() {
  renderAgentList();
  renderSelectedAgent();
  renderChat();
}

function renderAgentList() {
  agentList.innerHTML = "";
  agentCount.textContent = `${state.agents.length} agent${state.agents.length === 1 ? "" : "s"}`;

  if (!state.agents.length) {
    agentList.innerHTML = `<div class="empty-state">No agents yet. Create your first teammate.</div>`;
    return;
  }

  state.agents.forEach((agent) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `agent-card${agent.id === state.selectedAgentId ? " active" : ""}`;
    button.innerHTML = `
      <strong>${escapeHtml(agent.name)}</strong>
      <p>${escapeHtml(agent.role)} · ${escapeHtml(agent.team)}</p>
      <p>${escapeHtml(agent.skills.slice(0, 3).join(", ") || "No skills yet")}</p>
    `;
    button.addEventListener("click", () => {
      state.selectedAgentId = agent.id;
      saveState();
      render();
    });
    agentList.appendChild(button);
  });
}

function renderSelectedAgent() {
  const agent = getSelectedAgent();

  if (!agent) {
    selectedAgentName.textContent = "No agent selected";
    selectedAgentEmpty.classList.remove("hidden");
    selectedAgentCard.classList.add("hidden");
    selectedTeam.textContent = "None";
    selectedToolsCount.textContent = "0";
    return;
  }

  selectedAgentName.textContent = agent.name;
  selectedAgentRole.textContent = `${agent.role} · ${agent.team}`;
  selectedAgentGoal.textContent = agent.goal || "No goal added yet.";
  selectedTeam.textContent = agent.team;
  selectedToolsCount.textContent = String(agent.tools.length);
  selectedAgentEmpty.classList.add("hidden");
  selectedAgentCard.classList.remove("hidden");

  renderChipList(selectedAgentSkills, agent.skills, "No skills assigned");
  renderChipList(selectedAgentTools, agent.tools, "No tools assigned");
}

function renderChat() {
  const agent = getSelectedAgent();
  chatThread.innerHTML = "";

  if (!agent) {
    chatEmpty.classList.remove("hidden");
    chatThread.classList.add("hidden");
    return;
  }

  chatEmpty.classList.add("hidden");
  chatThread.classList.remove("hidden");

  agent.messages.forEach((message) => {
    const div = document.createElement("div");
    div.className = `chat-message ${message.author}`;
    div.innerHTML = `
      <span class="message-name">${message.author === "agent" ? escapeHtml(agent.name) : "You"}</span>
      <div>${escapeHtml(message.text)}</div>
    `;
    chatThread.appendChild(div);
  });

  chatThread.scrollTop = chatThread.scrollHeight;
}

function renderChipList(container, items, emptyText) {
  container.innerHTML = "";

  if (!items.length) {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = emptyText;
    container.appendChild(chip);
    return;
  }

  items.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = item;
    container.appendChild(chip);
  });
}

function getSelectedAgent() {
  return state.agents.find((agent) => agent.id === state.selectedAgentId) || null;
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {
      agents: starterAgents,
      selectedAgentId: starterAgents[0].id
    };
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.agents) || !parsed.agents.length) {
      return {
        agents: starterAgents,
        selectedAgentId: starterAgents[0].id
      };
    }

    return parsed;
  } catch {
    return {
      agents: starterAgents,
      selectedAgentId: starterAgents[0].id
    };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function splitValues(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildAgentReply(agent, prompt) {
  const skills = agent.skills.length ? agent.skills.join(", ") : "general problem solving";
  const tools = agent.tools.length ? agent.tools.join(", ") : "no connected tools yet";
  return `Here is my first pass on "${prompt}". I would use ${skills} and work through ${tools}. Next I would define the objective, propose 2-3 experiments, and report back with the fastest path to traction.`;
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

render();
