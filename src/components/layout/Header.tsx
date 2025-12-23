"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/config";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)]">
      <nav className="max-w-4xl mx-auto px-6 py-5">
        <ul className="flex items-center gap-6 flex-wrap">
          {mainNavigation.map((item) => {
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

