import React, { useMemo } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { useResponsive } from "@/hooks/useResponsive";
import { MasonryImageCard } from "./MasonryImageCard";

export interface MasonryImage {
  id: number;
  uri: string;
  height: number;
}

interface MasonryGridProps {
  images: MasonryImage[];
  onImagePress?: (id: number) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  tabBarHeight?: number;
  contentHeight?: number;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  images,
  onImagePress,
  refreshing = false,
  onRefresh,
  tabBarHeight = 100, // Fallback value
  contentHeight,
}) => {
  const {
    width,
    spacing,
    getResponsiveValue,
    isTablet,
    isVeryLargeScreen,
    isSmallScreen,
  } = useResponsive();

  // Responsive values with memoization
  const responsiveValues = useMemo(() => {
    // Determine column count based on device
    let columnCount: number;
    if (isTablet) {
      columnCount = isVeryLargeScreen ? 4 : 3; // iPad: 3-4 columns
    } else {
      columnCount = isSmallScreen ? 2 : 2; // Phones: always 2 columns
    }

    return {
      columnCount,

      // Horizontal padding
      horizontalPadding: isTablet ? spacing.lg : spacing.md,

      // Gap between columns
      columnGap: getResponsiveValue(10, 12, 14, 16, 18),

      // Gap between items in a column
      itemGap: getResponsiveValue(10, 12, 14, 16, 18),

      // Bottom padding (tab bar + extra breathing room)
      bottomPadding: tabBarHeight + getResponsiveValue(16, 20, 24, 28, 32),
    };
  }, [
    width,
    spacing,
    getResponsiveValue,
    isTablet,
    isVeryLargeScreen,
    isSmallScreen,
    tabBarHeight,
  ]);

  // Distribute images into columns for masonry effect
  // Smart algorithm: add each image to the shortest column
  const columns = useMemo(() => {
    const { columnCount } = responsiveValues;
    const cols: MasonryImage[][] = Array.from(
      { length: columnCount },
      () => []
    );
    const columnHeights: number[] = Array(columnCount).fill(0);

    // Add each image to the shortest column
    // This creates the classic "waterfall" masonry effect
    images.forEach((image) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );

      // Add image to shortest column
      cols[shortestColumnIndex].push(image);

      // Update column height
      columnHeights[shortestColumnIndex] += image.height;
    });

    return cols;
  }, [images, responsiveValues.columnCount]);

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      scrollContent: {
        paddingHorizontal: responsiveValues.horizontalPadding,
        paddingBottom: responsiveValues.bottomPadding,
      },
      masonryContainer: {
        gap: responsiveValues.columnGap,
      },
      column: {
        gap: responsiveValues.itemGap,
      },
    }),
    [responsiveValues]
  );

  return (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrollContent,
        dynamicStyles.scrollContent,
      ]}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFFFFF"
            colors={["#FFFFFF"]} // Android
            progressBackgroundColor="#1A1A1F" // Android
          />
        ) : undefined
      }
    >
      <View style={[styles.masonryContainer, dynamicStyles.masonryContainer]}>
        {columns.map((columnImages, columnIndex) => (
          <View
            key={`column-${columnIndex}`}
            style={[styles.column, dynamicStyles.column]}
          >
            {columnImages.map((item) => (
              <MasonryImageCard
                key={item.id}
                uri={item.uri}
                height={item.height}
                onPress={() => onImagePress?.(item.id)}
              />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// ------------------------------
// Static base styles
// ------------------------------
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // Dynamic padding applied
  },
  masonryContainer: {
    flexDirection: "row",
    // Dynamic gap applied
  },
  column: {
    flex: 1,
    // Dynamic gap applied
  },
});
