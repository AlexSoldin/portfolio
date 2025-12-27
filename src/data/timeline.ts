export interface Event {
  emoji: string;
  activity: string;
  description?: string;
}

export interface CityChapter {
  id: string;
  city: string;
  period: string;
  flag: string; // Country flag emoji
  scene: string; // City-specific scene emoji
  color: string;
  events: Event[];
}

export const cityChapters: CityChapter[] = [
  {
    id: "1",
    city: "Johannesburg",
    period: "1998–2016",
    flag: "🇿🇦",
    scene: "🏙️",
    color: "bg-blue-500",
    events: [
      { emoji: "📚", activity: "School", description: "King David Linksfield" },
      { emoji: "💻", activity: "Started coding at 16" },
    ],
  },
  {
    id: "2",
    city: "Cape Town",
    period: "2016–2020",
    flag: "🇿🇦",
    scene: "🏔️",
    color: "bg-teal-500",
    events: [
      {
        emoji: "📚",
        activity: "University of Cape Town",
        description: "Electrical and computer engineering",
      },
      //   { emoji: "💻", activity: "Internships", description: "12 weeks of vacation work" },
    ],
  },
  {
    id: "3",
    city: "Johannesburg",
    period: "2020–2022",
    flag: "🇿🇦",
    scene: "🌆",
    color: "bg-blue-500",
    events: [{ emoji: "💻", activity: "Software engineer at Isazi Consulting", description: "" }],
  },
  {
    id: "4",
    city: "Amsterdam",
    period: "2023–present",
    flag: "🇳🇱",
    scene: "🌉",
    color: "bg-red-500",
    events: [
      { emoji: "💻", activity: "Software engineer at Coolset", description: "" },
      { emoji: "", activity: "Exploring Europe" },
    ],
  },
];
