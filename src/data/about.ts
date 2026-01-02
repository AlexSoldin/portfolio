import type { AboutContent } from "@/types";

export const aboutContent: AboutContent = {
  intro: {
    title: "The short version",
    paragraphs: [
      "I am a software engineer who loves building **systems** that work — and keep working. My focus is on backend architecture, infrastructure and the kind of technical operations that help companies scale smoothly. However, I am up for any challenge that comes my way.",
      "I believe the best engineering balances technical excellence with practical impact and I'm drawn to work that sits at the intersection of code, product and business.",
      "Currently based in **Amsterdam**, I'm helping scale the engineering team and infrastructure at **Coolset**. I thrive in environments where I can build end-to-end solutions, collaborate across teams and solve problems that matter.",
    ],
  },
  background: {
    title: "Background",
    introParagraph:
      "My journey as a software engineer has taken me through several cities and industries, each shaping how I approach problems today.",
    outroParagraphs: [
      "I started coding while at school in Johannesburg. Choosing information technology as a subject — and later electrical and computer engineering at university — were somewhat educated guesses but they turned out to be the right ones. I've always loved maths and puzzles, the kind of problems where you can see patterns, work through logic and find elegant solutions. Engineering gave me a way to apply that same thinking to real world challenges.",
      "What drew me to software was the immediate satisfaction of building something useful. At scale, that becomes even more powerful. Automating tedious processes or designing systems that simply work means saving real time and creating genuine value. The most rewarding part is transforming challenges that frustrate people into solutions that are elegant, reliable and enjoyable to use.",
      "Being observant has become central to how I work. Whether it's noticing inefficiencies in a workflow, spotting patterns in system behavior or understanding what teams really need beyond what they're asking for, I've learned that the details matter. Applying consistent structures and paying close attention to those details makes the difference between systems that work and systems that last.",
    ],
  },
  expertise: {
    title: "Technical expertise",
    categories: [
      {
        title: "Backend & Systems",
        items: [
          "Python & Django",
          "PostgreSQL & Database Design",
          "REST APIs & GraphQL",
          "Celery & Background Tasks",
        ],
      },
      {
        title: "Frontend & Design",
        items: [
          "React & TypeScript",
          "Next.js & Modern Frameworks",
          "CSS & Tailwind",
          "UI/UX Design Principles",
        ],
      },
    ],
  },
  beyondCode: {
    title: "Beyond code",
    paragraphs: ["When I'm not coding, you can usually find me doing one of the following."],
    hobbies: [
      {
        emoji: "♟️",
        name: "Chess",
      },
      {
        emoji: "🔢",
        name: "Sudoku",
      },
      {
        emoji: "🧩",
        name: "Puzzles",
      },
      {
        emoji: "🎮",
        name: "PlayStation 5",
      },
      {
        emoji: "🧘",
        name: "Pilates",
      },
      {
        emoji: "🍳",
        name: "Cooking",
      },
      {
        emoji: "🥐",
        name: "Baking",
      },
      {
        emoji: "☕",
        name: "Coffee",
      },
      {
        emoji: "🌍",
        name: "Traveling",
      },
      {
        emoji: "📚",
        name: "Reading",
      },
    ],
  },
};
