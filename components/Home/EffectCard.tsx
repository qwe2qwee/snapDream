import { BlurView } from "expo-blur";
import { Image, ImageSource } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import CrownIcon from "../../assets/icons/CrownIcon.svg";

interface EffectCardProps {
  title: string;
  image: string | ImageSource;
  isPremium: boolean;
  onPress?: () => void;
}

const CrownBadge: React.FC<{
  size: number;
  iconSize: number;
  position: number;
}> = ({ size, iconSize, position }) => (
  <View
    style={[
      styles.iconButton,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        top: position,
        right: position,
      },
    ]}
  >
    <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
      <CrownIcon width={iconSize} height={iconSize} />
    </BlurView>
  </View>
);

export const EffectCard: React.FC<EffectCardProps> = ({
  title,
  image,
  isPremium,
  onPress,
}) => {
  const {
    width,
    spacing,
    getResponsiveValue,
    getBorderRadius,
    isTablet,
    isSmallScreen,
    isVerySmallScreen,
  } = useResponsive();

  const fonts = useFontFamily();

  // Responsive values with memoization
  const responsiveValues = useMemo(() => {
    // Card width calculation
    // Tablets: show more cards (3 per row ~30%), phones: 2 per row (~45%)
    const cardWidthPercentage = isTablet ? 0.28 : 0.45;
    const cardWidth = width * cardWidthPercentage;

    // Card height (slightly taller than width for better visual)
    const cardHeight = cardWidth * 1;

    return {
      cardWidth,
      cardHeight,

      // Border radius scales with card size
      cardBorderRadius: getResponsiveValue(15, 20, 24, 28, 32),

      // Title font size
      titleSize: getResponsiveValue(12, 13, 14, 15, 16),

      // Crown badge size
      badgeSize: getResponsiveValue(32, 34, 36, 38, 40),

      // Crown icon size
      iconSize: getResponsiveValue(14, 15, 16, 17, 18),

      // Badge position from top/right
      badgePosition: getResponsiveValue(10, 12, 12, 14, 14),

      // Margin below image
      imageMarginBottom: isVerySmallScreen ? spacing.xs : spacing.sm,

      // Gradient height percentage
      gradientHeight: "40%" as const,
    };
  }, [width, spacing, getResponsiveValue, isTablet, isVerySmallScreen]);

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      effectCard: {
        width: responsiveValues.cardWidth,
      },
      effectImageContainer: {
        height: responsiveValues.cardHeight,
        borderRadius: responsiveValues.cardBorderRadius,
        marginBottom: responsiveValues.imageMarginBottom,
      },
      effectTitle: {
        fontSize: responsiveValues.titleSize,
        fontFamily: fonts.Regular,
        color: "#ffffffae",
      },
    }),
    [responsiveValues, fonts]
  );

  return (
    <TouchableOpacity
      style={[styles.effectCard, dynamicStyles.effectCard]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View
        style={[
          styles.effectImageContainer,
          dynamicStyles.effectImageContainer,
        ]}
      >
        <Image source={image} style={styles.effectImage} contentFit="cover" />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={[
            styles.effectGradient,
            { height: responsiveValues.gradientHeight },
          ]}
        />
        {isPremium && (
          <CrownBadge
            size={responsiveValues.badgeSize}
            iconSize={responsiveValues.iconSize}
            position={responsiveValues.badgePosition}
          />
        )}
      </View>
      <Text
        style={[styles.effectTitle, dynamicStyles.effectTitle]}
        numberOfLines={1}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// ------------------------------
// Static base styles
// ------------------------------
const styles = StyleSheet.create({
  effectCard: {
    // Width is dynamic
  },
  effectImageContainer: {
    width: "100%",
    overflow: "hidden",
    // Height, borderRadius, marginBottom are dynamic
  },
  effectImage: {
    width: "100%",
    height: "100%",
  },
  effectGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%" as const,
  },
  crownBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    backgroundColor: "rgba(255,215,0,0.25)",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  crownEmoji: {
    fontSize: 14,
  },
  effectTitle: {
    color: "#FFFFFF",
    // Font size and family are dynamic
  },
  iconButton: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 10,
    // Size, position are dynamic
  },
  blurContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
