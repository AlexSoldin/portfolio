# Component Organization Guide

## Directory Structure

```
src/
├── pages/                        # Astro file-based routing
│   ├── index.astro               # Home page (/)
│   ├── about.astro               # About page (/about)
│   └── contact.astro             # Contact page (/contact)
│
├── layouts/                      # Page layouts
│   └── BaseLayout.astro          # Root layout (HTML, fonts, meta)
│
├── components/                   # All components
│   ├── ui/                       # Primitive UI components (.astro)
│   │   ├── BackButton.astro
│   │   ├── CategoryList.astro
│   │   ├── PageHero.astro
│   │   ├── SectionHeader.astro
│   │   ├── SectionLabel.astro
│   │   ├── TabLabel.astro
│   │   └── TimelineCard.astro
│   ├── layout/                   # Layout components
│   │   ├── Header.astro
│   │   └── Footer.astro
│   └── features/                 # Feature-specific components
│       ├── home/                 # Home page components
│       │   └── RotatingBadge.tsx
│       └── about/                # About page components
│           ├── AboutBackground.astro
│           └── AboutOrbit.astro
│
├── styles/                       # Global CSS
│   ├── globals.css               # CSS variables & base styles
│   └── typography.css            # Typography styles
│
├── data/                         # Static data & content
│   ├── about.ts                  # About page data
│   └── socials.ts                # Social links
│
└── env.d.ts                      # TypeScript environment
```

## Component Categories

### 1. UI Components (`components/ui/`)

**Purpose**: Primitive, reusable building blocks

**Characteristics**:
- All `.astro` files (no JavaScript shipped)
- Style-agnostic (accept `class` prop)
- No business logic
- Highly reusable
- Examples: SectionHeader, PageHero, Card

**Example**:
```astro
---
// components/ui/Button.astro
interface Props {
  variant?: "primary" | "secondary";
  class?: string;
}

const { variant = "primary", class: className } = Astro.props;

const variants = {
  primary: "bg-[var(--accent)] text-white",
  secondary: "bg-transparent border border-[var(--border)]",
};
---

<button class:list={["px-4 py-2 rounded-lg", variants[variant], className]}>
  <slot />
</button>
```

### 2. Layout Components (`components/layout/`)

**Purpose**: Site-wide layout pieces

**Characteristics**:
- Used across multiple pages
- Can have specific styling
- Examples: Header, Footer

**Example**:
```astro
---
// components/layout/Header.astro
import { navLinks } from "@/data/navigation";
---

<header>
  <nav>
    {navLinks.map(link => (
      <a href={link.href}>{link.label}</a>
    ))}
  </nav>
</header>
```

### 3. Feature Components (`components/features/`)

**Purpose**: Page-specific or domain-specific components

**Characteristics**:
- Organized by page/feature (e.g., `home/`, `about/`)
- Can be `.astro` (static) or `.tsx` (interactive)
- Business logic + presentation
- Examples: HeroSection, Timeline, AboutOrbit

**When to use React (.tsx)**:
- Needs `useState`, `useEffect`, or other hooks
- Has `onClick` or other event handlers
- Uses third-party React libraries (GSAP, etc.)
- Requires client-side DOM manipulation

### 4. Page Components (`pages/*.astro`)

**Purpose**: Route handlers

**Characteristics**:
- File-based routing (e.g., `about.astro` → `/about`)
- Compose other components
- Wrap content in layouts
- Minimal styling (delegate to components)

**Example**:
```astro
---
// pages/about.astro
import BaseLayout from "@/layouts/BaseLayout.astro";
import PageHero from "@/components/ui/PageHero.astro";
import { aboutData } from "@/data/about";
---

<BaseLayout title="About | Alex Soldin">
  <main>
    <PageHero title={aboutData.title} subtitle={aboutData.subtitle} />
    <!-- Page content -->
  </main>
</BaseLayout>
```

### 5. Layouts (`layouts/`)

**Purpose**: Wrap pages with common structure

**Characteristics**:
- Define HTML document structure
- Include global styles and scripts
- Use `<slot />` for page content
- Handle meta tags and SEO

**Example**:
```astro
---
// layouts/BaseLayout.astro
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
  </head>
  <body>
    <slot />
  </body>
</html>
```

## Naming Conventions

### Files
- **Astro components**: PascalCase (`Button.astro`, `HeroSection.astro`)
- **React components**: PascalCase (`Counter.tsx`, `Timeline.tsx`)
- **Utilities**: camelCase (`formatDate.ts`, `spacing.ts`)
- **Data files**: camelCase (`projects.ts`, `socials.ts`)

### Exports
- **Named exports preferred** for reusable components
- **Default exports** are optional (Astro imports work with either)

```astro
---
// Both work in Astro:
import Button from "@/components/ui/Button.astro";
import { Button } from "@/components/ui/Button.astro";
---
```

## Import Patterns

### Path Aliases

Use `@/` prefix for clean imports:

```astro
---
// ✅ Good
import Button from "@/components/ui/Button.astro";
import { aboutData } from "@/data/about";

// ❌ Avoid
import Button from "../../components/ui/Button.astro";
---
```

## Data Organization

### Static Data (`data/`)

- Keep content separate from components
- Easy to migrate to CMS/API later
- Type-safe with TypeScript

```typescript
// data/socials.ts
export interface Social {
  name: string;
  url: string;
  icon: string;
}

export const socials: Social[] = [
  { name: "GitHub", url: "https://github.com/...", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/...", icon: "linkedin" },
];
```

```astro
---
// pages/contact.astro
import { socials } from "@/data/socials";
---

<ul>
  {socials.map(social => (
    <li>
      <a href={social.url}>{social.name}</a>
    </li>
  ))}
</ul>
```

## Best Practices

1. **Default to Astro components** (no JS shipped unless needed)
2. **Use React only for interactivity** (hooks, event handlers, animations)
3. **One component per file** (except related subcomponents)
4. **Keep components small** (~100 lines max)
5. **Separate data from presentation**
6. **Use slots for composition** in Astro components
7. **Use TypeScript interfaces** for props
8. **Organize features by page** in `features/` directory

## Astro vs React Decision Guide

| Need | Use |
|------|-----|
| Static content | `.astro` |
| Click handlers | `.tsx` + `client:load` |
| Form with `useState` | `.tsx` + `client:load` |
| GSAP animations | `.tsx` + `client:load` |
| Conditional styling | `.astro` (computed in frontmatter) |
| Responsive layout | `.astro` (CSS/Tailwind) |
| API data fetching | `.astro` (in frontmatter) |
