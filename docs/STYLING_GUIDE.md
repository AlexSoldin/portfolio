# Styling Guide: Tailwind CSS vs Custom CSS

## Why Tailwind CSS? (Best Practice for Next.js)

**Tailwind CSS is the recommended approach for Next.js** because:

### ✅ Advantages

1. **Performance**: Only CSS you use is included in the final bundle (tree-shaking)
2. **Consistency**: Enforces design system through utility classes
3. **Developer Experience**: No context switching between files, see styles inline
4. **Maintainability**: Styles are co-located with components
5. **Responsive Design**: Built-in breakpoints (`sm:`, `md:`, `lg:`)
6. **Next.js Integration**: Works seamlessly with App Router and Server Components

### When to Use Custom CSS

Use custom CSS files for:

1. **Complex Animations**: Keyframe animations, transitions
2. **Global Styles**: Base resets, typography scales
3. **CSS Variables**: Theme tokens (like we do in `globals.css`)
4. **Third-party Overrides**: Styling external libraries
5. **Complex Selectors**: Pseudo-elements, nth-child patterns

## Current Approach (Hybrid)

We use a **hybrid approach** which is best practice:

```css
/* globals.css - CSS Variables & Global Styles */
:root {
  --accent: #059669;
  --foreground: #000000;
  /* ... */
}

/* Components - Tailwind Utilities */
<button className="bg-[var(--accent)] px-4 py-2">
```

This gives us:
- ✅ Design tokens in CSS (easy to theme)
- ✅ Utility classes for layout/styling
- ✅ Best of both worlds

## Component Organization Best Practices

### Current Structure (Good!)

```
src/
├── app/                    # Routes (Server Components by default)
│   ├── page.tsx           # Home page
│   ├── about/
│   │   └── page.tsx       # About page
│   └── layout.tsx         # Root layout
│
├── components/            # Reusable components
│   ├── ui/                # Primitive UI components (Button, Input, etc.)
│   ├── Header.tsx         # Layout components
│   ├── Footer.tsx
│   └── HeroSection.tsx   # Feature components
│
├── data/                  # Static data & content
│   ├── projects.ts
│   └── posts.ts
│
├── types/                 # TypeScript definitions
│   └── index.ts
│
└── lib/                   # Utilities
    └── spacing.ts
```

### Component Categories

1. **UI Components** (`components/ui/`)
   - Primitive, reusable building blocks
   - Examples: Button, Input, Card, Tag
   - Should be style-agnostic (accept className)

2. **Layout Components** (`components/`)
   - Site-wide layout pieces
   - Examples: Header, Footer, HeroSection
   - Can have specific styling

3. **Feature Components** (`components/`)
   - Domain-specific components
   - Examples: ProjectCard, ContactForm
   - Business logic + presentation

4. **Page Components** (`app/*/page.tsx`)
   - Route handlers
   - Should be mostly Server Components
   - Compose other components

## Styling Patterns

### Pattern 1: Utility Classes (Most Common)

```tsx
// ✅ Good: Simple, readable, maintainable
<button className="px-4 py-2 bg-[var(--accent)] rounded-lg hover:opacity-90">
  Click me
</button>
```

### Pattern 2: Component Variants (For Reusable Components)

```tsx
// ✅ Good: Encapsulate variants in component
export function Button({ variant = "primary", ...props }) {
  const variants = {
    primary: "bg-[var(--accent)] text-white",
    secondary: "bg-transparent border border-[var(--border)]"
  };
  return <button className={variants[variant]} {...props} />;
}
```

### Pattern 3: CSS Modules (For Complex Components)

```tsx
// Use when: Complex component with many styles
// components/ComplexChart.module.css
.chart { /* ... */ }
.bar { /* ... */ }

// components/ComplexChart.tsx
import styles from './ComplexChart.module.css';
```

### Pattern 4: CSS Variables (For Theming)

```css
/* globals.css */
:root {
  --accent: #059669;
}

/* Component */
<div className="bg-[var(--accent)]">
```

## Best Practices Summary

1. **Default to Tailwind utilities** for layout, spacing, colors
2. **Use CSS variables** for theme tokens (colors, fonts)
3. **Use custom CSS** for complex animations or global resets
4. **Keep components small** - if styles get complex, consider CSS modules
5. **Compose components** - don't repeat className strings
6. **Use design tokens** - reference CSS variables, not hardcoded values

## Migration Path (If Needed)

If you want to move some styles to CSS:

1. **Create component-specific CSS** (e.g., `Button.module.css`)
2. **Extract repeated patterns** to CSS classes
3. **Keep utilities for one-off styles**

But honestly, **your current approach is solid** - Tailwind + CSS variables is the sweet spot for Next.js!

