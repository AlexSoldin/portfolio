# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev              # Start Astro dev server
pnpm build            # Build for production
pnpm preview          # Preview production build locally

# Code quality
pnpm lint             # Check ESLint errors (max-warnings: 0)
pnpm lint:fix         # Auto-fix ESLint errors
pnpm format           # Format with Prettier
pnpm type-check       # TypeScript validation (astro check + tsc)
pnpm validate         # Run all checks (lint + type-check + format:check)

# Database (Drizzle + Cloudflare D1)
pnpm db:generate      # Generate Drizzle migrations
pnpm db:migrate       # Apply migrations locally
pnpm db:migrate:prod  # Apply migrations to production

# Cloudflare deployment
pnpm cf:deploy        # Build and deploy via Wrangler CLI
pnpm cf:preview       # Build and preview with Wrangler
```

## Architecture

This is an Astro 5 portfolio site with React islands, deployed to Cloudflare Workers.

**Tech stack:** Astro 5, React 18, TypeScript (strict), Tailwind CSS 4, GSAP for animations, Drizzle ORM with Cloudflare D1 (SQLite), Turnstile for bot protection.

### Source Structure

```
src/
├── pages/         # Astro pages and API routes
├── layouts/       # Astro layouts (BaseLayout.astro)
├── components/
│   ├── ui/        # UI components (.astro for static, .tsx for React islands)
│   ├── layout/    # Header.astro, Footer.astro
│   └── features/  # Feature-specific React islands (home/, about/, contact/)
├── styles/        # Global CSS (globals.css)
├── lib/           # Utilities, helpers, validation schemas
├── hooks/         # Custom React hooks
├── services/      # Business logic (contact form, Turnstile verification)
├── config/        # Site config, navigation, constants
├── data/          # Static content (projects, posts, tools, skills)
├── types/         # TypeScript definitions
└── db/            # Drizzle schema (contact_requests table)
```

### Key Patterns

- **Astro components by default** - use React only for interactive features
- **React islands** - use `client:load` or `client:visible` directives for interactive components
- **GSAP animations** - React islands using `@gsap/react` with proper scope refs
- **GenerativeArt** - canvas-based procedural art, React island
- **Contact form** - React island with custom `useContactForm` hook, Turnstile integration, Zod validation, D1 storage

### React Islands (client-side components)

- `HeroSection.tsx` - contains GenerativeArt and TextReveal
- `GenerativeArt.tsx` - canvas-based procedural art
- `TextReveal.tsx` - GSAP text animation
- `ValueProp.tsx` - GSAP scroll animation
- `BusinessCardGenerator.tsx` - canvas-based card generator
- `Timeline.tsx` - GSAP scroll animation
- `AboutOrbitSection.tsx` - tab filtering with orbital visualization
- `AboutOrbit.tsx` - orbital animation
- `ContactForm.tsx` - form with Turnstile

## Conventions

### Text Capitalization (Critical)

Use **sentence case** for all user-facing text:
- "Send a message", "About me", "More projects"
- Exceptions: "Alex Soldin" (always both caps), proper nouns (Django, React, TypeScript, API)

### Code Style

- Functional components with TypeScript interfaces for props
- No enums; use const objects or literal unions
- Descriptive variable names with auxiliary verbs (`isLoading`, `hasError`)
- Named exports (avoid default exports except for pages)
- Components ~100 lines max; prefer composition over configuration
- Path alias: `@/*` maps to `./src/*`

### Naming

- Directories: lowercase with dashes (`components/auth-wizard`)
- Component files: PascalCase for React (`AuthWizard.tsx`), PascalCase for Astro (`AuthWizard.astro`)
- Utility files: camelCase (`formatDate.ts`)

### Styling

- Tailwind CSS utility classes; CSS variables in `globals.css` for theming
- Mobile-first responsive design with Tailwind breakpoints

### Git

- Conventional commits required (feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert)
- All lowercase subjects, max 100 characters
- Pre-commit hooks auto-run ESLint + Prettier on staged files
