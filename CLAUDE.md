# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server

# Code quality
pnpm lint             # Check ESLint errors (max-warnings: 0)
pnpm lint:fix         # Auto-fix ESLint errors
pnpm format           # Format with Prettier
pnpm type-check       # TypeScript validation
pnpm validate         # Run all checks (lint + type-check + format:check)

# Database (Drizzle + Cloudflare D1)
pnpm db:generate      # Generate Drizzle migrations
pnpm db:migrate       # Apply migrations locally
pnpm db:migrate:prod  # Apply migrations to production

# Cloudflare deployment
pnpm cf:build         # Build for Cloudflare Workers
pnpm cf:dev           # Local dev with Workers runtime
pnpm cf:deploy        # Deploy via Wrangler CLI
pnpm cf:preview       # Build and preview locally
```

## Architecture

This is a Next.js 15 portfolio site using App Router, deployed to Cloudflare Workers via OpenNext.

**Tech stack:** Next.js 15, React 18, TypeScript (strict), Tailwind CSS 4, GSAP for animations, Drizzle ORM with Cloudflare D1 (SQLite), Turnstile for bot protection.

### Source Structure

```
src/
├── app/           # Next.js App Router (pages, layouts, API routes)
├── components/
│   ├── ui/        # Primitive components (Button, Card, Input, etc.)
│   ├── layout/    # Header, Footer
│   └── features/  # Feature-specific components (home/, about/, etc.)
├── lib/           # Utilities, helpers, validation schemas
├── hooks/         # Custom React hooks
├── services/      # Business logic (contact form, Turnstile verification)
├── config/        # Site config, navigation, constants
├── data/          # Static content (projects, posts, tools, skills)
├── types/         # TypeScript definitions
└── db/            # Drizzle schema (contact_requests table)
```

### Key Patterns

- **Server Components by default** - use `"use client"` only when needed (state, events, browser APIs)
- **GSAP animations** - uses `@gsap/react` with proper scope refs; TextReveal and ValueProp components use ScrollTrigger
- **GenerativeArt** - canvas-based procedural art, client-side rendered
- **Contact form** - custom `useContactForm` hook with Turnstile integration, Zod validation, D1 storage

## Conventions

### Text Capitalization (Critical)

Use **sentence case** for all user-facing text:
- ✅ "Send a message", "About me", "More projects"
- ❌ "Send a Message", "About Me", "More Projects"

Exceptions: "Alex Soldin" (always both caps), proper nouns (Django, React, TypeScript, API).

### Code Style

- Functional components with TypeScript interfaces for props
- No enums; use const objects or literal unions
- Descriptive variable names with auxiliary verbs (`isLoading`, `hasError`)
- Named exports (avoid default exports except for pages)
- Components ~100 lines max; prefer composition over configuration
- Path alias: `@/*` maps to `./src/*`

### Naming

- Directories: lowercase with dashes (`components/auth-wizard`)
- Component files: PascalCase (`AuthWizard.tsx`)
- Utility files: camelCase (`formatDate.ts`)

### Styling

- Tailwind CSS utility classes; CSS variables in `globals.css` for theming
- Mobile-first responsive design with Tailwind breakpoints
- Use `cn()` utility for conditional classes

### Git

- Conventional commits required (feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert)
- All lowercase subjects, max 100 characters
- Pre-commit hooks auto-run ESLint + Prettier on staged files
