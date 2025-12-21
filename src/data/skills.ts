import type { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  {
    title: "Engineering",
    items: [
      {
        name: "prototyping",
        description: "build small prototypes while you're still figuring out your tech",
      },
      {
        name: "backend development",
        description: "robust APIs and scalable systems with Django, PostgreSQL, and modern Python",
      },
      {
        name: "frontend engineering",
        description:
          "responsive, accessible interfaces with React, TypeScript, and attention to detail",
      },
    ],
  },
  {
    title: "Design & Strategy",
    items: [
      {
        name: "user experience",
        description: "design interactions that are easy to use and intuitive for your users",
      },
      {
        name: "system design",
        description:
          "architect solutions that balance performance, maintainability, and developer experience",
      },
      {
        name: "advising",
        description:
          "answer technical questions, do code reviews, or offer feedback and suggestions",
      },
    ],
  },
];
