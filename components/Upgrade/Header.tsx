import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PricingHeaderProps {
  title: string;
}

export const PricingHeader: React.FC<PricingHeaderProps> = ({ title }) => {
  const router = useRouter();
  const fonts = useFontFamily();
  const { currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const { spacing, typography, getResponsiveValue, isTablet } = useResponsive();

  const backIconSize = getResponsiveValue(40, 44, 48, 50, 52);
  const horizontalPadding = isTablet ? spacing.xl : spacing.lg;

  const styles = StyleSheet.create({
    header: {
      flexDirection: isArabic ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: horizontalPadding,
      marginBottom: spacing.xl,
    },
    backButton: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      width: backIconSize,
      height: backIconSize,
    },
    title: {
      fontSize: getResponsiveValue(18, 20, 22, 24, 26),
      fontFamily: isArabic ? "Zain-SemiBold" : fonts.SemiBold,
      color: "#FFFFFF",
    },
    spacer: {
      width: backIconSize,
    },
  });

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <Feather
          name={isArabic ? "chevron-right" : "chevron-left"}
          size={28}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.spacer} />
    </View>
  );
};
