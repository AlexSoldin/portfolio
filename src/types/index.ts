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
    instagram?: string;
  };
}

/**
 * Hero section content
 */
export interface HeroContent {
  title: string;
  subtitle: string;
}

/**
 * Value Proposition section content
 */
export interface ValuePropContent {
  title: string;
  description: string[];
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
 * Contact method
 */
export interface ContactMethod {
  label: string;
  value: string;
  href: string;
  icon: "email" | "github" | "linkedin" | "twitter" | "instagram" | "coffee";
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
    introParagraph: string;
    outroParagraphs: string[];
  };
  orbit: {
    title: string;
    paragraphs: string[];
    categories: {
      id: string;
      title: string;
      items: OrbitItem[];
    }[];
  };
}

export interface OrbitItem {
  emoji: string;
  name: string;
}

/**
 * Contact page content
 */
export interface ContactContent {
  title: string;
  subtitle: string;
  methods: ContactMethod[];
}

export * from "./art";
