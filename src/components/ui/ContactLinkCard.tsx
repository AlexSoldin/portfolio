import Link from "next/link";
import type { ContactMethod } from "@/types";
import { Card, ContactIcon } from "./";

interface ContactLinkCardProps {
  method: ContactMethod;
  className?: string;
}

export function ContactLinkCard({ method, className = "" }: ContactLinkCardProps) {
  const isExternal = method.href.startsWith("http");

  return (
    <Link
      href={method.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`block ${className}`}
    >
      <Card className="flex items-center gap-4 group">
        <span className="p-3 bg-[var(--highlight)] rounded-lg text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
          <ContactIcon icon={method.icon} />
        </span>
        <div>
          <p className="text-sm text-[var(--muted)]">{method.label}</p>
          <p className="font-medium group-hover:opacity-70 transition-opacity">{method.value}</p>
        </div>
      </Card>
    </Link>
  );
}
