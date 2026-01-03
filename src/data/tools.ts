import type { Tool } from "@/types";

export const tools: Tool[] = [
  {
    id: "obsidian",
    name: "Obsidian",
    description: "Knowledge base and note-taking app that uses markdown files.",
    category: "productivity",
    link: "https://obsidian.md",
  },
  {
    id: "raycast",
    name: "Raycast",
    description: "Spotlight replacement with powerful extensions and workflows.",
    category: "productivity",
    link: "https://raycast.com",
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "AI-powered code editor built for pair programming with AI.",
    category: "coding",
    link: "https://cursor.sh",
  },
  {
    id: "things3",
    name: "Things 3",
    description: "Beautiful and powerful task management app for macOS and iOS.",
    category: "productivity",
    link: "https://culturedcode.com/things",
  },
  {
    id: "warp",
    name: "Warp",
    description: "Modern, Rust-based terminal with AI and collaborative features.",
    category: "coding",
    link: "https://app.warp.dev/referral/LG3R64",
  },
  {
    id: "notion",
    name: "Notion",
    description: "All-in-one workspace for notes, docs, and project management.",
    category: "productivity",
    link: "https://notion.so",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Team communication platform for messaging and collaboration.",
    category: "communication",
    link: "https://slack.com",
  },
  {
    id: "linear",
    name: "Linear",
    description: "Issue tracking and project management tool built for speed.",
    category: "productivity",
    link: "https://linear.app",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Code hosting platform for version control and collaboration.",
    category: "coding",
    link: "https://github.com",
  },
  {
    id: "shared",
    name: "Shared",
    description: "Music and podcast sharing across services.",
    category: "media",
    link: "https://sharedapp.net/",
  },
  {
    id: "n8n",
    name: "n8n",
    description: "Workflow automation tool for building workflows and automating tasks.",
    category: "productivity",
    link: "https://n8n.io/",
  },
  {
    id: "magnet",
    name: "Magnet",
    description: "Window manager for Mac.",
    category: "productivity",
    link: "https://magnet.crowdcafe.com/",
  },
  {
    id: "1Password",
    name: "1Password",
    description: "Password manager for storing and managing your passwords.",
    category: "security",
    link: "https://1password.com/",
  },
  {
    id: "nordvpn",
    name: "NordVPN",
    description: "VPN service for securing your online privacy and security.",
    category: "security",
    link: "https://nordvpn.com/",
  },
  {
    id: "arc",
    name: "Arc",
    description: "Browser for the modern web.",
    category: "productivity",
    link: "https://arc.net/gift/76efe70b",
  },
  {
    id: "orbstack",
    name: "OrbStack",
    description: "Docker desktop alternative for Mac.",
    category: "productivity",
    link: "https://orbstack.com/",
  },
];

/**
 * Get all tools
 */
export function getAllTools(): Tool[] {
  return tools.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: Tool["category"]): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

/**
 * Search tools by name or description
 */
export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase();
  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get all unique categories from tools
 */
export function getToolCategories(): Tool["category"][] {
  const categories = new Set(tools.map((tool) => tool.category));
  return Array.from(categories).sort();
}

/**
 * Filter tools by categories
 */
export function filterToolsByCategories(tools: Tool[], categories: Tool["category"][]): Tool[] {
  if (categories.length === 0) {
    return tools;
  }
  return tools.filter((tool) => categories.includes(tool.category));
}
