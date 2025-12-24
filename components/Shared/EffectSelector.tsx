import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import { Image, ImageSource } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface EffectSelectorProps {
  title: string;
  icon?: string | ImageSource | number;
  onPress?: () => void;
}

export const EffectSelector: React.FC<EffectSelectorProps> = ({
  title,
  icon,
  onPress,
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      padding: spacing.md,
      borderRadius: getBorderRadius("large"),
      marginHorizontal: spacing.md,
      marginBottom: spacing.lg,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#FFE4C4", // Bisque/skin tone placeholder or dynamic
      justifyContent: "center",
      alignItems: "center",
      marginRight: spacing.md,
      overflow: "hidden",
    },
    icon: {
      width: "100%",
      height: "100%",
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: typography.body,
      fontFamily: fonts.Medium,
      color: "#FFFFFF",
    },
    chevron: {
      marginLeft: spacing.sm,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.iconContainer}>
        {icon ? (
          <Image source={icon} style={styles.icon} contentFit="cover" />
        ) : (
          <Feather name="image" size={20} color="#000" />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {onPress && (
        <Feather
          name="chevron-right"
          size={20}
          color="#8E8E93"
          style={styles.chevron}
        />
      )}
    </TouchableOpacity>
  );
};
