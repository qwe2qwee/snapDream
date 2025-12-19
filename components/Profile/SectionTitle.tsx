import React from "react";
import { StyleSheet, Text } from "react-native";

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B6B6B",
    marginBottom: 12,
    marginTop: 8,
  },
});
