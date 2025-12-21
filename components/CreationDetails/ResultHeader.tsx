import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ResultHeaderProps {
  title: string;
}

export const ResultHeader: React.FC<ResultHeaderProps> = ({ title }) => {
  const router = useRouter();
  const fonts = useFontFamily();
  const { spacing, getResponsiveValue } = useResponsive();

  const backButtonSize = getResponsiveValue(40, 44, 48, 50, 52);
  const titleSize = getResponsiveValue(16, 17, 18, 19, 20);

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.lg,
      marginBottom: getResponsiveValue(16, 18, 20, 22, 24),
    },
    backButton: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      width: backButtonSize,
      height: backButtonSize,
    },
    title: {
      fontSize: titleSize,
      fontFamily: fonts.SemiBold,
      color: "#FFFFFF",
    },
    spacer: {
      width: backButtonSize,
    },
  });

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <Feather name="chevron-left" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.spacer} />
    </View>
  );
};
