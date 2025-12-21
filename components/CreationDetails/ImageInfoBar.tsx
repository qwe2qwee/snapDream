import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ImageInfoBarProps {
  model: string;
  aspectRatio: string;
}

export const ImageInfoBar: React.FC<ImageInfoBarProps> = ({
  model,
  aspectRatio,
}) => {
  const fonts = useFontFamily();
  const { spacing, getResponsiveValue } = useResponsive();

  const infoTextSize = getResponsiveValue(13, 14, 15, 16, 17);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      paddingHorizontal: spacing.lg,
      marginBottom: getResponsiveValue(16, 18, 20, 22, 24),
    },
    infoLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm + spacing.xs,
    },
    badge: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      padding: spacing.sm + spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: spacing.lg,
      alignItems: "center",
      justifyContent: "center",
    },
    model: {
      fontSize: infoTextSize,
      fontFamily: fonts.Medium,
      color: "#FFFFFF",
    },
    aspectRatio: {
      fontSize: infoTextSize,
      fontFamily: fonts.Medium,
      color: "#ffffffff",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.infoLeft}>
        <View style={styles.badge}>
          <Text style={styles.model}>{model}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.aspectRatio}>{aspectRatio}</Text>
        </View>
      </View>
    </View>
  );
};
