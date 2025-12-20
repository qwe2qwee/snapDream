import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CreationCard } from "./CreationCard";

export interface Creation {
  id: number;
  uri: string;
  type: "image" | "video";
}

interface CreationsGridProps {
  creations: Creation[];
  onShare?: (id: number) => void;
  onDownload?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export const CreationsGrid: React.FC<CreationsGridProps> = ({
  creations,
  onShare,
  onDownload,
  onDelete,
}) => {
  const { spacing, getResponsiveValue, safeAreaBottom } = useResponsive();

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: spacing.md,
      paddingBottom: getResponsiveValue(100, 120, 120, 140, 160),
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: getResponsiveValue(5, 5, 5, 10, 14),
    },
  });

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
            onShare={onShare ? () => onShare(creation.id) : undefined}
            onDownload={onDownload ? () => onDownload(creation.id) : undefined}
            onDelete={onDelete ? () => onDelete(creation.id) : undefined}
          />
        ))}
      </View>
    </ScrollView>
  );
};
