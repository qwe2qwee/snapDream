import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, View } from "react-native";

interface MenuSectionProps {
  children: React.ReactNode;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ children }) => {
  const { spacing, getBorderRadius } = useResponsive();

  const styles = StyleSheet.create({
    menuSection: {
      backgroundColor: "rgb(20, 20, 22, 0.9)",
      borderRadius: getBorderRadius("large") + 10,
      overflow: "hidden",
      marginBottom: spacing.md,
    },
  });

  return <View style={styles.menuSection}>{children}</View>;
};
