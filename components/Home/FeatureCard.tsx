import { Image, ImageSource } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";

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
  const { currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";

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

      // Horizontal paddings swapped for RTL
      paddingLeft: isArabic ? spacing.xs : spacing.md,
      paddingRight: isArabic ? spacing.md : spacing.xs,

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
      featureTitleContainer: {
        maxWidth: responsiveValues.titleMaxWidth,
      },
      featureTitle: {
        fontSize: responsiveValues.titleSize,
        fontFamily: isArabic ? "Zain-Bold" : fonts.Medium,
        lineHeight: responsiveValues.lineHeight,
      },
      featureImage: {
        width: responsiveValues.imageSize,
        height: responsiveValues.imageSize,
        borderRadius: responsiveValues.imageBorderRadius,
        position: "absolute" as const,
        right: isArabic ? undefined : -8,
        left: isArabic ? -8 : undefined,
        bottom: 0,
        marginRight: isArabic ? 0 : 8,
        marginLeft: isArabic ? 8 : 0,
      },
      featureGradient: {
        paddingLeft: responsiveValues.paddingLeft,
        paddingRight: responsiveValues.paddingRight,
        flexDirection: (isArabic ? "row-reverse" : "row") as
          | "row"
          | "row-reverse",
      },
    }),
    [responsiveValues, fonts, isArabic]
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
    // Positioning moved to dynamicStyles
  },
});
