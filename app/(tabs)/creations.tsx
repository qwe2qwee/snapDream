import React, { useMemo, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import { CreationsGrid } from "@/components/Creations/CreationsGrid";
import { EmptyState } from "@/components/Creations/EmptyState";
import { FilterTabs, FilterType } from "@/components/Creations/FilterTabs";
import { PageHeader } from "@/components/Creations/PageHeader";
import { GradientBackground } from "@/components/GradientBackground";
import { CREATIONS } from "@/constants/data";
import { useResponsive } from "@/hooks/useResponsive";

export default function CreationsScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const { safeAreaTop, getTabBarHeight, spacing } = useResponsive();

  const filteredCreations = CREATIONS.filter((creation) => {
    if (activeFilter === "all") return true;
    return creation.type === activeFilter;
  });

  const hasCreations = filteredCreations.length > 0;

  const handleShare = (id: number) => {
    console.log("Share creation:", id);
    // Add share logic here
  };

  const handleDownload = (id: number) => {
    console.log("Download creation:", id);
    // Add download logic here
  };

  const handleDelete = (id: number) => {
    console.log("Delete creation:", id);
    // Add delete logic here
  };

  // Calculate tab bar height including safe area bottom
  const tabBarHeight = useMemo(() => getTabBarHeight(true), [getTabBarHeight]);

  // Dynamic styles with memoization
  const dynamicStyles = useMemo(
    () => ({
      container: {
        paddingTop: 0,
      },
    }),
    []
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <GradientBackground>
        <StatusBar barStyle="light-content" backgroundColor="#0D0D0F" />

        {/* Header */}
        <PageHeader title="Creations" isLoggedIn={true} />

        {/* Filter Tabs */}
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Content */}
        {hasCreations ? (
          <CreationsGrid
            creations={filteredCreations}
            onShare={handleShare}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        ) : (
          <EmptyState />
        )}
      </GradientBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0F",
  },
});
