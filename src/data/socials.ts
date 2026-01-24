export const socials = [
  { name: "GitHub", href: "https://github.com/alexsoldin" },
  { name: "LinkedIn", href: "https://linkedin.com/in/alexandersoldin" },
  { name: "X", href: "https://x.com/alexsoldin" },
  { name: "Instagram", href: "https://instagram.com/alexsoldin" },
  { name: "Buy me a coffee", href: "https://buymeacoffee.com/alexsoldini" },
] as const;

export type Social = (typeof socials)[number];
