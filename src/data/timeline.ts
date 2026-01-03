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
  events: Event[];
}

export const cityChapters: CityChapter[] = [
  {
    id: "1",
    city: "Johannesburg",
    period: "1998–2016",
    flag: "🇿🇦",
    scene: "🏙️",
    events: [{ emoji: "📚", activity: "King David Linksfield", description: "Schooling" }],
  },
  {
    id: "2",
    city: "Cape Town",
    period: "2017–2020",
    flag: "🇿🇦",
    scene: "🏔️",
    events: [
      {
        emoji: "📚",
        activity: "University of Cape Town",
        description: "Electrical and computer engineering",
      },
    ],
  },
  {
    id: "3",
    city: "Johannesburg",
    period: "2021–2022",
    flag: "🇿🇦",
    scene: "🌆",
    events: [
      {
        emoji: "💻",
        activity: "Isazi Consulting",
        description: "Data scientist turned software engineer",
      },
    ],
  },
  {
    id: "4",
    city: "Amsterdam",
    period: "2023–present",
    flag: "🇳🇱",
    scene: "🌉",
    events: [{ emoji: "💻", activity: "Coolset", description: "Software engineer" }],
  },
];
