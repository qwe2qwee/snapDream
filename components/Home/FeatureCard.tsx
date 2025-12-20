import { Image, ImageSource } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";

interface FeatureCardProps {
  title: string;
  gradient: [string, string];
  image: ImageSource;
  onPress?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  gradient,
  image,
  onPress,
}) => {
  const {
    spacing,
    getResponsiveValue,
    getBorderRadius,
    isTablet,
    isSmallScreen,
  } = useResponsive();

  const fonts = useFontFamily();

  // Responsive values with memoization
  const responsiveValues = useMemo(
    () => ({
      // Card height scales from 80px to 120px
      cardHeight: getResponsiveValue(60, 70, 80, 90, 100),

      // Border radius for card
      cardBorderRadius: getBorderRadius("large"),

      // Image size scales proportionally with card height
      imageSize: getResponsiveValue(50, 60, 65, 72, 80),

      // Image border radius
      imageBorderRadius: getBorderRadius("small"),

      // Title font size
      titleSize: getResponsiveValue(13, 14, 15, 16, 18),

      // Line height (1.35x font size for readability)
      lineHeight: getResponsiveValue(17.5, 19, 20, 21.5, 24),

      // Padding left
      paddingLeft: spacing.md,

      // Padding right (smaller for image space)
      paddingRight: spacing.xs,

      // Max width for title (prevents overlap with image)
      titleMaxWidth: (isTablet ? "60%" : "55%") as "60%" | "55%",
    }),
    [getResponsiveValue, getBorderRadius, spacing, isTablet]
  );

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      featureCard: {
        height: responsiveValues.cardHeight,
        borderRadius: responsiveValues.cardBorderRadius,
      },
      featureGradient: {
        paddingLeft: responsiveValues.paddingLeft,
        paddingRight: responsiveValues.paddingRight,
      },
      featureTitleContainer: {
        maxWidth: responsiveValues.titleMaxWidth,
      },
      featureTitle: {
        fontSize: responsiveValues.titleSize,
        fontFamily: fonts.Medium,
        lineHeight: responsiveValues.lineHeight,
      },
      featureImage: {
        width: responsiveValues.imageSize,
        height: responsiveValues.imageSize,
        borderRadius: responsiveValues.imageBorderRadius,
      },
    }),
    [responsiveValues, fonts]
  );

  return (
    <TouchableOpacity
      style={[styles.featureCard, dynamicStyles.featureCard]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.featureGradient, dynamicStyles.featureGradient]}
      >
        <View
          style={[
            styles.featureTitleContainer,
            dynamicStyles.featureTitleContainer,
          ]}
        >
          <Text style={[styles.featureTitle, dynamicStyles.featureTitle]}>
            {title}
          </Text>
        </View>
        <Image
          source={image}
          style={[styles.featureImage, dynamicStyles.featureImage]}
          contentFit="cover"
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

// ------------------------------
// Static base styles
// ------------------------------
const styles = StyleSheet.create({
  featureCard: {
    flex: 1,
    overflow: "hidden",
  },
  featureGradient: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bottom: 0,
  },
  featureTitleContainer: {
    maxWidth: "55%" as const,
  },
  featureTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  featureImage: {
    position: "absolute",
    right: -8,
    bottom: 0,
    marginRight: 8,
  },
});
