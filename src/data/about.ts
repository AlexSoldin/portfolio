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
      "I started coding while at school in Johannesburg. Choosing information technology, and later electrical and computer engineering at university, were educated guesses that turned out to be the right ones. I’ve always enjoyed maths and puzzles, especially problems where patterns emerge and logic leads to elegant solutions. Engineering gave me a way to apply that way of thinking to real-world problems.",
      "What drew me to software was the immediacy of building something useful. Seeing an idea turn into a working system is deeply satisfying, and that feeling only grows at scale. Automating repetitive work or designing systems that simply work saves real time and creates genuine value. The most rewarding part is turning frustration into solutions that feel clear, reliable, and easy to use.",
      "Engineering isn't just about technology. Meaningful progress happens when people feel supported through change. I focus on empathy and clear communication, especially when working across disciplines or bridging technical and non-technical teams. By listening closely and understanding what teams actually need, I aim to design solutions that fit naturally into how they work. Trust, collaboration, and shared understanding are as critical to good systems as the code itself.",
      "Being observant has become central to how I work. I pay close attention to how systems behave, where processes break down, and where small details create unnecessary friction. Over time, I’ve learned that consistent structure and care for those details are what separate systems that function from systems that last.",
    ],
  },
  orbit: {
    title: "In my orbit",
    paragraphs: [
      "I'm always picking up new skills and exploring different interests. Here's what I'm working with lately and what keeps me busy when I'm away from the keyboard.",
    ],
    categories: [
      {
        id: "work-with",
        title: "What I work with",
        items: [
          { emoji: "🐍", name: "Python" },
          { emoji: "🚀", name: "Django" },
          { emoji: "🐘", name: "PostgreSQL" },
          { emoji: "🏗️", name: "Terraform" },
          { emoji: "☁️", name: "Google Cloud" },
          { emoji: "🔥", name: "Firebase" },
          { emoji: "⚙️", name: "GitHub Actions" },
          { emoji: "🎯", name: "Sentry" },
          { emoji: "⚖️", name: "Jira" },
          { emoji: "🎨", name: "Figma" },
        ],
      },
      {
        id: "into",
        title: "What I'm into",
        items: [
          { emoji: "♟️", name: "Chess" },
          { emoji: "🔢", name: "Sudoku" },
          { emoji: "🧩", name: "Puzzles" },
          { emoji: "🎮", name: "Gaming" },
          { emoji: "🧘", name: "Pilates" },
          { emoji: "🍳", name: "Cooking" },
          { emoji: "🥐", name: "Baking" },
          { emoji: "☕", name: "Coffee" },
          { emoji: "🌍", name: "Traveling" },
          { emoji: "📚", name: "Reading" },
        ],
      },
    ],
  },
};
