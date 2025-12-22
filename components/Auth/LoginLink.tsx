import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface LoginLinkProps {
  onPress: () => void;
}

export const LoginLink: React.FC<LoginLinkProps> = ({ onPress }) => {
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
      fontFamily: fonts.Regular,
      color: "#8E8E93",
    },
    link: {
      fontSize: typography.body,
      fontFamily: fonts.SemiBold,
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
      <Text style={styles.text}>Already have an account?</Text>
      <Text style={styles.link}>Login</Text>
    </TouchableOpacity>
  );
};
