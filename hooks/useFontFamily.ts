type FontWeight = "Regular" | "Medium" | "SemiBold" | "Bold";

export function useFontFamily(): Record<FontWeight, string> {
  return {
    Regular: "SFProText-Regular", // 400
    Medium: "SFProText-Medium", // 510
    SemiBold: "SFProText-Semibold", // 590
    Bold: "SFProDisplay-Bold", // 700
  };
}
