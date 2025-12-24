import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ColorSelectorProps {
  label: string;
  selectedColor?: { name: string; color: string };
  onPress: () => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  label,
  selectedColor,
  onPress,
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    label: {
      fontSize: typography.body,
      fontFamily: fonts.Medium,
      color: "#FFFFFF",
      marginBottom: spacing.xs,
    },
    selectorButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: getBorderRadius("large"),
      padding: spacing.sm,
      justifyContent: "space-between",
    },
    leftContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
    },
    colorPreview: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.1)",
    },
    colorName: {
      fontSize: typography.body,
      fontFamily: fonts.Regular,
      color: "#FFFFFF",
    },
    placeholderText: {
      fontSize: typography.body,
      fontFamily: fonts.Regular,
      color: "#8E8E93",
      marginLeft: spacing.sm,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.leftContent}>
          {selectedColor ? (
            <>
              <View
                style={[
                  styles.colorPreview,
                  { backgroundColor: selectedColor.color },
                ]}
              />
              <Text style={styles.colorName}>{selectedColor.name}</Text>
            </>
          ) : (
            <Text style={styles.placeholderText}>Select Color</Text>
          )}
        </View>
        <Feather name="chevron-right" size={20} color="#8E8E93" />
      </TouchableOpacity>
    </View>
  );
};
