# Portfolio

A personal portfolio website built with [Astro 5](https://astro.build), TypeScript, and Tailwind CSS, deployed to Cloudflare Workers.

## System requirements

- **Node.js**: 18.0.0 or later (recommended: 20.9+)
- **pnpm**: 8.0.0 or later

## Quick start

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) to view the app.

## Available scripts

### Development

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Astro development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |

### Code quality

| Command | Description |
|---------|-------------|
| `pnpm lint` | Check for ESLint errors |
| `pnpm lint:fix` | Auto-fix ESLint errors |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm validate` | Run all checks (lint + types + format) |

## Project structure

```
src/
├── pages/                      # Astro pages (file-based routing)
│   ├── index.astro             # Home page (/)
│   ├── about.astro             # About page (/about)
│   └── contact.astro           # Contact page (/contact)
│
├── layouts/                    # Astro layouts
│   └── BaseLayout.astro        # Root layout (HTML, fonts, global styles)
│
├── components/                 # All components
│   ├── ui/                     # Primitive UI components (.astro)
│   │   ├── BackButton.astro
│   │   ├── CategoryList.astro
│   │   ├── PageHero.astro
│   │   ├── SectionHeader.astro
│   │   ├── SectionLabel.astro
│   │   ├── TabLabel.astro
│   │   └── TimelineCard.astro
│   ├── layout/                 # Layout components
│   │   ├── Header.astro
│   │   └── Footer.astro
│   └── features/               # Feature-specific components
│       ├── home/               # Home page components
│       │   └── RotatingBadge.tsx
│       └── about/              # About page components
│           ├── AboutBackground.astro
│           └── AboutOrbit.astro
│
├── styles/                     # Global CSS
│   ├── globals.css             # CSS variables and base styles
│   └── typography.css          # Typography styles
│
├── data/                       # Static data & content
│   ├── about.ts                # About page data
│   └── socials.ts              # Social links
│
└── env.d.ts                    # TypeScript environment definitions
```

## Tech stack

- **Framework**: [Astro 5](https://astro.build) with React islands
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Fonts**: Playfair Display + DM Sans (Google Fonts)
- **Linting**: ESLint 9 + Prettier
- **Git hooks**: Husky + lint-staged + commitlint
- **Deployment**: Cloudflare Workers

## Commit convention

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

This project is deployed to **Cloudflare Workers** using the [@astrojs/cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) adapter.

### Cloudflare scripts

| Command | Description |
|---------|-------------|
| `pnpm cf:build` | Build for Cloudflare Workers |
| `pnpm cf:deploy` | Build and deploy via Wrangler CLI |
| `pnpm cf:preview` | Build and preview locally with Wrangler |

### Option 1: Git integration (recommended)

1. **Push your code to GitHub**

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → Create
   - Select "Pages" → Connect to Git
   - Select your repository

3. **Configure build settings:**

   | Setting | Value |
   |---------|-------|
   | Build command | `pnpm build` |
   | Build output directory | `dist` |
   | Root directory | _(leave blank)_ |

4. **Add environment variable:**

   | Variable | Value |
   |----------|-------|
   | `NODE_VERSION` | `20` |

5. **Deploy** - Cloudflare will auto-deploy on every push to `main`

### Option 2: Direct CLI deployment

```bash
# First time: Login to Cloudflare
pnpm wrangler login

# Build and deploy
pnpm cf:deploy
```

## Agent readiness

The site publishes the discovery documents and response headers AI agents look for (measured by [isitagentready.com](https://isitagentready.com/soldin.co)).

| File / header | Purpose |
|---------------|---------|
| `public/robots.txt` | Crawl rules, explicit AI-crawler entries, and [Content Signals](https://contentsignals.org/) — allow search/ai-input, disallow ai-train |
| `public/.well-known/agent-skills/index.json` (+ `about/`, `contact/` `SKILL.md`) | Agent Skills Discovery index ([RFC v0.2.0](https://github.com/cloudflare/agent-skills-discovery-rfc)) |
| `@astrojs/sitemap` | Auto-generated `/sitemap-index.xml`, referenced from `robots.txt` |
| `src/middleware.ts` | Adds RFC 8288 `Link` response headers on the homepage |
| Cloudflare zone setting | [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) — enable once in the `soldin.co` zone dashboard (no repo artifact) |

After editing any `SKILL.md`, run `pnpm skills:digest` to refresh the `sha256` fields in `index.json` (also runs automatically as part of `pnpm build`).

**Intentionally skipped** (not applicable to a content-only portfolio): API catalog, OAuth/OIDC discovery, OAuth Protected Resource Metadata, MCP Server Card, WebMCP. Revisit if the site grows to expose public APIs or an MCP server.

## Documentation

- [Styling Guide](./docs/STYLING_GUIDE.md) - Tailwind CSS best practices
- [Component Organization](./docs/COMPONENT_ORGANIZATION.md) - How to structure components, pages, and content

## Learn more

- [Astro Documentation](https://docs.astro.build)
- [Astro + React](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
