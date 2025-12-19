import React from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { MasonryImageCard } from "./MasonryImageCard";

export interface MasonryImage {
  id: number;
  uri: string;
  height: number;
}

interface MasonryGridProps {
  images: MasonryImage[];
  onImagePress?: (id: number) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  images,
  onImagePress,
  refreshing = false,
  onRefresh,
}) => {
  // Split images into two columns for masonry effect
  const leftColumn = images.filter((_, index) => index % 2 === 0);
  const rightColumn = images.filter((_, index) => index % 2 === 1);

  return (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFFFFF"
          />
        ) : undefined
      }
    >
      <View style={styles.masonryContainer}>
        {/* Left Column */}
        <View style={styles.column}>
          {leftColumn.map((item) => (
            <MasonryImageCard
              key={item.id}
              uri={item.uri}
              height={item.height}
              onPress={() => onImagePress?.(item.id)}
            />
          ))}
        </View>

        {/* Right Column */}
        <View style={styles.column}>
          {rightColumn.map((item) => (
            <MasonryImageCard
              key={item.id}
              uri={item.uri}
              height={item.height}
              onPress={() => onImagePress?.(item.id)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  masonryContainer: {
    flexDirection: "row",
    gap: 12,
  },
  column: {
    flex: 1,
    gap: 12,
  },
});
