import Credit from "@/assets/icons/CreditB.svg";
import Edit from "@/assets/icons/Edit.svg";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GenerateButtonProps {
  onPress: () => void;
  credits: number;
  onOptionsPress: () => void;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  onPress,
  credits,
  onOptionsPress,
}) => {
  const fonts = useFontFamily();
  const {
    spacing,
    typography,
    getResponsiveValue,
    getBorderRadius,
    safeAreaBottom,
  } = useResponsive();

  const buttonHeight = getResponsiveValue(54, 58, 62, 66, 70);
  const optionsButtonSize = buttonHeight;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      paddingHorizontal: spacing.lg,
      paddingBottom: safeAreaBottom + spacing.md,
      gap: spacing.md,
      backgroundColor: "#0D0D0F",
      paddingTop: spacing.md,
    },
    optionsButton: {
      width: optionsButtonSize,
      height: buttonHeight,
      borderRadius: buttonHeight / 2,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      justifyContent: "center",
      alignItems: "center",
    },
    generateButton: {
      flex: 1,
      height: buttonHeight,
      borderRadius: buttonHeight / 2,
      backgroundColor: "#FFFFFF",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.sm,
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
        style={styles.optionsButton}
        onPress={onOptionsPress}
        activeOpacity={0.7}
      >
        <Edit />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.generateButton}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View style={styles.creditsContainer}>
          <Credit />
          <Text style={styles.creditsText}>{credits}</Text>
        </View>
        <Text style={styles.generateText}>Generate</Text>
      </TouchableOpacity>
    </View>
  );
};
