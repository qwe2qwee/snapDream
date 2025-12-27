import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import React from "react";
import { StyleSheet, Text } from "react-native";

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  const { currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const fonts = useFontFamily();
  const { typography, spacing } = useResponsive();

  const styles = StyleSheet.create({
    sectionTitle: {
      fontSize: typography.caption,
      fontFamily: isArabic ? "Zain-Bold" : fonts.Medium,
      color: "#6B6B6B",
      marginBottom: spacing.sm + spacing.xs,
      marginTop: spacing.sm,
    },
  });

  return <Text style={styles.sectionTitle}>{title}</Text>;
};
