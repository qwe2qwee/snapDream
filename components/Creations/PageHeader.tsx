import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";

interface PageHeaderProps {
  title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const { spacing, getResponsiveValue, isTablet, isSmallScreen, safeAreaTop } =
    useResponsive();

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

      // Bottom padding
      bottomPadding: spacing.md,
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
      },
      title: {
        fontSize: responsiveValues.titleSize,
        fontFamily: fonts.Bold,
        letterSpacing: responsiveValues.letterSpacing,
      },
    }),
    [responsiveValues, fonts]
  );

  return (
    <View style={[styles.header, dynamicStyles.header]}>
      <Text style={[styles.title, dynamicStyles.title]}>{title}</Text>
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
});
