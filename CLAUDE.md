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

# Cloudflare deployment
pnpm cf:deploy        # Build and deploy via Wrangler CLI
pnpm cf:preview       # Build and preview with Wrangler
```

## Architecture

This is an Astro 6 portfolio site deployed to Cloudflare Workers. It ships no client framework: every component is `.astro`, and the only client JS is the small inlined theme toggle script in `Header.astro`.

**Tech stack:** Astro 6, TypeScript (strict), Tailwind CSS 4, plain CSS for motion.

### Source Structure

```
src/
├── pages/         # Astro pages (index, about, contact)
├── layouts/       # BaseLayout.astro
├── components/
│   ├── ui/        # Shared Astro components (Icon, PageHero, TabLabel, ...)
│   ├── layout/    # Header.astro, Footer.astro
│   └── features/  # Feature-specific components (home/, about/)
├── styles/        # globals.css, typography.css, features/*.css
└── data/          # Static content (about, socials)
```

### Key Patterns

- **Astro only** - no React/UI framework. Reach for an island only if a feature genuinely needs client state, and add the integration back deliberately.
- **Fonts** - self-hosted via Astro's `fonts` config in `astro.config.mjs`, loaded with `<Font />` in `BaseLayout.astro`. Load only the weights actually used.
- **Icons** - inline SVG through `components/ui/Icon.astro`; add new paths to its `paths` map. No icon fonts.
- **Tabs** - the About page tabs are CSS-only (visually hidden radios + `:checked` sibling selectors in `styles/features/about.css`).
- **Page transitions** - native cross-document view transitions (`@view-transition` in `globals.css`); the theme switch uses `document.startViewTransition`.

### Motion

- Use the tokens in `globals.css`: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for enter/exit, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement, plain `ease` for colour/hover.
- UI animations stay under 300ms; animate `transform`/`opacity` only; never `transition: all`.
- Gate custom-CSS hover effects with `@media (hover: hover) and (pointer: fine)` (Tailwind v4 `hover:` already does this).
- Every movement needs a `prefers-reduced-motion` fallback (fade instead of move, not nothing).

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
