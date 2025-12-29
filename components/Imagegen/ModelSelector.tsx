import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ModelSelectorProps {
  modelName: string;
  modelIcon?: string;
  onPress: () => void;
  label?: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  modelName,
  modelIcon,
  onPress,
  label,
}) => {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const displayLabel = label || t("models.label");
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    label: {
      fontSize: typography.caption,
      fontFamily: isArabic ? "Zain-Regular" : fonts.Regular,
      color: "#FFFFFF",
      marginBottom: spacing.sm,
    },
    selector: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: getBorderRadius("large") + spacing.md,
      padding: spacing.md,
    },
    leftSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
    },
    modelIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    modelName: {
      fontSize: typography.body,
      fontFamily: isArabic ? "Zain-Medium" : fonts.Medium,
      color: "#FFFFFF",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{displayLabel}</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={onPress}
        activeOpacity={1}
      >
        <View style={styles.leftSection}>
          {modelIcon && (
            <Image source={{ uri: modelIcon }} style={styles.modelIcon} />
          )}
          <Text style={styles.modelName}>{modelName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
