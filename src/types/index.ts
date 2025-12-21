// =============================================================================
// Core Types for Portfolio Data
// =============================================================================

/**
 * Personal/Site information
 */
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  email: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

/**
 * Hero section content
 */
export interface HeroContent {
  greeting: string;
  tagline: string;
  description: string;
}

/**
 * A skill or service category
 */
export interface SkillCategory {
  title: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  description: string;
}

/**
 * Project data
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  year: string;
  link?: string;
  github?: string;
  featured: boolean;
}

/**
 * Blog post / writing
 */
export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  published: boolean;
}

/**
 * Contact method
 */
export interface ContactMethod {
  label: string;
  value: string;
  href: string;
  icon: "email" | "github" | "linkedin" | "instagram";
}

/**
 * About page content
 */
export interface AboutContent {
  intro: {
    title: string;
    paragraphs: string[];
  };
  background: {
    title: string;
    paragraphs: string[];
  };
  expertise: {
    title: string;
    categories: {
      title: string;
      items: string[];
    }[];
  };
  values: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  };
}

/**
 * Contact page content
 */
export interface ContactContent {
  title: string;
  subtitle: string;
  methods: ContactMethod[];
}
