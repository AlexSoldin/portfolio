"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "🏠", href: "/", title: "Home" },
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "tools", href: "/tools" },
  { label: "writing", href: "/writing" },
  { label: "contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)]">
      <nav className="max-w-4xl mx-auto px-6 py-5">
        <ul className="flex items-center gap-6 flex-wrap">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={item.title || item.label}
                  className={`
                    text-sm font-medium transition-opacity
                    ${isActive ? "opacity-100" : "opacity-60 hover:opacity-100"}
                  `}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
