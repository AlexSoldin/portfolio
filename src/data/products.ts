import type { Product, RoomType } from "@/types";

export const products: Product[] = [
  // Office products
  {
    id: "laptop",
    name: "MacBook Pro",
    icon: "laptop",
    category: "tech",
    room: "office",
    useCase: "My main machine for development, design, and everything creative.",
    whyILikeIt: "The M-series chip is incredible. Silent, fast, and the battery lasts all day.",
    children: [
      {
        id: "vscode",
        name: "VS Code",
        icon: "code",
        description: "Primary code editor with vim keybindings and a minimal setup.",
      },
      {
        id: "terminal",
        name: "Warp",
        icon: "terminal",
        description: "Modern terminal with AI assistance and beautiful themes.",
      },
      {
        id: "arc",
        name: "Arc Browser",
        icon: "browser",
        description: "Replaced Chrome completely. Spaces and profiles are game changers.",
      },
      {
        id: "notion",
        name: "Notion",
        icon: "notes",
        description: "Second brain for notes, docs, and project management.",
      },
      {
        id: "spotify",
        name: "Spotify",
        icon: "music",
        description: "Focus playlists and lo-fi beats while coding.",
      },
      {
        id: "slack",
        name: "Slack",
        icon: "chat",
        description: "Team communication with custom notification schedules.",
      },
    ],
  },
  {
    id: "standing-desk",
    name: "Standing desk",
    icon: "desk",
    category: "furniture",
    room: "office",
    useCase:
      "Working from home with better posture and flexibility to switch between sitting and standing.",
    whyILikeIt:
      "Game changer for my daily routine. Being able to adjust height throughout the day keeps me energized.",
  },
  {
    id: "mechanical-keyboard",
    name: "Mechanical keyboard",
    icon: "keyboard",
    category: "tech",
    room: "office",
    useCase: "Daily coding and writing with tactile feedback and improved typing experience.",
    whyILikeIt:
      "The satisfying click makes typing enjoyable. After switching, I can't go back to membrane keyboards.",
  },
  {
    id: "wireless-headphones",
    name: "Wireless headphones",
    icon: "headphones",
    category: "accessories",
    room: "office",
    useCase: "Focus music during work, calls, and podcasts during commutes.",
    whyILikeIt:
      "Excellent noise cancellation helps me focus. The battery life is impressive and sound quality is crisp.",
  },
  {
    id: "desk-lamp",
    name: "Desk lamp",
    icon: "lamp",
    category: "household",
    room: "office",
    useCase: "Adjustable lighting for my workspace that reduces eye strain.",
    whyILikeIt:
      "Warm, adjustable light makes late-night work sessions comfortable. Minimalist design fits my setup.",
  },
  {
    id: "monitor-stand",
    name: "Monitor stand",
    icon: "monitor",
    category: "furniture",
    room: "office",
    useCase: "Elevating my monitor to eye level and organizing desk space underneath.",
    whyILikeIt: "Improved posture immediately and freed up desk space. Small change, big impact.",
  },

  // Kitchen products
  {
    id: "coffee-setup",
    name: "Coffee setup",
    icon: "coffee",
    category: "kitchen",
    room: "kitchen",
    useCase: "Grinding fresh coffee beans every morning for the best possible cup.",
    whyILikeIt: "Fresh ground coffee makes such a difference. The ritual is part of my morning.",
    children: [
      {
        id: "grinder",
        name: "Burr grinder",
        icon: "coffee",
        description: "Consistent grind size for pour-over or espresso.",
      },
      {
        id: "scale",
        name: "Coffee scale",
        icon: "monitor",
        description: "Precision weighing for the perfect coffee-to-water ratio.",
      },
      {
        id: "kettle-gooseneck",
        name: "Gooseneck kettle",
        icon: "kettle",
        description: "Precise pour control for manual brewing methods.",
      },
    ],
  },
  {
    id: "cast-iron-pan",
    name: "Cast iron pan",
    icon: "pan",
    category: "kitchen",
    room: "kitchen",
    useCase: "Versatile cooking for everything from searing steaks to baking cornbread.",
    whyILikeIt:
      "Once seasoned, it's non-stick and incredibly versatile. Built to last generations.",
  },
  {
    id: "kettle",
    name: "Electric kettle",
    icon: "kettle",
    category: "kitchen",
    room: "kitchen",
    useCase: "Quickly boiling water for tea, pour-over coffee, and cooking.",
    whyILikeIt:
      "Variable temperature control is perfect for different teas. Boils fast and looks great.",
  },

  // Living room products
  {
    id: "reading-lamp",
    name: "Reading lamp",
    icon: "lamp",
    category: "household",
    room: "living",
    useCase: "Evening reading and ambient lighting for the living room.",
    whyILikeIt:
      "Warm glow creates perfect atmosphere for reading. Adjustable arm for exact positioning.",
  },
  {
    id: "throw-blanket",
    name: "Wool throw blanket",
    icon: "blanket",
    category: "household",
    room: "living",
    useCase: "Staying cozy on the couch during movie nights and cold evenings.",
    whyILikeIt: "Incredibly soft and warm without being heavy. Neutral color goes with everything.",
  },

  // Bedroom products
  {
    id: "white-noise",
    name: "White noise machine",
    icon: "speaker",
    category: "tech",
    room: "bedroom",
    useCase: "Better sleep by masking outside noise and creating consistent sleep environment.",
    whyILikeIt: "Complete game changer for sleep quality. Natural sounds, not synthetic.",
  },
  {
    id: "bedside-lamp",
    name: "Bedside lamp",
    icon: "lamp",
    category: "household",
    room: "bedroom",
    useCase: "Soft lighting for reading in bed and winding down at night.",
    whyILikeIt: "Dimmable warm light perfect for evening reading. Simple touch controls.",
  },

  // Bathroom products
  {
    id: "water-bottle",
    name: "Water bottle",
    icon: "bottle",
    category: "accessories",
    room: "bathroom",
    useCase: "Staying hydrated throughout the day, both at home and on the go.",
    whyILikeIt: "Keeps drinks cold for hours and wide mouth makes it easy to clean.",
  },
  {
    id: "towel-set",
    name: "Turkish towels",
    icon: "towel",
    category: "household",
    room: "bathroom",
    useCase: "Daily use after showers - quick drying and incredibly soft.",
    whyILikeIt: "They get softer with every wash and dry surprisingly fast.",
  },

  // Balcony products
  {
    id: "outdoor-chair",
    name: "Outdoor lounge chair",
    icon: "chair",
    category: "furniture",
    room: "balcony",
    useCase: "Morning coffee and afternoon reading on the balcony.",
    whyILikeIt: "Comfortable, weather-resistant, and folds flat. Perfect for small outdoor spaces.",
  },
  {
    id: "plant-pot",
    name: "Self-watering planter",
    icon: "plant",
    category: "household",
    room: "balcony",
    useCase: "Growing herbs and small plants without daily maintenance.",
    whyILikeIt: "Reservoir means I can't forget to water. Great for herbs on the balcony.",
  },
];

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return products;
}

/**
 * Get products by room
 */
export function getProductsByRoom(room: RoomType): Product[] {
  return products.filter((product) => product.room === room);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((product) => product.category === category);
}

/**
 * Get product by ID
 */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/**
 * Room display names
 */
export const roomLabels: Record<RoomType, string> = {
  living: "Living room",
  bedroom: "Bedroom",
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  office: "Office",
  balcony: "Balcony",
};
