"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "🏠", href: "/", title: "Home" },
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "writing", href: "/writing" },
  { label: "contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)]">
      <nav className="max-w-4xl mx-auto px-6 py-4">
        <ul className="flex items-center gap-1 sm:gap-2 flex-wrap">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={item.title || item.label}
                  className={`
                    relative px-3 py-2 text-sm font-medium rounded-lg
                    transition-all duration-200 ease-out
                    ${
                      isActive
                        ? "text-[var(--accent)] bg-[var(--highlight)]"
                        : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/50"
                    }
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--accent)] rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
