import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project-alpha",
    title: "Project Alpha",
    description:
      "A full-stack application for managing complex workflows with real-time collaboration features. Built to handle enterprise-scale data while maintaining a delightful user experience.",
    longDescription:
      "This project challenged me to think deeply about system architecture, real-time data synchronization, and building intuitive interfaces for complex operations.",
    tags: ["Django", "React", "PostgreSQL", "WebSockets"],
    year: "2024",
    link: "#",
    featured: true,
  },
  {
    id: "design-system",
    title: "Design System",
    description:
      "A comprehensive component library with an accessibility-first approach. Includes thorough documentation, interactive examples, and design tokens.",
    longDescription:
      "Created to establish consistency across multiple products while empowering designers and developers to work faster without sacrificing quality.",
    tags: ["TypeScript", "Storybook", "CSS Variables", "A11y"],
    year: "2024",
    link: "#",
    featured: true,
  },
  {
    id: "data-pipeline",
    title: "Data Pipeline",
    description:
      "An ETL pipeline for processing and transforming large datasets with built-in monitoring and error recovery mechanisms.",
    tags: ["Python", "Celery", "RabbitMQ", "PostgreSQL"],
    year: "2023",
    link: "#",
    featured: false,
  },
  {
    id: "api-gateway",
    title: "API Gateway",
    description:
      "A high-performance API gateway with rate limiting, authentication, and comprehensive logging for microservices architecture.",
    tags: ["Django REST Framework", "Redis", "Docker"],
    year: "2023",
    link: "#",
    featured: false,
  },
  {
    id: "creative-experiments",
    title: "Creative Experiments",
    description:
      "A collection of generative art pieces and creative coding experiments exploring the intersection of code and visual design.",
    tags: ["Canvas API", "p5.js", "TypeScript"],
    year: "2024",
    link: "#",
    featured: false,
  },
  {
    id: "cli-tooling",
    title: "CLI Tooling",
    description:
      "Developer productivity tools including code generators, migration helpers, and project scaffolding utilities.",
    tags: ["Python", "Click", "Rich"],
    year: "2023",
    link: "#",
    featured: false,
  },
];

// Helper functions that could later become API calls
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
