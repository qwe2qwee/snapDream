import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ImageActionButtonsProps {
  onShare: () => void;
  onDelete: () => void;
  onRegenerate: () => void;
  onDownload: () => void;
}

export const ImageActionButtons: React.FC<ImageActionButtonsProps> = ({
  onShare,
  onDelete,
  onRegenerate,
  onDownload,
}) => {
  const { spacing, getResponsiveValue } = useResponsive();

  const buttonSize = getResponsiveValue(60, 64, 68, 72, 76);
  const iconSize = getResponsiveValue(22, 24, 26, 28, 30);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: spacing.lg,
      gap: spacing.md,
    },
    button: {
      width: buttonSize,
      height: buttonSize,
      borderRadius: buttonSize / 2,
      backgroundColor: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onShare}
        activeOpacity={0.8}
      >
        <Feather name="share-2" size={iconSize} color="#0D0D0F" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onDelete}
        activeOpacity={0.8}
      >
        <Feather name="trash-2" size={iconSize} color="#0D0D0F" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onRegenerate}
        activeOpacity={0.8}
      >
        <Feather name="rotate-cw" size={iconSize} color="#0D0D0F" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onDownload}
        activeOpacity={0.8}
      >
        <Feather name="download" size={iconSize} color="#0D0D0F" />
      </TouchableOpacity>
    </View>
  );
};
