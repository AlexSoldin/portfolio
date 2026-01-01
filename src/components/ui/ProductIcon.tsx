import { productIconPaths } from "@/lib/icons";
import type { ProductIcon as ProductIconType } from "@/types";

interface ProductIconProps {
  icon: ProductIconType;
  className?: string;
  size?: number;
}

/**
 * Renders a product icon from the centralized icon registry.
 * Uses fill rendering with currentColor for easy styling.
 */
export function ProductIcon({ icon, className = "w-5 h-5", size }: ProductIconProps) {
  const path = productIconPaths[icon];

  if (!path) {
    console.warn(`ProductIcon: Unknown icon "${icon}"`);
    return null;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
