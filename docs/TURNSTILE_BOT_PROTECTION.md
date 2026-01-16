# Turnstile bot protection

This portfolio uses Cloudflare Turnstile to protect the contact form from spam and automated submissions. Turnstile is a privacy-preserving CAPTCHA alternative that verifies users are human without intrusive challenges.

## File structure

```
src/
├── app/
│   ├── contact/page.tsx              # Contact form with Turnstile widget
│   └── api/contact/route.ts          # Server-side token verification
├── hooks/
│   └── useContactForm.ts             # Form state management + token handling
├── services/
│   ├── turnstile.ts                  # Turnstile verification service
│   └── contact.ts                    # Database persistence
├── lib/validation/
│   └── contact.ts                    # Zod schema requiring token
└── types/
    └── env.d.ts                      # TURNSTILE_SECRET_KEY type definition
```

## How it works

### Client-side widget integration

The contact page uses `@marsidev/react-turnstile` to render the Turnstile widget. When a user completes the challenge (often invisibly), a token is generated and stored in component state.

```tsx
// src/app/contact/page.tsx:54-61
<Turnstile
  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
  onSuccess={(token: string) => setToken(token)}
  onError={() => setToken(null)}
  onExpire={() => setToken(null)}
  options={{ theme: "dark", size: "flexible" }}
/>
```

**Key behaviors:**
- `onSuccess` captures the verification token when the user passes
- `onError` and `onExpire` reset the token to `null`, preventing submission
- The submit button is disabled until a valid token exists (`disabled={!token}`)

### Token flow through form submission

1. **User completes form** → Turnstile generates token → stored in state
2. **User submits** → `useContactForm` hook receives token as parameter
3. **Hook validates** → ensures token exists before making API call
4. **API request** → token included in JSON body with form data

```tsx
// src/hooks/useContactForm.ts:43-53
const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>, token: string | null) => {
  e.preventDefault();

  if (!token) {
    setSubmitStatus({
      type: "error",
      message: "Please complete the security check.",
    });
    return;
  }
  // ... continues with API call
});
```

### Server-side verification

The API route performs a three-step process: validate input, verify token, then save to database.

```ts
// src/app/api/contact/route.ts:22-34
const isHuman = await verifyTurnstileToken(
  token,
  env.TURNSTILE_SECRET_KEY,
  request.headers.get("CF-Connecting-IP") || undefined
);

if (!isHuman) {
  return NextResponse.json(
    { error: "Security check failed. Please try again." },
    { status: 403 }
  );
}
```

### Turnstile verification service

The service makes a POST request to Cloudflare's siteverify endpoint with the token, secret key, and optionally the client IP.

```ts
// src/services/turnstile.ts:6-36
export async function verifyTurnstileToken(
  token: string,
  secretKey: string,
  remoteIp?: string
): Promise<boolean> {
  const formData = new FormData();
  formData.append("secret", secretKey);
  formData.append("response", token);
  if (remoteIp) {
    formData.append("remoteip", remoteIp);
  }

  const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });

  const outcome = await result.json();
  return outcome.success;
}
```

### Validation schema

The Zod schema enforces that a token must be present in every contact form submission:

```ts
// src/lib/validation/contact.ts:3-9
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  token: z.string().min(1, "Turnstile token is required"),
});
```

## Design choices

### React Turnstile library over manual integration

**Why `@marsidev/react-turnstile`:** Provides React-native callbacks (`onSuccess`, `onError`, `onExpire`), handles script loading, and manages widget lifecycle automatically.

**Alternative considered:** Manual script injection and global callback functions—rejected for complexity and potential memory leaks.

### Token passed as function parameter

**Why:** The token is stored in the contact page's state and passed to `handleSubmit` as a parameter rather than being read from a hidden form field.

**Rationale:**
- Keeps the hook decoupled from the DOM structure
- Enables explicit validation before submission
- Allows the hook to be reused with different verification methods

### Verification before database write

**Why:** The API route verifies the Turnstile token before any database operation occurs.

**Rationale:**
- Prevents wasted database writes from bots
- Fails fast on invalid tokens (403 response)
- Keeps the database clean of spam entries

### Using CF-Connecting-IP header

**Why:** Passing the client's real IP to Turnstile improves verification accuracy.

**Rationale:**
- Cloudflare Workers have access to `CF-Connecting-IP` header
- Helps Turnstile detect VPN/proxy abuse
- Optional parameter—verification still works without it

## Technology usage

| Technology | Purpose | Why chosen |
|------------|---------|------------|
| Cloudflare Turnstile | Bot protection | Privacy-preserving, no user friction |
| `@marsidev/react-turnstile` | React integration | Clean API, handles lifecycle |
| Zod | Schema validation | Type-safe token requirement |
| Cloudflare Workers | Server verification | Native `CF-Connecting-IP` access |

## Key patterns

### Disabling submit until verified

```tsx
// src/app/contact/page.tsx:63
<Button type="submit" disabled={isSubmitting || !token} fullWidth>
```

This pattern ensures users cannot submit without completing verification.

### Graceful token expiration handling

```tsx
// src/app/contact/page.tsx:58
onExpire={() => setToken(null)}
```

Turnstile tokens expire after a few minutes. The `onExpire` callback resets state, requiring the user to re-verify before submitting.

### Environment variable separation

- **Client-side:** `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (public, embedded in HTML)
- **Server-side:** `TURNSTILE_SECRET_KEY` (secret, stored in Cloudflare Workers env)

```ts
// src/types/env.d.ts
export interface Env {
  portfolio: D1Database;
  TURNSTILE_SECRET_KEY: string;
}
```

### Error handling flow

| Scenario | Client behavior | Server behavior |
|----------|-----------------|-----------------|
| Widget fails to load | `onError` → token null → submit disabled | N/A |
| Token expired | `onExpire` → token null → submit disabled | N/A |
| Missing token | Hook shows error message | 400: Zod validation fails |
| Invalid/forged token | N/A | 403: "Security check failed" |
| Verification service down | N/A | 403: Verification returns false |

## Configuration

### Cloudflare dashboard setup

1. Navigate to Cloudflare Dashboard → Turnstile
2. Create a widget for your domain
3. Copy the site key (public) and secret key (private)

### Environment variables

**Local development (`.dev.vars`):**
```
TURNSTILE_SECRET_KEY=0x...your-secret-key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x...your-site-key
```

**Production (Cloudflare Workers secrets):**
```bash
wrangler secret put TURNSTILE_SECRET_KEY
```

### Testing with test keys

Cloudflare provides test keys for development:
- Site key: `1x00000000000000000000AA` (always passes)
- Secret key: `1x0000000000000000000000000000000AA` (always passes)

The contact page falls back to the test site key if none is configured:

```tsx
siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
```

## Best practices

1. **Never expose the secret key** client-side—it must only exist in server environment

2. **Always verify server-side**—client-side token presence is not sufficient security

3. **Handle all widget states** (`onSuccess`, `onError`, `onExpire`) to prevent stuck UI

4. **Use the flexible size option** for responsive layouts:
   ```tsx
   options={{ theme: "dark", size: "flexible" }}
   ```

5. **Include client IP when possible** for improved verification accuracy

6. **Log verification failures** for monitoring potential attacks:
   ```ts
   if (!outcome.success) {
     console.error("Turnstile verification failed:", outcome);
   }
   ```
