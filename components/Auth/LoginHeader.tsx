import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LoginHeaderProps {
  title?: string;
  subtitle?: string;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({
  title,
  subtitle = "",
}) => {
  const { currentLanguage, t } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const router = useRouter();
  const fonts = useFontFamily();

  const displayTitle = title || t("auth.loginWelcome");
  const { spacing, getResponsiveValue, safeAreaTop } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.xl,
      alignItems: isArabic ? "flex-end" : "flex-start",
    },
    backButton: {
      width: getResponsiveValue(40, 44, 48, 50, 52),
      height: getResponsiveValue(40, 44, 48, 50, 52),
      borderRadius: getResponsiveValue(20, 22, 24, 25, 26),
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    welcomeText: {
      fontSize: getResponsiveValue(26, 28, 30, 32, 34),
      fontFamily: isArabic ? "Zain-Bold" : fonts.Bold,
      color: "#FFFFFF",
      marginBottom: spacing.xs,
      textAlign: isArabic ? "right" : "left",
      marginTop: safeAreaTop,
    },
    subtitle: {
      fontSize: getResponsiveValue(12, 14, 16, 18, 20),
      fontFamily: isArabic ? "Zain-Regular" : fonts.Bold,
      color: "rgba(255, 255, 255, 0.8)",
      textAlign: isArabic ? "right" : "left",
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Feather
          name={isArabic ? "chevron-right" : "chevron-left"}
          size={28}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      <Text style={styles.welcomeText}>{displayTitle}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};
