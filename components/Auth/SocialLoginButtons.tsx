import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppleIcon from "../../assets/icons/Apple.svg";
import GoogleIcon from "../../assets/icons/Google.svg";

interface SocialLoginButtonsProps {
  onGooglePress: () => void;
  onApplePress: () => void;
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGooglePress,
  onApplePress,
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getResponsiveValue, getBorderRadius } =
    useResponsive();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: spacing.md,
    },
    button: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: getResponsiveValue(48, 52, 56, 60, 64),
      borderRadius: getBorderRadius("large") + 10,
      gap: spacing.sm,
    },
    googleButton: {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
    appleButton: {
      backgroundColor: "#FFFFFF",
    },
    text: {
      fontSize: typography.body,
      fontFamily: fonts.Bold,
    },
    googleText: {
      color: "#FFFFFF",
    },
    appleText: {
      color: "#0D0D0F",
    },
  });

  return (
    <View style={styles.container}>
      {/* Google */}
      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        onPress={onGooglePress}
        activeOpacity={0.8}
      >
        <GoogleIcon />
        <Text style={[styles.text, styles.googleText]}>Google</Text>
      </TouchableOpacity>

      {/* Apple */}
      <TouchableOpacity
        style={[styles.button, styles.appleButton]}
        onPress={onApplePress}
        activeOpacity={0.8}
      >
        <AppleIcon />
        <Text style={[styles.text, styles.appleText]}>Apple</Text>
      </TouchableOpacity>
    </View>
  );
};
