import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CreationCard } from "./CreationCard";

export interface Creation {
  id: number;
  uri: string;
  type: "image" | "video";
}

export interface Creation {
  id: number;
  uri: string;
  type: "image" | "video";
}

interface CreationsGridProps {
  creations: Creation[];
  onSharePress?: (id: number) => void;
  onMorePress?: (id: number) => void;
}

export const CreationsGrid: React.FC<CreationsGridProps> = ({
  creations,
  onSharePress,
  onMorePress,
}) => {
  return (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.grid}>
        {creations.map((creation) => (
          <CreationCard
            key={creation.id}
            uri={creation.uri}
            type={creation.type}
            onSharePress={() => onSharePress?.(creation.id)}
            onMorePress={() => onMorePress?.(creation.id)}
          />
        ))}
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
});
