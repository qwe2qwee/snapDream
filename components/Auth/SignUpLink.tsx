import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SignUpLinkProps {
  onPress: () => void;
}

export const SignUpLink: React.FC<SignUpLinkProps> = ({ onPress }) => {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const fonts = useFontFamily();
  const { spacing, typography } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.md,
    },
    text: {
      fontSize: typography.body,
      fontFamily: isArabic ? "Zain-Regular" : fonts.Regular,
      color: "#8E8E93",
    },
    link: {
      fontSize: typography.body,
      fontFamily: isArabic ? "Zain-Bold" : fonts.Bold,
      color: "#FFFFFF",
      marginLeft: isArabic ? 0 : spacing.xs,
      marginRight: isArabic ? spacing.xs : 0,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{t("auth.noAccount")}</Text>
      <Text style={styles.link}>{t("auth.signUp")}</Text>
    </TouchableOpacity>
  );
};
