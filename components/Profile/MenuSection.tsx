import React from "react";
import { StyleSheet, View } from "react-native";

interface MenuSectionProps {
  children: React.ReactNode;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ children }) => {
  return <View style={styles.menuSection}>{children}</View>;
};

const styles = StyleSheet.create({
  menuSection: {
    backgroundColor: "#141416",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
});
