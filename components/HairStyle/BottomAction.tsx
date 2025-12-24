import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ImageCountPicker } from "./ImageCountPicker";

interface BottomActionProps {
  onGenerate: () => void;
  credits: number;
  disabled?: boolean;
  imageCount: number;
  onImageCountChange: (count: number) => void;
}

export const BottomAction: React.FC<BottomActionProps> = ({
  onGenerate,
  credits,
  disabled = false,
  imageCount,
  onImageCountChange,
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getResponsiveValue, safeAreaBottom } =
    useResponsive();

  const buttonHeight = getResponsiveValue(54, 58, 62, 66, 70);

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: spacing.xs,
          paddingBottom: safeAreaBottom + spacing.md,
          gap: spacing.md,
        },
      ]}
    >
      {/* Image Count Picker */}
      <ImageCountPicker
        selectedCount={imageCount}
        onSelectCount={onImageCountChange}
        maxCount={4}
      />

      {/* Generate Button */}
      <TouchableOpacity
        style={[
          styles.generateButton,
          {
            height: buttonHeight,
            borderRadius: buttonHeight / 2,
            gap: spacing.sm,
          },
          disabled && styles.buttonDisabled,
        ]}
        onPress={onGenerate}
        activeOpacity={0.9}
        disabled={disabled}
      >
        <View style={[styles.creditsContainer, { gap: spacing.xs }]}>
          <Feather name="zap" size={18} color="#0D0D0F" />
          <Text
            style={[
              styles.creditsText,
              {
                fontSize: typography.body,
                fontFamily: fonts.SemiBold,
              },
            ]}
          >
            {credits}
          </Text>
        </View>
        <Text
          style={[
            styles.generateText,
            {
              fontSize: typography.body,
              fontFamily: fonts.Bold,
            },
          ]}
        >
          Generate
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  generateButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  creditsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  creditsText: {
    color: "#0D0D0F",
  },
  generateText: {
    color: "#0D0D0F",
  },
});
