/**
 * App colors & fonts
 * Dark mode موجود شكليًا فقط (نفس ألوان light)
 */

import { Platform } from "react-native";

// ===== Base colors =====
const BASE_COLORS = {
  white: "#FFFFFF",
  black: "#000000",
  gray: "#252525",

  white10: "rgba(255, 255, 255, 0.1)",
  white05: "rgba(255, 255, 255, 0.05)",
  white50: "rgba(255, 255, 255, 0.5)",

  black30: "rgba(0, 0, 0, 0.3)",

  yellow: "#FDD835",
  red: "#F2474C",
};

// ===== Theme (Light & Dark identical) =====
export const Colors = {
  light: {
    text: BASE_COLORS.gray,
    background: BASE_COLORS.white,
    tint: BASE_COLORS.yellow,
    icon: BASE_COLORS.gray,
    tabIconDefault: BASE_COLORS.gray,
    tabIconSelected: BASE_COLORS.yellow,

    // extra (optional but useful)
    border: BASE_COLORS.white10,
    danger: BASE_COLORS.red,
  },
  dark: {
    // SAME AS LIGHT (no real dark mode)
    text: BASE_COLORS.gray,
    background: BASE_COLORS.white,
    tint: BASE_COLORS.yellow,
    icon: BASE_COLORS.gray,
    tabIconDefault: BASE_COLORS.gray,
    tabIconSelected: BASE_COLORS.yellow,

    border: BASE_COLORS.white10,
    danger: BASE_COLORS.red,
  },
};

// ===== Fonts =====
export const Fonts = Platform.select({
  ios: {
    sans: "SFProText-Regular",
    serif: "SFProText-Regular",
    rounded: "SFProText-Regular",
    mono: "ui-monospace",
  },
  default: {
    sans: "SFProText-Regular",
    serif: "SFProText-Regular",
    rounded: "SFProText-Regular",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
