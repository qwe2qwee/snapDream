import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type PlanType = "basic" | "premium";

interface PlanToggleProps {
  selectedPlan: PlanType;
  onSelectPlan: (plan: PlanType) => void;
}

export const PlanToggle: React.FC<PlanToggleProps> = ({
  selectedPlan,
  onSelectPlan,
}) => {
  const fonts = useFontFamily();
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const { spacing, getResponsiveValue, isTablet } = useResponsive();

  const featureTextSize = getResponsiveValue(15, 16, 17, 18, 19);
  const horizontalPadding = isTablet ? spacing.xl : spacing.lg;

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      paddingHorizontal: horizontalPadding,
      marginBottom: spacing.xl,
    },
    toggleContainer: {
      flexDirection: isArabic ? "row-reverse" : "row",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: 50,
      padding: spacing.xs,
      borderWidth: 2,
      borderColor: "rgba(255, 255, 255, 0.07)",
    },
    toggleButton: {
      borderRadius: 50,
      minWidth: 130,
      alignItems: "center",
      paddingVertical: spacing.sm + 7,
      paddingHorizontal: spacing.xl,
    },
    toggleButtonActive: {
      backgroundColor: "#FFFFFF",
    },
    toggleText: {
      fontSize: featureTextSize,
      fontFamily: isArabic ? "Zain-SemiBold" : fonts.SemiBold,
      color: "#8E8E93",
    },
    toggleTextActive: {
      color: "#0D0D0F",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedPlan === "basic" && styles.toggleButtonActive,
          ]}
          onPress={() => onSelectPlan("basic")}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.toggleText,
              selectedPlan === "basic" && styles.toggleTextActive,
            ]}
          >
            {t("settings.basic")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedPlan === "premium" && styles.toggleButtonActive,
          ]}
          onPress={() => onSelectPlan("premium")}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.toggleText,
              selectedPlan === "premium" && styles.toggleTextActive,
            ]}
          >
            {t("settings.premium")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
