import Delete from "@/assets/icons/Del.svg";
import DownLoad from "@/assets/icons/DwonLoad.svg";
import Rotate from "@/assets/icons/Rotate.svg";
import Share from "@/assets/icons/Share.svg";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ActionButtonsProps {
  onShare: () => void;
  onRegenerate: () => void;
  onDownload: () => void;
  onDelete: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onShare,
  onRegenerate,
  onDownload,
  onDelete,
}) => {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const { spacing, getBorderRadius, typography, getResponsiveValue } =
    useResponsive();
  const fonts = useFontFamily();

  const actionButtonSize = getResponsiveValue(56, 60, 64, 68, 72);
  const actionIconSize = getResponsiveValue(22, 24, 26, 28, 30);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: spacing.lg,
      marginTop: spacing.md,
    },
    buttonContainer: {
      alignItems: "center",
      gap: spacing.xs,
    },
    button: {
      width: actionButtonSize + spacing.md,
      height: actionButtonSize - spacing.sm,
      backgroundColor: "#FFFFFF",
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonLabel: {
      fontSize: typography.caption - 1,
      fontFamily: isArabic ? "Zain-Bold" : fonts.Medium,
      color: "#8E8E93",
    },
    regenerateLabel: {
      color: "#FFFFFF",
      fontFamily: isArabic ? "Zain-Bold" : fonts.SemiBold,
    },
    deleteButton: {
      backgroundColor: "#FF3B3015", // Subtle red background for delete
    },
  });

  return (
    <View style={styles.container}>
      {/* Share */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onShare}
          activeOpacity={0.8}
        >
          <Share
            width={actionIconSize}
            height={actionIconSize}
            color="#0D0D0F"
          />
        </TouchableOpacity>
        <Text style={styles.buttonLabel}>{t("common.share")}</Text>
      </View>

      {/* Regenerate */}
      <View style={styles.buttonContainer}>
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
        <Text style={styles.buttonLabel}>{t("common.regenerate")}</Text>
      </View>

      {/* Download */}
      <View style={styles.buttonContainer}>
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
        <Text style={styles.buttonLabel}>{t("common.download")}</Text>
      </View>

      {/* Delete */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={onDelete}
          activeOpacity={0.8}
        >
          <Delete
            width={actionIconSize}
            height={actionIconSize}
            color="#FF3B30"
          />
        </TouchableOpacity>
        <Text style={styles.buttonLabel}>{t("common.delete")}</Text>
      </View>
    </View>
  );
};
