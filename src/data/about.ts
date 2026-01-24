export const locations = [
  {
    period: "2023 — Present",
    location: "Amsterdam",
    organization: "Coolset",
    role: "Software engineer",
    isActive: true,
  },
  {
    period: "2021 — 2022",
    location: "Johannesburg",
    organization: "Isazi Consulting",
    role: "Data scientist turned software engineer",
    isActive: false,
  },
  {
    period: "2017 — 2020",
    location: "Cape Town",
    organization: "University of Cape Town",
    role: "Electrical and computer engineering",
    isActive: false,
  },
  {
    period: "1998 — 2016",
    location: "Johannesburg",
    organization: "King David Linksfield",
    role: "Schooling",
    isActive: false,
  },
] as const;

export const interests = {
  body: ["Pilates", "Squash", "Traveling"],
  craft: ["Cooking and baking", "Gaming", "Specialty coffee"],
  mind: ["Chess", "Puzzles", "Sudoku"],
} as const;

export const toolkit = {
  build: ["Python", "Django", "Celery", "PostgreSQL"],
  ship: ["Terraform", "Cloudflare", "GitHub Actions", "n8n", "Zapier"],
  run: ["Google Cloud", "Firebase", "Sentry"],
  coordinate: ["Jira", "Linear", "Notion", "Slack"],
} as const;

export type Location = (typeof locations)[number];
export type InterestCategory = keyof typeof interests;
export type ToolkitCategory = keyof typeof toolkit;
