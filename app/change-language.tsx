import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore, { Language } from "@/store/useLanguageStore";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ChangeLanguageScreen() {
  const { currentLanguage, setLanguage, t } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const fonts = useFontFamily();
  const { spacing, getResponsiveValue, getBorderRadius, safeAreaBottom } =
    useResponsive();

  const handleLanguageChange = (lang: Language) => {
    if (lang !== currentLanguage) {
      setLanguage(lang);
    }
  };

  const languages: { label: string; code: Language; nativeName: string }[] = [
    { label: "English", code: "en", nativeName: "English" },
    { label: "العربية", code: "ar", nativeName: "Arabic" },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.lg,
      paddingBottom: safeAreaBottom + spacing.md,
    },
    languageList: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: getBorderRadius("large"),
      overflow: "hidden",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    languageItem: {
      flexDirection: isArabic ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255, 255, 255, 0.05)",
    },
    lastItem: {
      borderBottomWidth: 0,
    },
    languageInfo: {
      flexDirection: isArabic ? "row-reverse" : "row",
      alignItems: "center",
      gap: spacing.md,
    },
    languageText: {
      fontSize: getResponsiveValue(16, 17, 18, 19, 20),
      fontFamily: isArabic ? "Zain-Bold" : fonts.Bold,
      color: "#FFFFFF",
    },
    nativeName: {
      fontSize: getResponsiveValue(12, 13, 14, 15, 16),
      fontFamily: isArabic ? "Zain-Regular" : fonts.Regular,
      color: "#8E8E93",
    },
    radioButton: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: "rgba(255, 255, 255, 0.3)",
      justifyContent: "center",
      alignItems: "center",
    },
    radioButtonSelected: {
      borderColor: "#FFFFFF",
      backgroundColor: "#FFFFFF",
    },
  });

  return (
    <GradientBackground>
      <View style={styles.container}>
        <ImageGenHeader title={t("settings.language")} />
        <View style={styles.content}>
          <View style={styles.languageList}>
            {languages.map((lang, index) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageItem,
                  index === languages.length - 1 && styles.lastItem,
                ]}
                onPress={() => handleLanguageChange(lang.code)}
                activeOpacity={0.7}
              >
                <View style={styles.languageInfo}>
                  <Text style={styles.languageText}>{lang.label}</Text>
                  <Text style={styles.nativeName}>({lang.nativeName})</Text>
                </View>

                <View
                  style={[
                    styles.radioButton,
                    currentLanguage === lang.code && styles.radioButtonSelected,
                  ]}
                >
                  {currentLanguage === lang.code && (
                    <Feather name="check" size={16} color="#0D0D0F" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </GradientBackground>
  );
}
