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
  icon: "email" | "github" | "linkedin" | "instagram" | "coffee";
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

/**
 * Tool data
 */
export interface Tool {
  id: string;
  name: string;
  description: string;
  category: "productivity" | "coding" | "communication" | "media" | "security" | "other";
  link?: string;
}

/**
 * Room types for floor plan
 */
export type RoomType = "living" | "bedroom" | "kitchen" | "bathroom" | "office" | "balcony";

/**
 * Product icon types
 */
export type ProductIcon =
  | "desk"
  | "keyboard"
  | "headphones"
  | "lamp"
  | "monitor"
  | "coffee"
  | "pan"
  | "kettle"
  | "sofa"
  | "blanket"
  | "bed"
  | "speaker"
  | "bottle"
  | "towel"
  | "chair"
  | "plant"
  | "laptop"
  | "code"
  | "terminal"
  | "music"
  | "browser"
  | "notes"
  | "calendar"
  | "chat";

/**
 * Sub-item for products (e.g., apps on a laptop)
 */
export interface ProductChild {
  id: string;
  name: string;
  icon: ProductIcon;
  description: string;
}

/**
 * Product data
 */
export interface Product {
  id: string;
  name: string;
  icon: ProductIcon;
  category: "household" | "accessories" | "tech" | "furniture" | "kitchen" | "other";
  room: RoomType;
  useCase: string;
  whyILikeIt: string;
  children?: ProductChild[];
}
