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

// 1. Clothes Swap
export const clothesSwapEffect = {
  id: 1,
  title: "Clothes Swap",
  image: IMAGES.imageGen,
  isPremium: false,
  description: "Change clothes on the same model.",
};

// 2. Color Change
export const colorChangeEffect = {
  id: 2,
  title: "Color Change",
  image: IMAGES.christmas,
  isPremium: false,
  description: "Change color or pattern of the item.",
};

// 3. Model Swap
export const modelSwapEffect = {
  id: 3,
  title: "Model Swap",
  image: IMAGES.aiDance,
  isPremium: true,
  description: "Keep clothes, change the model.",
};

// 5. Background Changer
export const backgroundChangerEffect = {
  id: 5,
  title: "Background Changer",
  image: IMAGES.ghibli,
  isPremium: false,
  description: "Change the scene.",
};

// 6. Pose Generator
export const poseGeneratorEffect = {
  id: 6,
  title: "Pose Generator",
  image: IMAGES.video,
  isPremium: true,
  description: "Change the pose.",
};

// 7. Camera Angle Change
export const cameraAngleEffect = {
  id: 7,
  title: "Camera Angle",
  image: IMAGES.videoGen,
  isPremium: false,
  description: "Change camera angle.",
};

// 8. Prompt to Image
export const promptToImageEffect = {
  id: 8,
  title: "Prompt to Image",
  image: IMAGES.imageGen,
  isPremium: false,
  description: "Generate image from text.",
};

// 9. Sketch to Image
export const sketchToImageEffect = {
  id: 9,
  title: "Sketch to Image",
  image: IMAGES.anime,
  isPremium: true,
  description: "Turn sketch into realistic image.",
};

// 10. Static Image to Video
export const imageToVideoEffect = {
  id: 10,
  title: "Image to Video",
  image: IMAGES.video,
  isPremium: true,
  description: "Animate a static image.",
};

// 11. Video Styles
export const videoStylesEffect = {
  id: 11,
  title: "Video Styles",
  image: IMAGES.aiDance,
  isPremium: false,
  description: "Apply styles to video.",
};

// 12. 4K Upscaler
export const upscalerEffect = {
  id: 12,
  title: "4K Upscaler",
  image: IMAGES.christmas,
  isPremium: true,
  description: "Enhance image quality.",
};

// 13. Model Consistency
export const modelConsistencyEffect = {
  id: 13,
  title: "Model Consistency",
  image: IMAGES.hugging,
  isPremium: true,
  description: "Train a consistent model.",
};

// 14. Outfit Variations
export const outfitVariationsEffect = {
  id: 14,
  title: "Outfit Variations",
  image: IMAGES.ghibli,
  isPremium: true,
  description: "One model, many outfits.",
};

// 15. Lighting Adaptation
export const lightingEffect = {
  id: 15,
  title: "Lighting Adaptation",
  image: IMAGES.videoGen,
  isPremium: false,
  description: "Change lighting conditions.",
};

// 16. Hair Style
export const hairStyleEffect = {
  id: 16,
  title: "Hair Style",
  image: IMAGES.imageGen, // Using placeholder for now
  isPremium: false,
  description: "Change hairstyle.",
};

// Categorized for UI display
export const tryOnEffects = [
  clothesSwapEffect,
  modelSwapEffect,
  outfitVariationsEffect,
];

export const imageEffects = [
  promptToImageEffect,
  backgroundChangerEffect,
  colorChangeEffect,
  sketchToImageEffect,
  upscalerEffect,
  lightingEffect,
];

export const videoEffects = [
  imageToVideoEffect,
  videoStylesEffect,
  poseGeneratorEffect, // Putting pose here as it implies movement/3D
  cameraAngleEffect,
  modelConsistencyEffect,
];

// Deprecated or unused but kept to avoid breaking other imports (empty or aliased)
export const hairstyleEffects = [hairStyleEffect];

// constants/data.ts --- IGNORE ---

interface Creation {
  id: number;
  uri: string;
  type: "image" | "video";
  AIModel?: string;
  prompt?: string;
  aspectRatio?: string;
}

// Sample creations data
export const CREATIONS: Creation[] = [
  {
    id: 1,
    uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    type: "image",
    AIModel: "Flux.1 [dev]",
    prompt: "A beautiful portrait of a woman with aesthetic lighting.",
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
    AIModel: "Flux Pro",
    id: 1,
    uri: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400",
    height: 1.0,
    prompt: "A person with a short bob hairstyle.",
  },
  {
    AIModel: "Flux Pro",
    id: 2,
    uri: "https://images.unsplash.com/photo-1436891620584-47fd0e565afb?w=400",
    height: 1.0,
    prompt: " A person with a long waves hairstyle.",
  },
  {
    AIModel: "Flux Pro",
    id: 3,
    uri: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400",
    height: 1.25,
    prompt: " A person with a ponytail hairstyle.",
  },
  {
    AIModel: "Flux Pro",
    prompt: "A person with an undercut hairstyle.",
    id: 4,
    uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    height: 1.35,
  },
  {
    AIModel: "Flux Pro",
    prompt:
      "Anime-style girl with big expressive eyes and textured red hair, vibrant colors, painterly brushstrokes, dreamy sky background. Anime-style girl with big expressive eyes and textured red hair, vibrant colors, painterly brushstrokes, dreamy sky background.",
    id: 5,
    uri: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400",
    height: 1.1,
  },
  {
    AIModel: "Flux Pro",
    prompt: "A person with a long waves hairstyle.",
    id: 6,
    uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    height: 1.2,
  },
  {
    AIModel: "Flux Pro",
    prompt: "A person with a long waves hairstyle.",
    id: 7,
    uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
    height: 1.0,
  },
  {
    AIModel: "Flux Pro",
    prompt: "A person with a long waves hairstyle.",
    id: 8,
    uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    height: 1.3,
  },
  {
    prompt: "A person with a long waves hairstyle.",
    id: 9,
    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    height: 1.1,
    AIModel: "Flux Pro",
  },
  {
    AIModel: "Flux Pro",
    prompt: "A person with a long waves hairstyle.",
    id: 10,
    uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    height: 1.2,
  },
];
