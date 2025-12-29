import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import translations from "../langs";

export type Language = "en" | "ar";

const getTranslation = (lang: Language, path: string): string => {
  const keys = path.split(".");
  let result: any = translations[lang];

  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key];
    } else {
      return path;
    }
  }

  return typeof result === "string" ? result : path;
};

interface LanguageStore {
  currentLanguage: Language;
  isRTL: boolean;
  isHydrated: boolean;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  setHydrated: (val: boolean) => void;
  t: (keyPath: string) => string;
}

const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      currentLanguage: "ar",
      isRTL: true,
      isHydrated: false,

      setLanguage: (language: Language) => {
        const isRTL = language === "ar";
        set({ currentLanguage: language, isRTL });
        if (isRTL !== I18nManager.isRTL) {
          I18nManager.allowRTL(isRTL);
          I18nManager.forceRTL(isRTL);
        }
      },

      toggleLanguage: () => {
        const current = get().currentLanguage;
        const newLanguage = current === "en" ? "ar" : "en";
        const isRTL = newLanguage === "ar";
        set({ currentLanguage: newLanguage, isRTL });
        if (isRTL !== I18nManager.isRTL) {
          I18nManager.allowRTL(isRTL);
          I18nManager.forceRTL(isRTL);
        }
      },

      setHydrated: (val: boolean) => set({ isHydrated: val }),

      t: (path: string) => getTranslation(get().currentLanguage, path),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

export default useLanguageStore;
