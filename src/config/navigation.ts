export interface NavItem {
  label: string;
  href: string;
  title?: string;
}

export const mainNavigation: NavItem[] = [
  { label: "🏠", href: "/", title: "Home" },
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "products", href: "/products" },
  { label: "tools", href: "/tools" },
  { label: "writing", href: "/writing" },
  { label: "contact", href: "/contact" },
];
