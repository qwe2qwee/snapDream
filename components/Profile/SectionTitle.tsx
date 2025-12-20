import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, Text } from "react-native";

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  const { typography, spacing } = useResponsive();

  const styles = StyleSheet.create({
    sectionTitle: {
      fontSize: typography.caption,
      fontWeight: "500",
      color: "#6B6B6B",
      marginBottom: spacing.sm + spacing.xs,
      marginTop: spacing.sm,
    },
  });

  return <Text style={styles.sectionTitle}>{title}</Text>;
};
