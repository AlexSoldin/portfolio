# Cloudflare deployment

This portfolio runs on Cloudflare Workers via OpenNext, enabling a Next.js 15 application to execute at the edge with full database support through Cloudflare D1.

## File structure

```
├── wrangler.jsonc           # Wrangler configuration (Workers runtime)
├── open-next.config.ts      # OpenNext adapter configuration
├── next.config.ts           # Next.js config with OpenNext dev init
├── drizzle.config.ts        # Drizzle ORM configuration
├── migrations/              # D1 database migrations
│   └── 0000_*.sql           # Initial schema
├── src/
│   ├── db/schema.ts         # Drizzle schema definitions
│   ├── types/env.ts         # Cloudflare env type definitions
│   └── app/api/             # API routes using D1
├── .open-next/              # Build output (generated)
│   ├── worker.js            # Main Worker entry point
│   ├── assets/              # Static assets for edge caching
│   └── cloudflare/          # Cloudflare-specific handlers
└── .wrangler/               # Local dev state (D1 SQLite files)
```

## How it works

### OpenNext adapter

OpenNext bridges Next.js and Cloudflare Workers. The adapter transforms Next.js output into a format compatible with the Workers runtime.

```ts
// open-next.config.ts
const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",      // Server-side rendering wrapper
      converter: "edge",                // Request/response converter
      proxyExternalRequest: "fetch",    // External API calls via fetch
      incrementalCache: "dummy",        // ISR disabled (no KV binding)
      tagCache: "dummy",
      queue: "dummy",
    },
  },
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",       // Middleware runs at edge
      // ... same overrides
    },
  },
};
```

**Key configuration choices:**

- `cloudflare-node` wrapper for SSR provides Node.js compatibility
- `cloudflare-edge` wrapper for middleware enables edge execution
- `incrementalCache: "dummy"` disables ISR (would require KV binding)
- `edgeExternals: ["node:crypto"]` allows crypto module usage

### Development environment

The `next.config.ts` initializes OpenNext for local development:

```ts
// next.config.ts
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();
```

This enables the Cloudflare context (bindings, env variables) during `pnpm dev`.

### Wrangler configuration

```jsonc
// wrangler.jsonc
{
  "name": "portfolio",
  "main": ".open-next/worker.js",
  "compatibility_date": "2024-12-01",
  "compatibility_flags": ["nodejs_compat"],

  // Custom domain routing
  "routes": [
    { "pattern": "soldin.co", "zone_name": "soldin.co" },
    { "pattern": "www.soldin.co", "zone_name": "soldin.co" }
  ],

  // Static assets from OpenNext build
  "assets": {
    "binding": "ASSETS",
    "directory": ".open-next/assets"
  },

  // D1 database binding
  "d1_databases": [{
    "binding": "portfolio",
    "database_name": "portfolio",
    "database_id": "bd09c8d3-3c28-453b-8296-cf1d41d74026",
    "migrations_dir": "migrations"
  }]
}
```

### D1 database integration

The database uses Drizzle ORM with Cloudflare D1 (SQLite at the edge).

**Schema definition:**

```ts
// src/db/schema.ts
export const contactRequests = sqliteTable("contact_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: integer("created_at").default(sql`(unixepoch())`),
});
```

**Accessing D1 in API routes:**

```ts
// src/app/api/contact/route.ts
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";

const { env } = await getCloudflareContext();
const db = drizzle(env.portfolio);  // 'portfolio' matches wrangler binding
```

## Design choices

### OpenNext over native Workers

**Why OpenNext:** Enables using the full Next.js framework (App Router, Server Components, API routes) while deploying to Cloudflare Workers. The alternative would be rewriting as a pure Workers application, losing Next.js benefits.

**Trade-offs:**
- (+) Full Next.js compatibility
- (+) Familiar development experience
- (-) Additional build step and configuration
- (-) Some Next.js features disabled (ISR requires KV)

### D1 over other databases

**Why D1:** Zero-latency database access from Workers (same Cloudflare network), SQLite compatibility, automatic replication, and no separate database service to manage.

**Trade-offs:**
- (+) No network hop to external database
- (+) SQLite syntax familiarity
- (+) Automatic global replication
- (-) 10GB storage limit per database
- (-) No real-time subscriptions

### Drizzle ORM

**Why Drizzle:** Type-safe SQL queries, excellent D1 support, lightweight (no heavy runtime), and migration generation.

**Alternative considered:** Raw SQL via D1 API—rejected for lack of type safety.

### Turnstile for bot protection

**Why Turnstile:** Cloudflare-native, privacy-preserving CAPTCHA alternative that integrates seamlessly with Workers and uses the `CF-Connecting-IP` header for validation.

## Technology usage

| Technology | Purpose | Why chosen |
|------------|---------|------------|
| Cloudflare Workers | Edge compute runtime | Global distribution, fast cold starts |
| OpenNext | Next.js adapter | Full framework support on Workers |
| D1 | Database | Edge-native SQLite, zero-latency |
| Drizzle ORM | Database access | Type-safe, lightweight, D1 support |
| Wrangler | CLI tooling | Deploy, preview, database management |
| Turnstile | Bot protection | Privacy-preserving, Cloudflare-native |

## Key patterns

### Accessing Cloudflare context

```ts
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Env } from "@/types/env";

export async function POST(request: NextRequest) {
  const { env } = await getCloudflareContext() as unknown as { env: Env };

  // Access bindings
  const db = drizzle(env.portfolio);           // D1 database
  const secret = env.TURNSTILE_SECRET_KEY;     // Environment variable
}
```

### Type-safe environment

```ts
// src/types/env.ts
export interface Env {
  portfolio: D1Database;
  TURNSTILE_SECRET_KEY: string;
  TURNSTILE_SITE_KEY: string;
}
```

### Migration workflow

```bash
# Generate migration from schema changes
pnpm db:generate

# Apply locally (uses .wrangler/state SQLite)
pnpm db:migrate

# Apply to production D1
pnpm db:migrate:prod
```

## Deployment commands

| Command | Description |
|---------|-------------|
| `pnpm cf:build` | Build with OpenNext for Workers |
| `pnpm cf:dev` | Local dev with Workers runtime |
| `pnpm cf:preview` | Build and preview locally |
| `pnpm cf:deploy` | Deploy to production |

## Best practices

1. **Always test with `cf:dev`** before deploying—catches Workers-specific issues that `pnpm dev` might miss

2. **Check binding availability** before using D1:
   ```ts
   if (env.portfolio) {
     const db = drizzle(env.portfolio);
     // ... use db
   }
   ```

3. **Use `.dev.vars`** for local secrets (Turnstile keys)—never commit to git

4. **Run migrations locally first** with `db:migrate` before `db:migrate:prod`

5. **Type your environment** in `src/types/env.ts` to catch binding errors at compile time
