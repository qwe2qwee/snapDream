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
    backgroundColor: "rgb(20, 20, 22, 0.9)",
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 16,
  },
});
