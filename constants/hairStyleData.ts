// constants/hairStyleData.ts

export interface HairStyle {
  id: string;
  name: string;
  image: string;
  category: "short" | "medium" | "long" | "bangs" | "trendy";
}

export interface HairColor {
  id: string;
  name: string;
  color: string;
  gradient?: string[]; // For gradient colors
  category: "natural" | "vibrant" | "pastel" | "metallic";
}

// ==========================================
// HAIR STYLES DATA (50+ styles)
// ==========================================
export const HAIR_STYLES: HairStyle[] = [
  // BANGS STYLES
  {
    id: "curtain-bangs",
    name: "Curtain Bangs",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
    category: "bangs",
  },
  {
    id: "full-bangs",
    name: "Full Bangs",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300",
    category: "bangs",
  },
  {
    id: "side-bangs",
    name: "Side Swept Bangs",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300",
    category: "bangs",
  },
  {
    id: "wispy-bangs",
    name: "Wispy Bangs",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300",
    category: "bangs",
  },
  {
    id: "baby-bangs",
    name: "Baby Bangs",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300",
    category: "bangs",
  },

  // SHORT STYLES
  {
    id: "pixie-cut",
    name: "Pixie Cut",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300",
    category: "short",
  },
  {
    id: "bob-cut",
    name: "Bob Cut",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300",
    category: "short",
  },
  {
    id: "short-bob",
    name: "Short Bob",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300",
    category: "short",
  },
  {
    id: "a-line-bob",
    name: "A-Line Bob",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
    category: "short",
  },
  {
    id: "inverted-bob",
    name: "Inverted Bob",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300",
    category: "short",
  },
  {
    id: "shag-bob",
    name: "Shag Bob",
    image: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=300",
    category: "short",
  },
  {
    id: "buzz-cut",
    name: "Buzz Cut",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    category: "short",
  },
  {
    id: "undercut",
    name: "Undercut",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300",
    category: "short",
  },

  // MEDIUM STYLES
  {
    id: "lob",
    name: "Long Bob (Lob)",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
    category: "medium",
  },
  {
    id: "shoulder-length",
    name: "Shoulder Length",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300",
    category: "medium",
  },
  {
    id: "layered-medium",
    name: "Layered Medium",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300",
    category: "medium",
  },
  {
    id: "wolf-cut",
    name: "Wolf Cut",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300",
    category: "medium",
  },
  {
    id: "shag-medium",
    name: "Medium Shag",
    image: "https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=300",
    category: "medium",
  },
  {
    id: "wavy-medium",
    name: "Wavy Medium",
    image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=300",
    category: "medium",
  },

  // LONG STYLES
  {
    id: "long-straight",
    name: "Long Straight",
    image: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?w=300",
    category: "long",
  },
  {
    id: "long-wavy",
    name: "Long Wavy",
    image: "https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=300",
    category: "long",
  },
  {
    id: "long-curly",
    name: "Long Curly",
    image: "https://images.unsplash.com/photo-1513379733131-47fc74b45fc7?w=300",
    category: "long",
  },
  {
    id: "long-layers",
    name: "Long Layers",
    image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=300",
    category: "long",
  },
  {
    id: "mermaid-waves",
    name: "Mermaid Waves",
    image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300",
    category: "long",
  },
  {
    id: "beach-waves",
    name: "Beach Waves",
    image: "https://images.unsplash.com/photo-1520512202623-51c5c53957df?w=300",
    category: "long",
  },

  // TRENDY/SPECIAL STYLES
  {
    id: "butterfly-cut",
    name: "Butterfly Cut",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=300",
    category: "trendy",
  },
  {
    id: "jellyfish-cut",
    name: "Jellyfish Cut",
    image: "https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?w=300",
    category: "trendy",
  },
  {
    id: "hush-cut",
    name: "Hush Cut",
    image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=300",
    category: "trendy",
  },
  {
    id: "octopus-cut",
    name: "Octopus Cut",
    image: "https://images.unsplash.com/photo-1498982261566-1c28c9cf4c02?w=300",
    category: "trendy",
  },
  {
    id: "mullet",
    name: "Modern Mullet",
    image: "https://images.unsplash.com/photo-1515202913167-d9a698095ebf?w=300",
    category: "trendy",
  },
  {
    id: "shullet",
    name: "Shullet",
    image: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=300",
    category: "trendy",
  },
  {
    id: "mixie-cut",
    name: "Mixie Cut",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=300",
    category: "trendy",
  },
];

// ==========================================
// HAIR COLORS DATA (60+ colors)
// ==========================================
export const HAIR_COLORS: Record<string, HairColor[]> = {
  // NATURAL COLORS
  natural: [
    {
      id: "jet-black",
      name: "Jet Black",
      color: "#0C0C0C",
      category: "natural",
    },
    {
      id: "natural-black",
      name: "Natural Black",
      color: "#1A1A1A",
      category: "natural",
    },
    {
      id: "dark-brown",
      name: "Dark Brown",
      color: "#3E2723",
      category: "natural",
    },
    {
      id: "chocolate",
      name: "Chocolate",
      color: "#5D4037",
      category: "natural",
    },
    {
      id: "medium-brown",
      name: "Medium Brown",
      color: "#795548",
      category: "natural",
    },
    {
      id: "light-brown",
      name: "Light Brown",
      color: "#A1887F",
      category: "natural",
    },
    { id: "chestnut", name: "Chestnut", color: "#8B4513", category: "natural" },
    { id: "auburn", name: "Auburn", color: "#A0522D", category: "natural" },
    {
      id: "red-brown",
      name: "Red Brown",
      color: "#8B3A3A",
      category: "natural",
    },
    {
      id: "strawberry",
      name: "Strawberry",
      color: "#C04000",
      category: "natural",
    },
    { id: "copper", name: "Copper", color: "#B87333", category: "natural" },
    { id: "ginger", name: "Ginger", color: "#D2691E", category: "natural" },
    {
      id: "dark-blonde",
      name: "Dark Blonde",
      color: "#C19A6B",
      category: "natural",
    },
    {
      id: "golden-blonde",
      name: "Golden Blonde",
      color: "#D4AF37",
      category: "natural",
    },
    {
      id: "honey-blonde",
      name: "Honey Blonde",
      color: "#E8B923",
      category: "natural",
    },
    {
      id: "ash-blonde",
      name: "Ash Blonde",
      color: "#E5D3B3",
      category: "natural",
    },
    {
      id: "platinum",
      name: "Platinum Blonde",
      color: "#E5E4E2",
      category: "natural",
    },
    { id: "white", name: "White", color: "#F5F5F5", category: "natural" },
    { id: "gray", name: "Gray", color: "#C0C0C0", category: "natural" },
    {
      id: "salt-pepper",
      name: "Salt & Pepper",
      color: "#989898",
      category: "natural",
    },
  ],

  // VIBRANT COLORS
  vibrant: [
    { id: "fire-red", name: "Fire Red", color: "#FF0000", category: "vibrant" },
    {
      id: "cherry-red",
      name: "Cherry Red",
      color: "#D2042D",
      category: "vibrant",
    },
    { id: "crimson", name: "Crimson", color: "#DC143C", category: "vibrant" },
    { id: "burgundy", name: "Burgundy", color: "#800020", category: "vibrant" },
    { id: "wine", name: "Wine Red", color: "#722F37", category: "vibrant" },
    {
      id: "orange",
      name: "Bright Orange",
      color: "#FF6600",
      category: "vibrant",
    },
    {
      id: "tangerine",
      name: "Tangerine",
      color: "#F28500",
      category: "vibrant",
    },
    {
      id: "yellow",
      name: "Bright Yellow",
      color: "#FFD700",
      category: "vibrant",
    },
    {
      id: "neon-green",
      name: "Neon Green",
      color: "#39FF14",
      category: "vibrant",
    },
    {
      id: "emerald",
      name: "Emerald Green",
      color: "#50C878",
      category: "vibrant",
    },
    {
      id: "turquoise",
      name: "Turquoise",
      color: "#40E0D0",
      category: "vibrant",
    },
    {
      id: "electric-blue",
      name: "Electric Blue",
      color: "#0080FF",
      category: "vibrant",
    },
    {
      id: "royal-blue",
      name: "Royal Blue",
      color: "#4169E1",
      category: "vibrant",
    },
    { id: "navy", name: "Navy Blue", color: "#000080", category: "vibrant" },
    { id: "purple", name: "Purple", color: "#800080", category: "vibrant" },
    { id: "violet", name: "Violet", color: "#8F00FF", category: "vibrant" },
    { id: "magenta", name: "Magenta", color: "#FF00FF", category: "vibrant" },
    { id: "hot-pink", name: "Hot Pink", color: "#FF69B4", category: "vibrant" },
    { id: "fuchsia", name: "Fuchsia", color: "#FF00FF", category: "vibrant" },
  ],

  // PASTEL COLORS
  pastel: [
    {
      id: "pastel-pink",
      name: "Pastel Pink",
      color: "#FFD1DC",
      category: "pastel",
    },
    {
      id: "baby-pink",
      name: "Baby Pink",
      color: "#F4C2C2",
      category: "pastel",
    },
    { id: "peach", name: "Peach", color: "#FFDAB9", category: "pastel" },
    {
      id: "pastel-orange",
      name: "Pastel Orange",
      color: "#FFB347",
      category: "pastel",
    },
    { id: "lemon", name: "Lemon Yellow", color: "#FFF44F", category: "pastel" },
    { id: "mint", name: "Mint Green", color: "#98FF98", category: "pastel" },
    { id: "sage", name: "Sage Green", color: "#9DC183", category: "pastel" },
    { id: "seafoam", name: "Seafoam", color: "#93E9BE", category: "pastel" },
    { id: "sky-blue", name: "Sky Blue", color: "#87CEEB", category: "pastel" },
    {
      id: "baby-blue",
      name: "Baby Blue",
      color: "#89CFF0",
      category: "pastel",
    },
    {
      id: "periwinkle",
      name: "Periwinkle",
      color: "#CCCCFF",
      category: "pastel",
    },
    { id: "lavender", name: "Lavender", color: "#E6E6FA", category: "pastel" },
    { id: "lilac", name: "Lilac", color: "#C8A2C8", category: "pastel" },
    { id: "mauve", name: "Mauve", color: "#E0B0FF", category: "pastel" },
  ],

  // METALLIC/SPECIAL COLORS
  metallic: [
    {
      id: "rose-gold",
      name: "Rose Gold",
      color: "#B76E79",
      category: "metallic",
    },
    { id: "gold", name: "Gold", color: "#FFD700", category: "metallic" },
    { id: "bronze", name: "Bronze", color: "#CD7F32", category: "metallic" },
    { id: "silver", name: "Silver", color: "#C0C0C0", category: "metallic" },
    {
      id: "gunmetal",
      name: "Gunmetal",
      color: "#2C3539",
      category: "metallic",
    },
    {
      id: "steel-blue",
      name: "Steel Blue",
      color: "#4682B4",
      category: "metallic",
    },
    {
      id: "rainbow",
      name: "Rainbow",
      color: "#FF0000",
      gradient: [
        "#FF0000",
        "#FF7F00",
        "#FFFF00",
        "#00FF00",
        "#0000FF",
        "#4B0082",
        "#9400D3",
      ],
      category: "metallic",
    },
    {
      id: "sunset",
      name: "Sunset Ombre",
      color: "#FF6B6B",
      gradient: ["#FF6B6B", "#FFA500", "#FFD700"],
      category: "metallic",
    },
    {
      id: "ocean",
      name: "Ocean Ombre",
      color: "#4A90E2",
      gradient: ["#4A90E2", "#50C9C3", "#80E8DD"],
      category: "metallic",
    },
    {
      id: "galaxy",
      name: "Galaxy",
      color: "#5B2C6F",
      gradient: ["#5B2C6F", "#8E44AD", "#3498DB"],
      category: "metallic",
    },
  ],
};

// Flatten all colors into single array
export const ALL_HAIR_COLORS: HairColor[] = [
  ...HAIR_COLORS.natural,
  ...HAIR_COLORS.vibrant,
  ...HAIR_COLORS.pastel,
  ...HAIR_COLORS.metallic,
];

// Category names
export const STYLE_CATEGORIES = {
  bangs: "Bangs",
  short: "Short",
  medium: "Medium",
  long: "Long",
  trendy: "Trendy",
};

export const COLOR_CATEGORIES = {
  natural: "Natural",
  vibrant: "Vibrant",
  pastel: "Pastel",
  metallic: "Metallic",
};
