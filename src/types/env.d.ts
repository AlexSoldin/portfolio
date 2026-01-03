// D1Database is globally available via @cloudflare/workers-types

export interface Env {
  portfolio: D1Database;
  TURNSTILE_SECRET_KEY: string;
}
