export const IMAGES = {
  imageGen: require("../assets/icons/imageGen.png"),
  videoGen: require("../assets/icons/videoGen.png"),
  hugging: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200",
  aiDance: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200",
  video: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  ghibli: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200",
  christmas: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
  anime: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
};

export const videoEffects = [
  { id: 1, title: "Hugging", image: IMAGES.hugging, isPremium: true },
  { id: 2, title: "AI Dance", image: IMAGES.aiDance, isPremium: true },
  { id: 3, title: "Video", image: IMAGES.video, isPremium: true },
  { id: 4, title: "Motion", image: IMAGES.hugging, isPremium: false },
];

export const imageEffects = [
  { id: 1, title: "Ghibli Style", image: IMAGES.ghibli, isPremium: false },
  { id: 2, title: "Christmas", image: IMAGES.christmas, isPremium: true },
  { id: 3, title: "Anime", image: IMAGES.anime, isPremium: true },
  { id: 4, title: "Cartoon", image: IMAGES.ghibli, isPremium: false },
];

export const hairstyleEffects = [
  { id: 11, title: "Short Bob", image: IMAGES.hugging, isPremium: false },
  { id: 12, title: "Long Waves", image: IMAGES.aiDance, isPremium: true },
  { id: 13, title: "Ponytail", image: IMAGES.ghibli, isPremium: false },
  { id: 14, title: "Undercut", image: IMAGES.anime, isPremium: true },
];

export const tryOnEffects = [
  { id: 21, title: "Jacket", image: IMAGES.videoGen, isPremium: false },
  {
    id: 22,
    title: "Summer Dress",
    image: IMAGES.christmas,
    isPremium: false,
  },
  { id: 23, title: "Tuxedo", image: IMAGES.ghibli, isPremium: true },
  { id: 24, title: "Casual Tee", image: IMAGES.imageGen, isPremium: false },
];

// constants/data.ts --- IGNORE ---

interface Creation {
  id: number;
  uri: string;
  type: "image" | "video";
}

// Sample creations data
export const CREATIONS: Creation[] = [
  {
    id: 1,
    uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    type: "image",
  },
  {
    id: 2,
    uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    type: "image",
  },
  {
    id: 3,
    uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
    type: "image",
  },
  {
    id: 4,
    uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    type: "image",
  },
  {
    id: 5,
    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    type: "image",
  },
  {
    id: 6,
    uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    type: "image",
  },
];

// Sample community images with varying heights for masonry effect
export const COMMUNITY_IMAGES = [
  {
    id: 1,
    uri: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400",
    height: 1.0,
  },
  {
    id: 2,
    uri: "https://images.unsplash.com/photo-1436891620584-47fd0e565afb?w=400",
    height: 1.0,
  },
  {
    id: 3,
    uri: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400",
    height: 1.25,
  },
  {
    id: 4,
    uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    height: 1.35,
  },
  {
    id: 5,
    uri: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400",
    height: 1.1,
  },
  {
    id: 6,
    uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    height: 1.2,
  },
  {
    id: 7,
    uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
    height: 1.0,
  },
  {
    id: 8,
    uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    height: 1.3,
  },
  {
    id: 9,
    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    height: 1.1,
  },
  {
    id: 10,
    uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    height: 1.2,
  },
];
