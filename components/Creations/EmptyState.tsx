import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface EmptyStateProps {
  message?: string;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "Oops! No creations.",
  icon = "image-off-outline",
}) => (
  <View style={styles.emptyState}>
    <View style={styles.emptyIconContainer}>
      <MaterialCommunityIcons name={icon as any} size={48} color="#6B6B6B" />
    </View>
    <Text style={styles.emptyText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  emptyIconContainer: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#6B6B6B",
    fontWeight: "400",
  },
});
