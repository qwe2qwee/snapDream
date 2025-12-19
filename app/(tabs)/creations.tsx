import { CreationsGrid } from "@/components/Creations/CreationsGrid";
import { EmptyState } from "@/components/Creations/EmptyState";
import { FilterTabs, FilterType } from "@/components/Creations/FilterTabs";
import { PageHeader } from "@/components/Creations/PageHeader";
import { GradientBackground } from "@/components/GradientBackground";
import { CREATIONS } from "@/constants/data";
import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

export default function CreationsScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredCreations = CREATIONS.filter((creation) => {
    if (activeFilter === "all") return true;
    return creation.type === activeFilter;
  });

  const hasCreations = filteredCreations.length > 0;

  const handleSharePress = (id: number) => {
    console.log("Share creation:", id);
    // Add share logic here
  };

  const handleMorePress = (id: number) => {
    console.log("More options for creation:", id);
    // Add more options logic here
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <StatusBar barStyle="light-content" backgroundColor="#0D0D0F" />

        {/* Header */}
        <PageHeader title="Creations" />

        {/* Filter Tabs */}
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Content */}
        {hasCreations ? (
          <CreationsGrid
            creations={filteredCreations}
            onSharePress={handleSharePress}
            onMorePress={handleMorePress}
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
