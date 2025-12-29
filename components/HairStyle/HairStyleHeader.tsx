import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HairStyleHeaderProps {
  title?: string;
}

export const HairStyleHeader: React.FC<HairStyleHeaderProps> = ({ title }) => {
  const { currentLanguage, t } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const router = useRouter();
  const fonts = useFontFamily();

  const displayTitle = title || t("hairstyle.title");
  const { spacing, typography, safeAreaTop, getResponsiveValue } =
    useResponsive();

  const backButtonSize = getResponsiveValue(40, 44, 48, 50, 52);

  const styles = StyleSheet.create({
    container: {
      paddingTop: safeAreaTop,
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.md,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    backButton: {
      width: backButtonSize,
      height: backButtonSize,
      borderRadius: backButtonSize / 2,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: typography.h4,
      fontFamily: isArabic ? "Zain-Bold" : fonts.Bold,
      color: "#FFFFFF",
      position: "absolute",
      left: 0,
      right: 0,
      textAlign: "center",
    },
    spacer: {
      width: backButtonSize,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Feather
            name={isArabic ? "chevron-right" : "chevron-left"}
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.title}>{displayTitle}</Text>

        <View style={styles.spacer} />
      </View>
    </View>
  );
};
