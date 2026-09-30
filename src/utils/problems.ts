import { getCollection, type CollectionEntry } from "astro:content";

export type Problem = CollectionEntry<"problems">;

export async function getProblems(): Promise<Problem[]> {
  const problems = await getCollection("problems");
  return problems.sort((a, b) => a.data.order - b.data.order);
}
