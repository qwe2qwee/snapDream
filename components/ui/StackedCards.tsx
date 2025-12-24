import { useResponsive } from "@/hooks/useResponsive";
import React, { useMemo } from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";

interface StackedCardsProps {
  images: Array<string | React.ReactNode>; // Support both URIs and SVG components
  cardSize?: number; // Custom size, defaults to responsive
  maxCards?: number; // Maximum number of cards to show (default: 3)
  spacing?: number; // Space between cards (default: responsive)
  style?: ViewStyle;
}

export const StackedCards: React.FC<StackedCardsProps> = ({
  images,
  cardSize,
  maxCards = 3,
  spacing,
  style,
}) => {
  const {
    getResponsiveValue,
    getBorderRadius,
    spacing: responsiveSpacing,
  } = useResponsive();

  // Responsive values
  const responsiveValues = useMemo(
    () => ({
      cardSize: cardSize || getResponsiveValue(80, 90, 100, 110, 120),
      spacing: spacing || getResponsiveValue(12, 14, 16, 18, 20),
      borderRadius: getBorderRadius("large"),
    }),
    [cardSize, spacing, getResponsiveValue, getBorderRadius]
  );

  // Limit number of cards shown
  const displayImages = images.slice(0, maxCards);

  // Card rotation and position configurations

  const cardConfigs = [
    {
      rotate: "-12deg",
      zIndex: 1,
      translateX: -responsiveValues.cardSize * 0.35,
    },
    { rotate: "0deg", zIndex: 3, translateX: 0 },
    {
      rotate: "12deg",
      zIndex: 2,
      translateX: responsiveValues.cardSize * 0.35,
    },
  ];

  return (
    <View style={[styles.container, style]}>
      {displayImages.map((image, index) => {
        const config = cardConfigs[index] || cardConfigs[2];
        const isReactNode = typeof image !== "string";

        return (
          <View
            key={index}
            style={[
              styles.cardWrapper,
              {
                width: responsiveValues.cardSize,
                height: responsiveValues.cardSize,
                transform: [
                  { rotate: config.rotate },
                  { translateX: config.translateX },
                ],
                zIndex: config.zIndex,
              },
            ]}
          >
            <View
              style={[
                styles.card,
                {
                  width: responsiveValues.cardSize,
                  height: responsiveValues.cardSize,
                  borderRadius: responsiveValues.borderRadius,
                },
              ]}
            >
              {isReactNode ? (
                // Render React component (SVG icon)
                <View style={styles.iconContainer}>
                  {image as React.ReactNode}
                </View>
              ) : (
                // Render Image
                <Image
                  source={{ uri: image as string }}
                  style={[
                    styles.image,
                    { borderRadius: responsiveValues.borderRadius },
                  ]}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 140, // Accommodate rotation
    position: "relative",
  },
  cardWrapper: {
    position: "relative",
  },
  card: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {},
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
