import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ClothSwapGenerateButtonProps {
  onPress: () => void;
  credits: number;
  disabled?: boolean;
}

export const ClothSwapGenerateButton: React.FC<
  ClothSwapGenerateButtonProps
> = ({ onPress, credits, disabled = false }) => {
  const fonts = useFontFamily();
  const { spacing, typography, getResponsiveValue, safeAreaBottom } =
    useResponsive();

  const buttonHeight = getResponsiveValue(54, 58, 62, 66, 70);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      paddingBottom: safeAreaBottom + spacing.md,
    },
    button: {
      height: buttonHeight,
      borderRadius: buttonHeight / 2,
      backgroundColor: "#FFFFFF",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.sm,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    creditsContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    creditsText: {
      fontSize: typography.body,
      fontFamily: fonts.SemiBold,
      color: "#0D0D0F",
    },
    generateText: {
      fontSize: typography.body,
      fontFamily: fonts.Bold,
      color: "#0D0D0F",
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onPress}
        activeOpacity={0.9}
        disabled={disabled}
      >
        <View style={styles.creditsContainer}>
          <Feather name="zap" size={18} color="#0D0D0F" />
          <Text style={styles.creditsText}>{credits}</Text>
        </View>
        <Text style={styles.generateText}>Generate</Text>
      </TouchableOpacity>
    </View>
  );
};
