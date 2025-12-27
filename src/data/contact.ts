import type { ContactContent, ContactMethod } from "@/types";

// TODO: See if we can move content to an md folder and use markdown to render the content.

export const contactMethods: ContactMethod[] = [
  {
    label: "Email",
    value: "alex.soldin@gmail.com",
    href: "mailto:alex.soldin@gmail.com",
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
    value: "alexandersoldin",
    href: "https://www.linkedin.com/in/alexandersoldin/",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    value: "@alexsoldin",
    href: "https://instagram.com/alexsoldin",
    icon: "instagram",
  },
  {
    label: "Buy Me a Coffee",
    value: "Alex Soldin",
    href: "https://www.buymeacoffee.com/alexsoldini",
    icon: "coffee",
  },
];

export const contactContent: ContactContent = {
  title: "Let's work together",
  subtitle:
    "I'm always interested in hearing about new projects, opportunities, or just having a conversation about technology.",
  methods: contactMethods,
};
