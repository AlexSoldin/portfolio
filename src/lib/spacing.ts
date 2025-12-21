/**
 * Spacing System
 *
 * We use a consistent spacing scale based on 16px (1rem) increments.
 * Tailwind's spacing scale is based on 4px, so:
 * - 16px = spacing-4 (1rem)
 * - 32px = spacing-8 (2rem)
 * - 48px = spacing-12 (3rem)
 * - 64px = spacing-16 (4rem)
 *
 * Common spacing values:
 * - xs: 4px (spacing-1)   - Tight spacing
 * - sm: 8px (spacing-2)   - Small spacing
 * - md: 16px (spacing-4)  - Default spacing (1rem)
 * - lg: 24px (spacing-6)  - Large spacing
 * - xl: 32px (spacing-8)  - Extra large spacing
 * - 2xl: 48px (spacing-12) - 2x large spacing
 * - 3xl: 64px (spacing-16) - 3x large spacing
 */

export const SPACING = {
  xs: "1", // 4px
  sm: "2", // 8px
  md: "4", // 16px - default
  lg: "6", // 24px
  xl: "8", // 32px
  "2xl": "12", // 48px
  "3xl": "16", // 64px
} as const;

/**
 * Helper to get Tailwind spacing class
 * Usage: `space-y-${SPACING.md}` = `space-y-4` = 16px vertical spacing
 */
export type SpacingSize = keyof typeof SPACING;
