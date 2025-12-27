import useLanguageStore from "@/store/useLanguageStore";

type FontWeight = "Regular" | "Medium" | "SemiBold" | "Bold";

export function useFontFamily(): Record<FontWeight, string> {
  const { currentLanguage } = useLanguageStore();

  // Use override if provided, otherwise use current language from store
  const lang = currentLanguage ?? "ar";

  if (lang === "en") {
    return {
      Regular: "SFProText-Regular", // 400
      Medium: "SFProText-Medium", // 510
      SemiBold: "SFProText-Semibold", // 590
      Bold: "SFProDisplay-Bold", // 700
    };
  } else {
    return {
      Regular: "Zain-Regular", // 400
      Medium: "Zain-Regular", // 510
      SemiBold: "Zain-Bold", // 590
      Bold: "Zain-Bold", // 700
    };
  }
}
