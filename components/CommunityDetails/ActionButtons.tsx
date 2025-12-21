import DownLoad from "@/assets/icons/DwonLoad.svg";
import Rotate from "@/assets/icons/Rotate.svg";
import Share from "@/assets/icons/Share.svg";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ActionButtonsProps {
  onShare: () => void;
  onRegenerate: () => void;
  onDownload: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onShare,
  onRegenerate,
  onDownload,
}) => {
  const { spacing, getResponsiveValue } = useResponsive();

  const actionButtonSize = getResponsiveValue(56, 60, 64, 68, 72);
  const actionIconSize = getResponsiveValue(22, 24, 26, 28, 30);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: spacing.lg,
      gap: spacing.md,
    },
    button: {
      width: actionButtonSize + spacing.lg + spacing.xs,
      height: actionButtonSize - spacing.sm,
      backgroundColor: "#FFFFFF",
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      {/* Share */}
      <TouchableOpacity
        style={styles.button}
        onPress={onShare}
        activeOpacity={0.8}
      >
        <Share width={actionIconSize} height={actionIconSize} color="#0D0D0F" />
      </TouchableOpacity>

      {/* Regenerate */}
      <TouchableOpacity
        style={styles.button}
        onPress={onRegenerate}
        activeOpacity={0.8}
      >
        <Rotate
          width={actionIconSize}
          height={actionIconSize}
          color="#0D0D0F"
        />
      </TouchableOpacity>

      {/* Download */}
      <TouchableOpacity
        style={styles.button}
        onPress={onDownload}
        activeOpacity={0.8}
      >
        <DownLoad
          width={actionIconSize}
          height={actionIconSize}
          color="#0D0D0F"
        />
      </TouchableOpacity>
    </View>
  );
};
