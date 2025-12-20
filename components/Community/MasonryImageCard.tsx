import { Image } from "expo-image";
import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { useResponsive } from "@/hooks/useResponsive";

interface MasonryImageCardProps {
  uri: string;
  height: number;
  onPress?: () => void;
}

export const MasonryImageCard: React.FC<MasonryImageCardProps> = ({
  uri,
  height,
  onPress,
}) => {
  const {
    width,
    spacing,
    getResponsiveValue,
    getBorderRadius,
    isTablet,
    isVeryLargeScreen,
    isSmallScreen,
  } = useResponsive();

  // Responsive values with memoization
  const responsiveValues = useMemo(() => {
    // Determine column count (must match MasonryGrid logic)
    let columnCount: number;
    if (isTablet) {
      columnCount = isVeryLargeScreen ? 4 : 3;
    } else {
      columnCount = 2;
    }

    // Horizontal padding (must match MasonryGrid)
    const horizontalPadding = isTablet ? spacing.lg : spacing.md;

    // Column gap (must match MasonryGrid)
    const columnGap = getResponsiveValue(10, 12, 14, 16, 18);

    // Calculate column width
    // Formula: (screenWidth - (2 × padding) - ((columns - 1) × gap)) / columns
    const availableWidth = width - horizontalPadding * 2;
    const totalGapWidth = columnGap * (columnCount - 1);
    const columnWidth = (availableWidth - totalGapWidth) / columnCount;

    // Border radius (scales beautifully)
    const borderRadius = getResponsiveValue(20, 22, 24, 26, 30);

    // Calculate actual card height
    const cardHeight = columnWidth * height;

    return {
      columnWidth,
      cardHeight,
      borderRadius,
    };
  }, [
    width,
    height,
    spacing,
    getResponsiveValue,
    isTablet,
    isVeryLargeScreen,
    isSmallScreen,
  ]);

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      imageCard: {
        height: responsiveValues.cardHeight,
        borderRadius: responsiveValues.borderRadius,
      },
    }),
    [responsiveValues]
  );

  return (
    <TouchableOpacity
      style={[styles.imageCard, dynamicStyles.imageCard]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Image
        source={{ uri }}
        style={styles.image}
        contentFit="cover"
        transition={200}
        placeholder={require("@/assets/images/placeholder.png")}
        placeholderContentFit="cover"
        cachePolicy="memory-disk"
      />
    </TouchableOpacity>
  );
};

// ------------------------------
// Static base styles
// ------------------------------
const styles = StyleSheet.create({
  imageCard: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#1A1A1D",
    // Height and borderRadius are dynamic
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
