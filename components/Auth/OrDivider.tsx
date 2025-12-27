import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const OrDivider: React.FC = () => {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const fonts = useFontFamily();
  const { spacing, typography } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    text: {
      fontSize: typography.body,
      fontFamily: isArabic ? "Zain-Bold" : fonts.Regular,
      color: "#8E8E93",
      marginHorizontal: spacing.md,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{t("common.or")}</Text>
      <View style={styles.line} />
    </View>
  );
};
