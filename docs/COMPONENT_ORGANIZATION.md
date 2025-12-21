# Component Organization Guide

## Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, providers)
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles & CSS variables
│   ├── about/page.tsx            # Route pages
│   ├── projects/page.tsx
│   ├── writing/page.tsx
│   ├── contact/page.tsx
│   └── api/                      # API routes
│       └── contact/route.ts
│
├── components/                    # All React components
│   ├── ui/                       # Primitive UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── PageHeader.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── ContactLinkCard.tsx
│   │   └── index.ts              # Barrel export
│   │
│   ├── Header.tsx                # Layout components
│   ├── Footer.tsx
│   ├── HeroSection.tsx           # Feature components
│   └── GenerativeArt.tsx
│
├── data/                         # Static data & content
│   ├── site.ts                   # Site configuration
│   ├── projects.ts               # Project data
│   ├── posts.ts                  # Blog post data
│   ├── about.ts                  # About page content
│   ├── contact.ts                # Contact data
│   └── index.ts                  # Barrel export
│
├── types/                        # TypeScript type definitions
│   └── index.ts                  # All shared types
│
└── lib/                          # Utilities & helpers
    ├── spacing.ts                # Spacing constants
    └── utils.ts                  # Helper functions (future)
```

## Component Categories

### 1. UI Components (`components/ui/`)

**Purpose**: Primitive, reusable building blocks

**Characteristics**:
- Style-agnostic (accept `className` prop)
- No business logic
- Highly reusable
- Examples: Button, Input, Card, Tag

**Example**:
```tsx
// components/ui/Button.tsx
export function Button({ variant, className, ...props }) {
  return <button className={cn(buttonVariants(variant), className)} {...props} />;
}
```

### 2. Layout Components (`components/`)

**Purpose**: Site-wide layout pieces

**Characteristics**:
- Used across multiple pages
- Can have specific styling
- Examples: Header, Footer, HeroSection

**Example**:
```tsx
// components/Header.tsx
export default function Header() {
  return <nav>...</nav>;
}
```

### 3. Feature Components (`components/`)

**Purpose**: Domain-specific, reusable components

**Characteristics**:
- Business logic + presentation
- Used in specific contexts
- Examples: GenerativeArt, ContactLinkCard

### 4. Page Components (`app/*/page.tsx`)

**Purpose**: Route handlers (Server Components by default)

**Characteristics**:
- Compose other components
- Fetch data (Server Components)
- Minimal styling (delegate to components)

**Example**:
```tsx
// app/projects/page.tsx
import { getAllProjects } from "@/data";
import { PageHeader, Card } from "@/components/ui";

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <PageHeader title="Projects" />
      {/* ... */}
    </div>
  );
}
```

## Naming Conventions

### Files
- **Components**: PascalCase (`Button.tsx`, `HeroSection.tsx`)
- **Utilities**: camelCase (`formatDate.ts`, `spacing.ts`)
- **Types**: camelCase (`index.ts` - contains interfaces/types)
- **Data**: camelCase (`projects.ts`, `site.ts`)

### Components
- **Default export**: For page components and main components
- **Named export**: For UI components and utilities

```tsx
// ✅ Default export (main component)
export default function Header() { }

// ✅ Named export (reusable component)
export function Button() { }
```

## Import Patterns

### Barrel Exports

Use `index.ts` files to create clean imports:

```tsx
// components/ui/index.ts
export { Button } from "./Button";
export { Input } from "./Input";
export { Card } from "./Card";

// Usage
import { Button, Input, Card } from "@/components/ui";
```

### Path Aliases

Use `@/` prefix for clean imports:

```tsx
// ✅ Good
import { Button } from "@/components/ui";
import { getAllProjects } from "@/data";
import type { Project } from "@/types";

// ❌ Avoid
import { Button } from "../../components/ui/Button";
```

## Data Organization

### Static Data (`data/`)

- Keep content separate from components
- Easy to migrate to CMS/API later
- Type-safe with TypeScript

```tsx
// data/projects.ts
export const projects: Project[] = [ /* ... */ ];
export function getFeaturedProjects() { /* ... */ }

// app/projects/page.tsx
import { getAllProjects } from "@/data";
```

### Types (`types/`)

- Centralized type definitions
- Shared across components and data
- Single source of truth

## Best Practices

1. **One component per file** (except related subcomponents)
2. **Co-locate related files** (component + types + styles if needed)
3. **Use barrel exports** for clean imports
4. **Keep components small** (~100 lines max)
5. **Separate data from presentation**
6. **Default to Server Components** (use `"use client"` only when needed)
7. **Use TypeScript interfaces** for props
8. **Compose components** rather than creating mega-components

## Migration to API/Database

When ready to move from static data to API:

1. **Create API routes** in `app/api/`
2. **Replace data imports** with API calls
3. **Components stay the same** (they just receive props)
4. **Types remain unchanged**

```tsx
// Before (static)
import { getAllProjects } from "@/data";
const projects = getAllProjects();

// After (API)
const response = await fetch("/api/projects");
const projects = await response.json();
```

