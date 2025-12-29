import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface PricingButtonProps {
  onPress: () => void;
  text: string;
}

export const PricingButton: React.FC<PricingButtonProps> = ({
  onPress,
  text,
}) => {
  const fonts = useFontFamily();
  const { currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const { getResponsiveValue } = useResponsive();

  const buttonHeight = getResponsiveValue(54, 58, 62, 66, 70);
  const textSize = getResponsiveValue(18, 19, 20, 21, 22);

  const styles = StyleSheet.create({
    button: {
      backgroundColor: "#FFFFFF",
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      height: buttonHeight,
    },
    buttonText: {
      fontSize: textSize,
      fontFamily: isArabic ? "Zain-Medium" : fonts.Medium,
      color: "#0D0D0F",
    },
  });

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
