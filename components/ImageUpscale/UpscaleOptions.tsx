import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UpscaleOptionsProps {
  enhanceModel: "Classic" | "Pro" | "Flash";
  setEnhanceModel: (model: "Classic" | "Pro" | "Flash") => void;
  upscaleFactor: "2x" | "4x";
  setUpscaleFactor: (factor: "2x" | "4x") => void;
}

export const UpscaleOptions: React.FC<UpscaleOptionsProps> = ({
  enhanceModel,
  setEnhanceModel,
  upscaleFactor,
  setUpscaleFactor,
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: typography.body,
      fontFamily: fonts.Medium,
      color: "#8E8E93", // Subdued text color
      marginBottom: spacing.sm,
      marginTop: spacing.md,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: spacing.sm,
    },
    optionButton: {
      flex: 1,
      height: 48,
      borderRadius: getBorderRadius("large"),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1C1C1E", // Dark secondary background
    },
    optionButtonActive: {
      backgroundColor: "#FFFFFF",
    },
    optionText: {
      fontSize: typography.body,
      fontFamily: fonts.Medium,
      color: "#8E8E93",
    },
    optionTextActive: {
      color: "#000000",
      fontFamily: fonts.Bold,
    },
  });

  const OptionButton = ({
    label,
    active,
    onPress,
  }: {
    label: string;
    active: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.optionButton, active && styles.optionButtonActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.optionText, active && styles.optionTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Enhance Model Section */}
      <Text style={styles.sectionTitle}>Enhance Model</Text>
      <View style={styles.row}>
        <OptionButton
          label="Classic"
          active={enhanceModel === "Classic"}
          onPress={() => setEnhanceModel("Classic")}
        />
        <OptionButton
          label="Pro"
          active={enhanceModel === "Pro"}
          onPress={() => setEnhanceModel("Pro")}
        />
        <OptionButton
          label="Flash"
          active={enhanceModel === "Flash"}
          onPress={() => setEnhanceModel("Flash")}
        />
      </View>

      {/* Upscale Section */}
      <Text style={styles.sectionTitle}>Upscale</Text>
      <View style={styles.row}>
        <OptionButton
          label="2x"
          active={upscaleFactor === "2x"}
          onPress={() => setUpscaleFactor("2x")}
        />
        <OptionButton
          label="4x"
          active={upscaleFactor === "4x"}
          onPress={() => setUpscaleFactor("4x")}
        />
      </View>
    </View>
  );
};
