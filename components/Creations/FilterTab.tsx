import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";

interface FilterTabProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export const FilterTab: React.FC<FilterTabProps> = ({
  label,
  isActive,
  onPress,
}) => {
  const { getResponsiveValue, getBorderRadius, isSmallScreen } =
    useResponsive();

  const fonts = useFontFamily();

  // Responsive values with memoization
  const responsiveValues = useMemo(
    () => ({
      // Vertical padding
      paddingVertical: getResponsiveValue(9, 10, 10, 11, 12),

      // Horizontal padding
      paddingHorizontal: getResponsiveValue(18, 20, 22, 24, 26),

      // Border radius (pill shape)
      borderRadius: getResponsiveValue(18, 20, 22, 24, 26),

      // Font size
      fontSize: getResponsiveValue(13, 14, 14, 15, 15),
    }),
    [getResponsiveValue]
  );

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      filterTab: {
        paddingVertical: responsiveValues.paddingVertical,
        paddingHorizontal: responsiveValues.paddingHorizontal,
        borderRadius: responsiveValues.borderRadius,
      },
      filterTabText: {
        fontSize: responsiveValues.fontSize,
        fontFamily: fonts.Medium,
      },
    }),
    [responsiveValues, fonts]
  );

  return (
    <TouchableOpacity
      style={[
        styles.filterTab,
        dynamicStyles.filterTab,
        isActive && styles.filterTabActive,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.filterTabText,
          dynamicStyles.filterTabText,
          isActive && styles.filterTabTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// ------------------------------
// Static base styles
// ------------------------------
const styles = StyleSheet.create({
  filterTab: {
    backgroundColor: "#ffffff22",
    // Dynamic padding and borderRadius applied
  },
  filterTabActive: {
    backgroundColor: "#FFFFFF",
  },
  filterTabText: {
    color: "#FFFFFF",
    // Dynamic fontSize and fontFamily applied
  },
  filterTabTextActive: {
    color: "#0D0D0F",
    // Keep fontFamily (fonts.Medium) in active state
  },
});
