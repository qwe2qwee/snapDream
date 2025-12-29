import useLanguageStore from "@/store/useLanguageStore";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { LinearGradient } from "expo-linear-gradient";

interface PageHeaderProps {
  title: string;
  onPress?: () => void;
  isLoggedIn?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  onPress,
  isLoggedIn,
}) => {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const {
    spacing,
    getResponsiveValue,
    isTablet,
    isSmallScreen,
    safeAreaTop,
    getBorderRadius,
  } = useResponsive();

  const fonts = useFontFamily();

  // Responsive values with memoization
  const responsiveValues = useMemo(
    () => ({
      // Title size scales from 24px to 34px
      titleSize: getResponsiveValue(24, 26, 28, 30, 34),

      // Letter spacing (tighter on small screens)
      letterSpacing: isSmallScreen ? -0.3 : -0.5,

      // Horizontal padding
      horizontalPadding: isTablet ? spacing.lg : spacing.md,

      // Top padding (internal spacing, safe area handled by parent)
      topPadding: safeAreaTop,
      // Credits/Button text size
      textSize: getResponsiveValue(12, 13, 14, 14, 15),

      // Bottom padding
      bottomPadding: spacing.md,
      // Vertical padding for pills
      pillPaddingVertical: getResponsiveValue(8, 9, 10, 11, 12),

      // Horizontal padding for pills
      pillPaddingHorizontal: isTablet
        ? spacing.lg
        : getResponsiveValue(12, 14, 16, 16, 18),

      // Border radius for pills
      borderRadius: getBorderRadius("large"),
    }),
    [getResponsiveValue, spacing, isTablet, isSmallScreen, safeAreaTop]
  );

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      header: {
        paddingHorizontal: responsiveValues.horizontalPadding,
        paddingTop: responsiveValues.topPadding,
        paddingBottom: responsiveValues.bottomPadding,
        flexDirection: isArabic ? "row-reverse" : "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      title: {
        fontSize: responsiveValues.titleSize,
        fontFamily: isArabic ? "Zain-Bold" : fonts.Bold,
        letterSpacing: responsiveValues.letterSpacing,
      },
      proButton: {
        paddingVertical: responsiveValues.pillPaddingVertical,
        paddingHorizontal: responsiveValues.pillPaddingHorizontal,
        borderRadius: responsiveValues.borderRadius,
      },
      proButtonText: {
        fontSize: responsiveValues.textSize,
        fontFamily: isArabic ? "Zain-Bold" : fonts.Bold,
      },
    }),
    [responsiveValues, fonts]
  );

  return (
    <View style={[styles.header, dynamicStyles.header]}>
      <Text style={[styles.title, dynamicStyles.title]}>{title}</Text>
      {!isLoggedIn && (
        <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
          <LinearGradient
            colors={["#f5550b", "#ffa47add"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[styles.proButton, dynamicStyles.proButton]}
          >
            <Text style={[styles.proButtonText, dynamicStyles.proButtonText]}>
              {t("auth.login")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

// ------------------------------
// Static base styles
// ------------------------------
const styles = StyleSheet.create({
  header: {
    // Dynamic padding applied
  },
  title: {
    color: "#FFFFFF",
    // Dynamic font properties applied
  },
  backText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  proButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  proButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
