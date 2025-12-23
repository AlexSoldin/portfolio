// Barrel export for all data
// In the future, these could be replaced with API calls

export { heroContent } from "./site";
export { skills } from "./skills";
export { projects, getFeaturedProjects, getAllProjects, getProjectById } from "./projects";
export {
  posts,
  getPublishedPosts,
  getRecentPosts,
  getPostBySlug,
  getPostCategories,
} from "./posts";
export { aboutContent } from "./about";
export { contactContent, contactMethods } from "./contact";
export {
  tools,
  getAllTools,
  getToolsByCategory,
  searchTools,
  getToolCategories,
  filterToolsByCategories,
} from "./tools";
