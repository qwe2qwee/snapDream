import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface LoginLinkProps {
  onPress: () => void;
}

export const LoginLink: React.FC<LoginLinkProps> = ({ onPress }) => {
  const fonts = useFontFamily();
  const { spacing, typography } = useResponsive();
  const { t } = useLanguageStore();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.md,
    },
    text: {
      fontSize: typography.body,
      fontFamily: fonts.Regular,
      color: "#8E8E93",
    },
    link: {
      fontSize: typography.body,
      fontFamily: fonts.Bold,
      color: "#FFFFFF",
      marginLeft: spacing.xs,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{t("auth.haveAccount")}</Text>
      <Text style={styles.link}>{t("auth.login")}</Text>
    </TouchableOpacity>
  );
};
