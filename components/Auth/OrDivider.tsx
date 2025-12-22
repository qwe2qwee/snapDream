import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const OrDivider: React.FC = () => {
  const fonts = useFontFamily();
  const { spacing, typography } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    text: {
      fontSize: typography.body,
      fontFamily: fonts.Regular,
      color: "#8E8E93",
      marginHorizontal: spacing.md,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>or</Text>
      <View style={styles.line} />
    </View>
  );
};
