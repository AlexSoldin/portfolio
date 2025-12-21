import type { AboutContent } from "@/types";

export const aboutContent: AboutContent = {
  intro: {
    title: "The Short Version",
    paragraphs: [
      "I'm a **creative engineer** with a passion for building things that matter. My work sits at the intersection of engineering excellence and thoughtful design—I believe the best software is both technically robust and delightful to use.",
      "Currently, I'm focused on building scalable web applications, designing intuitive user experiences, and exploring the creative possibilities of code.",
    ],
  },
  background: {
    title: "Background",
    paragraphs: [
      "I started my journey in software development driven by curiosity about how things work. Over the years, that curiosity has led me through backend systems, frontend interfaces, and everything in between.",
      "My experience spans working on complex enterprise systems to crafting polished consumer products. I've learned that good engineering isn't just about writing code—it's about understanding problems deeply and communicating solutions clearly.",
      "When I'm not coding, you'll find me exploring new technologies, reading about design systems, or working on creative side projects.",
    ],
  },
  expertise: {
    title: "Technical Expertise",
    categories: [
      {
        title: "Backend & Systems",
        items: [
          "Python & Django",
          "PostgreSQL & Database Design",
          "REST APIs & GraphQL",
          "Celery & Background Tasks",
        ],
      },
      {
        title: "Frontend & Design",
        items: [
          "React & TypeScript",
          "Next.js & Modern Frameworks",
          "CSS & Tailwind",
          "UI/UX Design Principles",
        ],
      },
    ],
  },
  values: {
    title: "Values",
    items: [
      {
        title: "Craft",
        description:
          "I care deeply about the quality of my work. Every line of code, every pixel matters.",
      },
      {
        title: "Clarity",
        description:
          "Complex problems deserve simple solutions. I strive for code that tells a story.",
      },
      {
        title: "Growth",
        description:
          "Technology evolves constantly. I embrace learning and adapting to new challenges.",
      },
    ],
  },
};
