import useLanguageStore from "@/store/useLanguageStore";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { useResponsive } from "@/hooks/useResponsive";
import { FilterTab } from "./FilterTab";

export type FilterType = "all" | "image" | "video";

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const { spacing, getResponsiveValue, isTablet } = useResponsive();

  // Responsive values with memoization
  const responsiveValues = useMemo(
    () => ({
      // Horizontal padding
      horizontalPadding: isTablet ? spacing.lg : spacing.md,

      // Gap between filter tabs
      gap: getResponsiveValue(8, 10, 10, 12, 12),

      // Margin bottom
      marginBottom: getResponsiveValue(16, 18, 20, 22, 24),
    }),
    [spacing, getResponsiveValue, isTablet]
  );

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      filterContainer: {
        paddingHorizontal: responsiveValues.horizontalPadding,
        gap: responsiveValues.gap,
        marginBottom: responsiveValues.marginBottom,
      },
    }),
    [responsiveValues]
  );

  return (
    <View style={[styles.filterContainer, dynamicStyles.filterContainer]}>
      <FilterTab
        label={t("common.all")}
        isActive={activeFilter === "all"}
        onPress={() => onFilterChange("all")}
      />
      <FilterTab
        label={t("common.image")}
        isActive={activeFilter === "image"}
        onPress={() => onFilterChange("image")}
      />
      <FilterTab
        label={t("common.video")}
        isActive={activeFilter === "video"}
        onPress={() => onFilterChange("video")}
      />
    </View>
  );
};

// ------------------------------
// Static base styles
// ------------------------------
const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    // Dynamic spacing applied
  },
});
