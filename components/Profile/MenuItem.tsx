import ArrowRight from "@/assets/icons/arrow-right.svg";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  isMiddleItem?: boolean;
  isDestructive?: boolean;
  isLastItem?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  onPress,
  isDestructive = false,
  isLastItem = false,
  isMiddleItem = false,
}) => {
  const { spacing, typography, getResponsiveValue, getIconSize } =
    useResponsive();
  const iconSize = getIconSize("small") + spacing.xs / 2;

  const styles = StyleSheet.create({
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.md + 2,
      paddingHorizontal: spacing.md + 2,
      gap: spacing.sm + spacing.xs / 2,
    },
    middleItem: {
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderColor: "#000000ff",
    },
    menuIconContainer: {
      width: spacing.lg,
      alignItems: "center",
    },
    menuLabel: {
      flex: 1,
      fontSize: typography.body,
      color: "#FFFFFF",
      fontWeight: "400",
    },
    destructiveText: {
      color: "#E85454",
    },
    lastItem: {
      borderBottomWidth: 2,
      borderColor: "#000000ff",
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.menuItem,
        isMiddleItem && styles.middleItem,
        isLastItem && styles.lastItem,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuIconContainer}>{icon}</View>
      <Text style={[styles.menuLabel, isDestructive && styles.destructiveText]}>
        {label}
      </Text>
      <ArrowRight width={iconSize} height={iconSize} />
    </TouchableOpacity>
  );
};
