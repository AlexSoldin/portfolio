import type { ContactContent, ContactMethod } from "@/types";

export const contactMethods: ContactMethod[] = [
  {
    label: "Email",
    value: "hello@alexsoldin.dev",
    href: "mailto:hello@alexsoldin.dev",
    icon: "email",
  },
  {
    label: "GitHub",
    value: "@alexsoldin",
    href: "https://github.com/alexsoldin",
    icon: "github",
  },
  {
    label: "LinkedIn",
    value: "/in/alexsoldin",
    href: "https://linkedin.com/in/alexsoldin",
    icon: "linkedin",
  },
  {
    label: "Twitter",
    value: "@alexsoldin",
    href: "https://twitter.com/alexsoldin",
    icon: "twitter",
  },
];

export const contactContent: ContactContent = {
  title: "Let's work together",
  subtitle:
    "I'm always interested in hearing about new projects, opportunities, or just having a conversation about technology and design.",
  availability: {
    status: "available",
    message:
      "I'm currently open to freelance projects, consulting work, and interesting full-time opportunities. Let's talk!",
  },
  methods: contactMethods,
};
