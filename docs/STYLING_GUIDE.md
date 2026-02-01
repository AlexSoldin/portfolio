# Styling Guide: Tailwind CSS Best Practices

## Why Tailwind CSS?

**Tailwind CSS is the recommended approach for Astro** because:

### Advantages

1. **Performance**: Only CSS you use is included in the final bundle (tree-shaking)
2. **Consistency**: Enforces design system through utility classes
3. **Developer experience**: No context switching between files, see styles inline
4. **Maintainability**: Styles are co-located with components
5. **Responsive design**: Built-in breakpoints (`sm:`, `md:`, `lg:`)
6. **Astro integration**: Works seamlessly with both Astro and React components

### When to Use Custom CSS

Use custom CSS files for:

1. **Complex animations**: Keyframe animations, transitions
2. **Global styles**: Base resets, typography scales
3. **CSS variables**: Theme tokens (like we do in `globals.css`)
4. **Third-party overrides**: Styling external libraries
5. **Complex selectors**: Pseudo-elements, nth-child patterns

## Current Approach (Hybrid)

We use a **hybrid approach** which is best practice:

```css
/* globals.css - CSS variables & global styles */
:root {
  --accent: #059669;
  --foreground: #000000;
  /* ... */
}
```

```astro
<!-- Components - Tailwind utilities -->
<button class="bg-[var(--accent)] px-4 py-2">
  Click me
</button>
```

This gives us:
- Design tokens in CSS (easy to theme)
- Utility classes for layout/styling
- Best of both worlds

## Directory Structure

```
src/
├── styles/                 # Global CSS
│   ├── globals.css         # CSS variables, base styles
│   └── typography.css      # Typography styles
│
├── pages/                  # Astro pages
│   └── *.astro
│
├── layouts/                # Page layouts
│   └── BaseLayout.astro
│
├── components/             # Components
│   ├── ui/                 # Primitive components (.astro)
│   ├── layout/             # Header, Footer (.astro)
│   └── features/           # Feature components (.astro/.tsx)
│
└── data/                   # Static data
```

## Styling Patterns

### Pattern 1: Utility Classes (Most Common)

```astro
<!-- ✅ Good: Simple, readable, maintainable -->
<button class="px-4 py-2 bg-[var(--accent)] rounded-lg hover:opacity-90">
  Click me
</button>
```

### Pattern 2: Conditional Classes with `class:list`

Astro's `class:list` directive handles conditional classes cleanly:

```astro
---
interface Props {
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const { variant = "primary", disabled = false } = Astro.props;
---

<button
  class:list={[
    "px-4 py-2 rounded-lg transition-colors",
    {
      "bg-[var(--accent)] text-white": variant === "primary",
      "bg-transparent border border-[var(--border)]": variant === "secondary",
      "opacity-50 cursor-not-allowed": disabled,
    },
  ]}
  disabled={disabled}
>
  <slot />
</button>
```

### Pattern 3: Component Variants

Encapsulate variants in a component for reuse:

```astro
---
// components/ui/Button.astro
interface Props {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  class?: string;
}

const { variant = "primary", size = "md", class: className } = Astro.props;

const variants = {
  primary: "bg-[var(--accent)] text-white hover:opacity-90",
  secondary: "bg-transparent border border-[var(--border)] hover:bg-[var(--muted)]",
  ghost: "bg-transparent hover:bg-[var(--muted)]",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};
---

<button class:list={["rounded-lg transition-colors", variants[variant], sizes[size], className]}>
  <slot />
</button>
```

### Pattern 4: CSS Variables for Theming

Define tokens in `globals.css`:

```css
/* styles/globals.css */
:root {
  --accent: #059669;
  --foreground: #000000;
  --background: #ffffff;
  --muted: #f4f4f5;
  --border: #e4e4e7;
}
```

Use in components:

```astro
<div class="bg-[var(--background)] text-[var(--foreground)] border-[var(--border)]">
  Content
</div>
```

### Pattern 5: Scoped Styles (Astro-specific)

For complex one-off styles, use Astro's scoped `<style>` tags:

```astro
---
// Component logic
---

<div class="card">
  <slot />
</div>

<style>
  .card {
    /* These styles are automatically scoped to this component */
    background: linear-gradient(135deg, var(--accent), var(--muted));
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
```

## Responsive Design

Use mobile-first approach with Tailwind breakpoints:

```astro
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <!-- 1 column on mobile, 2 on sm, 3 on lg -->
</div>

<h1 class="text-2xl md:text-4xl lg:text-5xl">
  <!-- Responsive typography -->
</h1>
```

**Breakpoints:**
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

## React Components

For React islands, use standard className:

```tsx
// components/features/home/Counter.tsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90"
      onClick={() => setCount(c => c + 1)}
    >
      Count: {count}
    </button>
  );
}
```

## Best Practices Summary

1. **Default to Tailwind utilities** for layout, spacing, colors
2. **Use CSS variables** for theme tokens (colors, fonts)
3. **Use `class:list`** for conditional classes in Astro
4. **Use scoped `<style>`** for complex animations or one-off styles
5. **Keep components small** - if styles get complex, consider extracting a component
6. **Compose components** - don't repeat className strings across files
7. **Use design tokens** - reference CSS variables, not hardcoded values
8. **Mobile-first** - start with mobile styles, add breakpoints for larger screens

## Anti-patterns to Avoid

```astro
<!-- ❌ Avoid: Inline styles -->
<div style="padding: 16px; background: #059669;">

<!-- ❌ Avoid: Hardcoded colors (use CSS variables) -->
<div class="bg-[#059669]">

<!-- ❌ Avoid: Duplicating long class strings -->
<!-- Instead, create a reusable component -->

<!-- ✅ Good: Use CSS variables -->
<div class="bg-[var(--accent)]">

<!-- ✅ Good: Create a component for repeated patterns -->
<Button variant="primary">Click me</Button>
```
