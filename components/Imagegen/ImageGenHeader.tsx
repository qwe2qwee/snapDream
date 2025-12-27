import BackIcon from "@/assets/icons/BackIcon.svg";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ImageGenHeaderProps {
  title?: string;
}

export const ImageGenHeader: React.FC<ImageGenHeaderProps> = ({ title }) => {
  const { currentLanguage, t } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const router = useRouter();
  const fonts = useFontFamily();

  const displayTitle = title || t("features.imageGen.title");
  const {
    spacing,
    typography,
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
        flexDirection: "row" as const,
        alignItems: "center" as const,
        justifyContent: "space-between" as const,
      },
      backButton: {
        width: responsiveValues.backIconSize,
        height: responsiveValues.backIconSize,
      },
      title: {
        fontSize: responsiveValues.titleSize,
        fontFamily: isArabic ? "Zain-Bold" : fonts.Bold,
      },
      placeholder: {
        width: responsiveValues.placeholderWidth,
      },
    }),
    [safeAreaTop, spacing, fonts, responsiveValues, isTablet]
  );

  const styles = StyleSheet.create({
    container: {
      paddingTop: safeAreaTop,
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.md,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    backButton: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: typography.h4,
      fontFamily: fonts.Bold,
      color: "#FFFFFF",
      position: "absolute",
      left: 0,
      right: 0,
      textAlign: "center",
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={dynamicStyles.backButton}
          activeOpacity={0.7}
        >
          <BackIcon
            width={responsiveValues.backIconSize}
            height={responsiveValues.backIconSize}
          />
        </TouchableOpacity>

        <Text style={dynamicStyles.title}>{displayTitle}</Text>
      </View>
    </View>
  );
};
