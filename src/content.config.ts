import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const problems = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/problems" }),
  schema: z.object({
    title: z.string(),
    project: z.string(),
    organization: z.string(),
    period: z.string(),
    role: z.string(),
    summary: z.string(),
    outcomes: z.array(z.string()).length(3),
    stack: z.array(z.string()),
    diagram: z.enum(["linear-flow", "document-model", "risk-propagation"]),
    order: z.number(),
  }),
});

export const collections = { problems };
