import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const PricingFooter: React.FC = () => {
  const fonts = useFontFamily();
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const { spacing, getResponsiveValue, isTablet } = useResponsive();

  const footerTextSize = getResponsiveValue(13, 14, 15, 15, 16);
  const horizontalPadding = isTablet ? spacing.xl : spacing.lg;

  const styles = StyleSheet.create({
    footer: {
      flexDirection: isArabic ? "row-reverse" : "row",
      justifyContent: "center",
      alignItems: "center",
      gap: spacing.sm + spacing.xs,
      paddingHorizontal: horizontalPadding,
    },
    link: {
      fontSize: footerTextSize,
      fontFamily: isArabic ? "Zain-Regular" : fonts.Regular,
      color: "#8E8E93",
    },
    separator: {
      color: "#8E8E93",
      fontSize: footerTextSize,
    },
  });

  return (
    <View style={styles.footer}>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.link}>{t("settings.learnMore")}</Text>
      </TouchableOpacity>

      <Text style={styles.separator}>|</Text>

      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.link}>{t("settings.termsOfUse")}</Text>
      </TouchableOpacity>

      <Text style={styles.separator}>|</Text>

      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.link}>{t("common.privacyPolicy")}</Text>
      </TouchableOpacity>
    </View>
  );
};
