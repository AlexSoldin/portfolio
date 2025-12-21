# Portfolio

A personal portfolio website built with [Next.js 16](https://nextjs.org), TypeScript, and Tailwind CSS.

## System Requirements

- **Node.js**: 18.0.0 or later (recommended: 20.9+)
- **pnpm**: 8.0.0 or later

## Quick Start

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

### Development

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |

### Code Quality

| Command | Description |
|---------|-------------|
| `pnpm lint` | Check for ESLint errors |
| `pnpm lint:fix` | Auto-fix ESLint errors |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm validate` | Run all checks (lint + types + format) |

## Project Structure

```
src/
├── app/                    # App Router pages and layouts
│   ├── layout.tsx          # Root layout (HTML, fonts, global providers)
│   ├── page.tsx            # Home page (/)
│   ├── globals.css         # Global styles and CSS variables
│   ├── about/
│   │   └── page.tsx        # About page (/about)
│   ├── projects/
│   │   └── page.tsx        # Projects page (/projects)
│   ├── writing/
│   │   └── page.tsx        # Writing/blog page (/writing)
│   └── contact/
│       └── page.tsx        # Contact page (/contact)
├── components/             # Reusable UI components
│   ├── Header.tsx          # Site navigation
│   ├── Footer.tsx          # Site footer
│   └── GenerativeArt.tsx   # Interactive canvas art
└── lib/                    # Utilities and helpers (future)
```

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Fonts**: Playfair Display + DM Sans (Google Fonts)
- **Linting**: ESLint 9 + Prettier
- **Git Hooks**: Husky + lint-staged + commitlint

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Commit messages must follow this format:

```
type: description
```

**Valid types:**
- `feat` – New feature
- `fix` – Bug fix
- `docs` – Documentation changes
- `style` – Code style (formatting, semicolons)
- `refactor` – Code refactoring
- `perf` – Performance improvements
- `test` – Adding or updating tests
- `build` – Build system or dependencies
- `ci` – CI/CD configuration
- `chore` – Maintenance tasks
- `revert` – Revert a previous commit

**Examples:**
```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve mobile navigation bug"
git commit -m "docs: update README with new commands"
```

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js)

Or build and run manually:

```bash
pnpm build
pnpm start
```

## Documentation

- [Styling Guide](./docs/STYLING_GUIDE.md) - Tailwind CSS vs Custom CSS best practices
- [Component Organization](./docs/COMPONENT_ORGANIZATION.md) - How to structure components, pages, and content

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
