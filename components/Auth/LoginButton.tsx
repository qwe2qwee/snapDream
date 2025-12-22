import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface LoginButtonProps {
  onPress: () => void;
  text: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ onPress, text }) => {
  const fonts = useFontFamily();
  const { spacing, typography, getResponsiveValue, getBorderRadius } =
    useResponsive();

  const styles = StyleSheet.create({
    button: {
      backgroundColor: "#FFFFFF",
      borderRadius: getBorderRadius("large") + 10,
      height: getResponsiveValue(54, 58, 62, 66, 70),
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    text: {
      fontSize: typography.h4,
      fontFamily: fonts.Bold,
      color: "#0D0D0F",
    },
  });

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
