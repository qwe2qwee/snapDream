import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ForgotPasswordLinkProps {
  onPress: () => void;
}

export const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({
  onPress,
}) => {
  const fonts = useFontFamily();
  const { spacing, typography } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      alignSelf: "flex-end",
      marginTop: -spacing.sm,
      marginBottom: spacing.xl,
    },
    text: {
      fontSize: typography.caption,
      fontFamily: fonts.Medium,
      color: "#FFFFFF",
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>Forgot password?</Text>
    </TouchableOpacity>
  );
};
