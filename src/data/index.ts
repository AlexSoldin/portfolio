// Barrel export for all data
// In the future, these could be replaced with API calls

export { aboutContent } from "./about";
export { contactContent, contactMethods } from "./contact";
export {
  getPostBySlug,
  getPostCategories,
  getPublishedPosts,
  getRecentPosts,
  posts,
} from "./posts";
export { getAllProjects, getFeaturedProjects, getProjectById, projects } from "./projects";
export { heroContent, valuePropContent } from "./site";
export { skills } from "./skills";
export {
  filterToolsByCategories,
  getAllTools,
  getToolCategories,
  getToolsByCategory,
  searchTools,
  tools,
} from "./tools";
