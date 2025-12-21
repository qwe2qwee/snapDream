import CopyIcon from "@/assets/icons/Copy.svg";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PromptSectionProps {
  prompt: string;
  onCopy: () => void;
}

export const PromptSection: React.FC<PromptSectionProps> = ({
  prompt,
  onCopy,
}) => {
  const fonts = useFontFamily();
  const { spacing, getResponsiveValue } = useResponsive();
  const promptLabelSize = getResponsiveValue(14, 15, 16, 17, 18);
  const promptTextSize = getResponsiveValue(13, 14, 15, 16, 17);
  const iconSize = getResponsiveValue(16, 18, 20, 22, 24);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      marginBottom: getResponsiveValue(16, 18, 20, 22, 24),
      width: "100%",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: spacing.sm,
      paddingHorizontal: spacing.sm,
    },
    label: {
      fontSize: promptLabelSize,
      fontFamily: fonts.Bold,
      color: "#FFFFFF",
    },
    promptText: {
      fontSize: promptTextSize,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      padding: spacing.sm + spacing.sm,
      borderRadius: spacing.md + spacing.sm,
      fontFamily: fonts.Regular,
      minHeight: getResponsiveValue(80, 82, 84, 86, 88),
      maxHeight: getResponsiveValue(150, 152, 154, 156, 158),
      color: "#AEAEB2",
      lineHeight: promptTextSize * 1.5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Prompt</Text>
        <TouchableOpacity onPress={onCopy} activeOpacity={0.7}>
          <CopyIcon width={iconSize} height={iconSize} />
        </TouchableOpacity>
      </View>

      <Text style={styles.promptText} numberOfLines={5}>
        {prompt}
      </Text>
    </View>
  );
};
