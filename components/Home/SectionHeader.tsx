import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";

import useLanguageStore from "@/store/useLanguageStore";

interface SectionHeaderProps {
  title: string;
  seeAllText?: string;
  onSeeAll?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  seeAllText = "See All",
  onSeeAll,
}) => {
  const { currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";

  const { spacing, typography, getResponsiveValue, isTablet, isSmallScreen } =
    useResponsive();

  const fonts = useFontFamily();

  // Responsive values with memoization
  const responsiveValues = useMemo(
    () => ({
      // Section title size scales from 18px to 24px
      titleSize: getResponsiveValue(18, 19, 20, 22, 24),

      // "See All" text size
      seeAllSize: getResponsiveValue(13, 13.5, 14, 14, 15),

      // Letter spacing (tighter on small screens)
      letterSpacing: isSmallScreen ? -0.2 : -0.3,

      // Horizontal padding
      horizontalPadding: isTablet ? spacing.lg : spacing.md,

      // Margin bottom
      marginBottom: getResponsiveValue(12, 13, 14, 15, 16),
    }),
    [getResponsiveValue, spacing, isTablet, isSmallScreen]
  );

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      sectionHeader: {
        paddingHorizontal: responsiveValues.horizontalPadding,
        marginBottom: responsiveValues.marginBottom,
        flexDirection: (isArabic ? "row-reverse" : "row") as
          | "row"
          | "row-reverse",
      },
      sectionTitle: {
        fontSize: responsiveValues.titleSize,
        fontFamily: isArabic ? "Zain-Bold" : fonts.Bold,
        letterSpacing: responsiveValues.letterSpacing,
      },
      seeAllText: {
        fontSize: responsiveValues.seeAllSize,
        fontFamily: isArabic ? "Zain-Regular" : fonts.Medium,
      },
    }),
    [responsiveValues, fonts]
  );

  return (
    <View style={[styles.sectionHeader, dynamicStyles.sectionHeader]}>
      <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
        {title}
      </Text>
      <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
        <Text style={[styles.seeAllText, dynamicStyles.seeAllText]}>
          {seeAllText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// ------------------------------
// Static base styles
// ------------------------------
const styles = StyleSheet.create({
  sectionHeader: {
    // flexDirection moved to dynamicStyles
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#FFFFFF",
  },
  seeAllText: {
    color: "#6B6B6B",
  },
});
