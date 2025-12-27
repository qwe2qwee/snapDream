import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ForgotPasswordLinkProps {
  onPress: () => void;
}

export const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({
  onPress,
}) => {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const fonts = useFontFamily();
  const { spacing, typography } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      alignSelf: "flex-end",
      marginTop: -spacing.sm,
      marginBottom: spacing.xl,
    },
    link: {
      fontSize: typography.body,
      fontFamily: isArabic ? "Zain-Bold" : fonts.SemiBold,
      color: "#FFFFFF",
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.link}>{t("auth.forgotPassword")}</Text>
    </TouchableOpacity>
  );
};
