import { Image } from "expo-image";
import React, { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { useResponsive } from "@/hooks/useResponsive";

interface ResultImageProps {
  imageUri: string;
  containerStyle?: ViewStyle;
  aspectRatio?: number; // Default 9:16 (taller), can be customized
}

export const ResultImage: React.FC<ResultImageProps> = ({
  imageUri,
  containerStyle,
  aspectRatio = 9 / 16, // Taller aspect ratio (9:16 = 0.5625)
}) => {
  const { width, spacing, getResponsiveValue, getBorderRadius, isTablet } =
    useResponsive();

  // Responsive values with memoization
  const responsiveValues = useMemo(
    () => ({
      // Image width calculation
      imageWidth: isTablet ? width * 0.85 : width - spacing.lg * 2,

      // Image height based on aspect ratio
      get imageHeight() {
        return this.imageWidth / aspectRatio;
      },

      // Border radius (reasonable values: 20-30px)
      borderRadius: getBorderRadius("large"),
    }),
    [width, spacing, aspectRatio, isTablet, getBorderRadius]
  );

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      container: {
        paddingHorizontal: isTablet ? spacing.md : spacing.lg,
        marginBottom: spacing.lg,
      },
      image: {
        width: responsiveValues.imageWidth,
        height: responsiveValues.imageHeight,
        borderRadius: responsiveValues.borderRadius,
      },
    }),
    [spacing, responsiveValues, isTablet]
  );

  return (
    <View style={[styles.container, dynamicStyles.container, containerStyle]}>
      <Image
        source={{ uri: imageUri }}
        style={[
          styles.image,
          dynamicStyles.image,
          // Override with container dimensions if provided
          containerStyle?.height
            ? {
                width: "100%",
                height: "100%",
              }
            : undefined,
        ]}
        contentFit="cover"
        transition={200}
        placeholder={require("@/assets/images/placeholder.png")}
        placeholderContentFit="cover"
        cachePolicy="memory-disk"
      />
    </View>
  );
};

// Static base styles
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    overflow: "hidden",
  },
});
