import React from "react";
import { StyleSheet, View } from "react-native";
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
  return (
    <View style={styles.filterContainer}>
      <FilterTab
        label="All"
        isActive={activeFilter === "all"}
        onPress={() => onFilterChange("all")}
      />
      <FilterTab
        label="Image"
        isActive={activeFilter === "image"}
        onPress={() => onFilterChange("image")}
      />
      <FilterTab
        label="Video"
        isActive={activeFilter === "video"}
        onPress={() => onFilterChange("video")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 20,
  },
});
