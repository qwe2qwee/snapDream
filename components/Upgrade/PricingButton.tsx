import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PricingButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

export const PricingButton: React.FC<PricingButtonProps> = ({
  text,
  onPress,
  disabled = false,
}) => {
  const fonts = useFontFamily();
  const { currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const { spacing, getResponsiveValue } = useResponsive();

  const fontSize = getResponsiveValue(16, 18, 20, 22, 24);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: getResponsiveValue(50, 56, 62, 68, 74),
      borderRadius: getResponsiveValue(25, 28, 31, 34, 37),
      backgroundColor: disabled ? "rgba(255, 255, 255, 0.1)" : "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: disabled ? "rgba(255, 255, 255, 0.1)" : "#FFFFFF",
    },
    text: {
      fontSize: fontSize,
      fontFamily: isArabic ? "Zain-Bold" : fonts.Bold,
      color: disabled ? "#8E8E93" : "#0D0D0F",
    },
  });

  if (disabled) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
