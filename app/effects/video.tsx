import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { GradientBackground } from "@/components/GradientBackground";
import { AllEffectsGrid } from "@/components/Home/AllEffectsGrid";
import { videoEffects } from "@/constants/data";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import BackIcon from "../../assets/icons/BackIcon.svg";

export default function VideoEffectsScreen() {
  const router = useRouter();
  const fonts = useFontFamily();

  const {
    spacing,
    safeAreaTop,
    getResponsiveValue,
    getTabBarHeight,
    isTablet,
  } = useResponsive();

  // Responsive values with memoization
  const responsiveValues = useMemo(
    () => ({
      // Back button icon size
      backIconSize: getResponsiveValue(42, 45, 48, 50, 52),

      // Title font size
      titleSize: getResponsiveValue(18, 20, 22, 24, 26),

      // Header vertical padding
      headerPaddingVertical: spacing.md,

      // Placeholder width (balance header)
      placeholderWidth: getResponsiveValue(40, 45, 48, 50, 52),

      // Tab bar height for grid
      tabBarHeight: getTabBarHeight(true),
    }),
    [spacing, getResponsiveValue, getTabBarHeight]
  );

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      container: {
        paddingTop: safeAreaTop,
      },
      header: {
        paddingHorizontal: isTablet ? spacing.lg : spacing.md,
        paddingVertical: responsiveValues.headerPaddingVertical,
      },
      backButton: {
        width: responsiveValues.backIconSize,
        height: responsiveValues.backIconSize,
      },
      title: {
        fontSize: responsiveValues.titleSize,
        fontFamily: fonts.Bold,
      },
      placeholder: {
        width: responsiveValues.placeholderWidth,
      },
    }),
    [safeAreaTop, spacing, fonts, responsiveValues, isTablet]
  );

  return (
    <GradientBackground>
      <View style={[styles.container, dynamicStyles.container]}>
        {/* Header */}
        <View style={[styles.header, dynamicStyles.header]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backButton, dynamicStyles.backButton]}
            activeOpacity={0.7}
          >
            <BackIcon
              width={responsiveValues.backIconSize}
              height={responsiveValues.backIconSize}
            />
          </TouchableOpacity>

          <Text style={[styles.title, dynamicStyles.title]}>Video Effects</Text>

          <View style={dynamicStyles.placeholder} />
        </View>

        {/* Effects Grid */}
        <AllEffectsGrid effects={videoEffects} />
      </View>
    </GradientBackground>
  );
}

// ------------------------------
// Static base styles
// ------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
  },
});
