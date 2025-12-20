import { Feather } from "@expo/vector-icons";
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
}) => (
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
    <Feather name="chevron-right" size={20} color="#4A4A4A" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 18,

    gap: 14,
  },
  middleItem: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#000000ff",
  },
  menuIconContainer: {
    width: 24,
    alignItems: "center",
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
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
