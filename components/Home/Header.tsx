import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import CreditsIcon from "@/assets/icons/credits.svg";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";

interface HeaderProps {
  credits?: number;
  onProPress?: () => void;
  isSubscribed?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  credits = 5000,
  onProPress,
  isSubscribed,
}) => {
  const { currentLanguage, t } = useLanguageStore();
  const isArabic = currentLanguage === "ar";

  const {
    spacing,
    typography,
    getResponsiveValue,
    getBorderRadius,
    getIconSize,
    safeAreaTop,

    isSmallScreen,
    isVerySmallScreen,
    isTablet,
  } = useResponsive();

  const fonts = useFontFamily();

  // Responsive values with memoization
  const responsiveValues = useMemo(
    () => ({
      // Logo size: scales from 22px to 32px
      logoSize: getResponsiveValue(22, 24, 26, 28, 32),

      // Credits/Button text size
      textSize: getResponsiveValue(12, 13, 14, 14, 15),

      // Icon size for credits
      iconSize: getResponsiveValue(14, 15, 16, 17, 18),

      // Border radius for pills
      borderRadius: getBorderRadius("large"),

      // Spacing between credits and button
      headerGap: isVerySmallScreen ? spacing.xs : spacing.sm,

      // Gap inside credits container
      creditsGap: isVerySmallScreen ? 4 : 6,

      // Vertical padding for pills
      pillPaddingVertical: getResponsiveValue(8, 9, 10, 11, 12),

      // Horizontal padding for pills
      pillPaddingHorizontal: isTablet
        ? spacing.lg
        : getResponsiveValue(12, 14, 16, 16, 18),
    }),
    [getResponsiveValue, getBorderRadius, spacing, isVerySmallScreen, isTablet]
  );

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      header: {
        paddingHorizontal: isTablet ? spacing.xl : spacing.md,
        paddingTop: safeAreaTop + spacing.xs,
        paddingBottom: spacing.md,
      },
      logo: {
        fontSize: responsiveValues.logoSize - spacing.xs,
        fontFamily: "SFProDisplay-Bold", // leave it always bold En
      },
      headerRight: {
        gap: responsiveValues.headerGap,
      },
      creditsContainer: {
        paddingVertical: responsiveValues.pillPaddingVertical,
        paddingHorizontal: responsiveValues.pillPaddingHorizontal,
        borderRadius: responsiveValues.borderRadius,
        gap: responsiveValues.creditsGap,
      },
      creditsText: {
        fontSize: responsiveValues.textSize,
        fontFamily: isArabic ? "Zain-Bold" : fonts.SemiBold,
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
    [spacing, fonts, responsiveValues, isTablet]
  );

  // Format credits with commas for better readability
  const formattedCredits = credits.toLocaleString();

  return (
    <View style={[styles.header, dynamicStyles.header]}>
      <Text style={[styles.logo, dynamicStyles.logo]}>
        {t("common.appName")}
      </Text>

      <View style={[styles.headerRight, dynamicStyles.headerRight]}>
        {/* Credits display */}

        <View style={[styles.creditsContainer, dynamicStyles.creditsContainer]}>
          <CreditsIcon
            width={responsiveValues.iconSize}
            height={responsiveValues.iconSize}
            fill="#FFFFFF"
          />
          <Text style={[styles.creditsText, dynamicStyles.creditsText]}>
            {formattedCredits}
          </Text>
        </View>

        {/* Go Pro button */}
        {!isSubscribed && (
          <TouchableOpacity activeOpacity={0.8} onPress={onProPress}>
            <LinearGradient
              colors={["#f5550b", "#ffa47add"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.proButton, dynamicStyles.proButton]}
            >
              <Text style={[styles.proButtonText, dynamicStyles.proButtonText]}>
                {t("settings.upgrade")}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// ------------------------------
// Static base styles
// ------------------------------
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  creditsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#363B4A",
  },
  creditsText: {
    color: "#FFFFFF",
  },
  proButton: {
    // Dynamic styles applied
  },
  proButtonText: {
    color: "#FFFFFF",
  },
});
