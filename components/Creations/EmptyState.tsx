import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import EmptyIcon from "@/assets/icons/emptyIcon.svg";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const { spacing, getResponsiveValue, getIconSize, getTabBarHeight } =
    useResponsive();

  const fonts = useFontFamily();

  // Responsive values with memoization
  const responsiveValues = useMemo(
    () => ({
      // Icon size scales beautifully
      iconSize: getResponsiveValue(44, 48, 52, 56, 64),

      // Margin below icon
      iconMarginBottom: spacing.md,

      // Text font size
      fontSize: getResponsiveValue(15, 16, 16, 17, 18),

      // Bottom padding (to center properly above tab bar)
      paddingBottom: getTabBarHeight(true) / 2,
    }),
    [spacing, getResponsiveValue, getIconSize, getTabBarHeight]
  );

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      emptyState: {
        paddingBottom: responsiveValues.paddingBottom,
      },
      emptyIconContainer: {
        marginBottom: responsiveValues.iconMarginBottom,
      },
      emptyText: {
        fontSize: responsiveValues.fontSize,
        fontFamily: isArabic ? "Zain-Regular" : fonts.Regular,
      },
    }),
    [responsiveValues, fonts]
  );

  return (
    <View style={[styles.emptyState, dynamicStyles.emptyState]}>
      <View
        style={[styles.emptyIconContainer, dynamicStyles.emptyIconContainer]}
      >
        <EmptyIcon
          width={responsiveValues.iconSize}
          height={responsiveValues.iconSize}
        />
      </View>
      <Text style={[styles.emptyText, dynamicStyles.emptyText]}>
        {message || t("creations.noCreations")}
      </Text>
    </View>
  );
};

// ------------------------------
// Static base styles
// ------------------------------
const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // Dynamic paddingBottom applied
  },
  emptyIconContainer: {
    // Dynamic marginBottom applied
  },
  emptyText: {
    color: "#6B6B6B",
    textAlign: "center",
    // Dynamic fontSize and fontFamily applied
  },
});
