import BackButton from "@/assets/icons/BackIcon.svg";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ImageGenHeaderProps {
  title?: string;
}

export const ImageGenHeader: React.FC<ImageGenHeaderProps> = ({
  title = "Image Gen",
}) => {
  const router = useRouter();
  const fonts = useFontFamily();
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
      fontFamily: fonts.Bold,
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
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <BackButton width={backButtonSize} height={backButtonSize} />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.spacer} />
      </View>
    </View>
  );
};
