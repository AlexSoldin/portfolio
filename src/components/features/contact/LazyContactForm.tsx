"use client";

import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("./ContactForm").then((mod) => mod.ContactForm), {
  ssr: false,
  loading: () => (
    <section className="animate-fade-in-delay-1">
      <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold mb-6">
        Send a message
      </h2>
      <div className="space-y-5">
        <div className="h-[72px] bg-[var(--highlight)] rounded-lg animate-pulse" />
        <div className="h-[72px] bg-[var(--highlight)] rounded-lg animate-pulse" />
        <div className="h-[72px] bg-[var(--highlight)] rounded-lg animate-pulse" />
        <div className="h-[152px] bg-[var(--highlight)] rounded-lg animate-pulse" />
        <div className="h-[65px] bg-[var(--highlight)] rounded-lg animate-pulse" />
        <div className="h-[48px] bg-[var(--highlight)] rounded-lg animate-pulse" />
      </div>
    </section>
  ),
});

export function LazyContactForm() {
  return <ContactForm />;
}
