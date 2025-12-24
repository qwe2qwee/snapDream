import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface StyleSelectorProps {
  label: string;
  selectedStyle?: { name: string; image: string };
  onPress: () => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  label,
  selectedStyle,
  onPress,
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius, getResponsiveValue } =
    useResponsive();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.md,
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
    previewImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#333",
    },
    styleName: {
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
          {selectedStyle ? (
            <>
              <Image
                source={{ uri: selectedStyle.image }}
                style={styles.previewImage}
                resizeMode="cover"
              />
              <Text style={styles.styleName}>{selectedStyle.name}</Text>
            </>
          ) : (
            <Text style={styles.placeholderText}>Select Style</Text>
          )}
        </View>
        <Feather name="chevron-right" size={20} color="#8E8E93" />
      </TouchableOpacity>
    </View>
  );
};
