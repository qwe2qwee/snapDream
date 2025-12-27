import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import translations from "../langs";

// Type definitions
export type Language = "en" | "ar";

export interface LanguageInfo {
  language: Language;
  isRTL: boolean;
  isArabic: boolean;
  isEnglish: boolean;
  t: (keyPath: string) => string;
}

interface LanguageState {
  // State
  currentLanguage: Language;
  isRTL: boolean;
  isHydrated: boolean;
}

interface LanguageActions {
  // Actions
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  setHydrated: () => void;
  getLanguageInfo: () => LanguageInfo;
  t: (keyPath: string) => string;
}

export type LanguageStore = LanguageState & LanguageActions;

// Helper function to get translation by path
const getTranslation = (lang: Language, path: string): string => {
  const keys = path.split(".");
  let result: any = translations[lang];

  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key];
    } else {
      return path; // Fallback to path if not found
    }
  }

  return typeof result === "string" ? result : path;
};

// Language store with persistence using AsyncStorage
const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get): LanguageStore => ({
      // State
      currentLanguage: "ar", // default to Arabic
      isRTL: true,
      isHydrated: false,

      // Actions
      setLanguage: (language: Language): void => {
        const isRTL = language === "ar";
        set({
          currentLanguage: language,
          isRTL: isRTL,
        });
      },

      toggleLanguage: (): void => {
        const current = get().currentLanguage;
        const newLanguage: Language = current === "en" ? "ar" : "en";
        const isRTL = newLanguage === "ar";
        set({
          currentLanguage: newLanguage,
          isRTL: isRTL,
        });
      },

      // Hydration handler
      setHydrated: (): void => {
        set({ isHydrated: true });
      },

      // Get current language info
      getLanguageInfo: (): LanguageInfo => {
        const state = get();
        return {
          language: state.currentLanguage,
          isRTL: state.isRTL,
          isArabic: state.currentLanguage === "ar",
          isEnglish: state.currentLanguage === "en",
          t: (path: string) => getTranslation(state.currentLanguage, path),
        };
      },

      // Translation function
      t: (path: string): string => {
        return getTranslation(get().currentLanguage, path);
      },
    }),
    {
      name: "language-storage", // unique name for this store
      storage: createJSONStorage(() => AsyncStorage),

      // Only persist the language, not hydration state
      partialize: (state) => ({
        currentLanguage: state.currentLanguage,
        isRTL: state.isRTL,
      }),

      // Handle hydration
      onRehydrateStorage: () => (state) => {
        state?.setHydrated?.();
      },

      // Version control for future updates
      version: 1,
    }
  )
);

export default useLanguageStore;
