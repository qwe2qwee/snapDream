import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const PricingFooter: React.FC = () => {
  const fonts = useFontFamily();
  const { spacing, getResponsiveValue, isTablet } = useResponsive();

  const footerTextSize = getResponsiveValue(13, 14, 15, 15, 16);
  const horizontalPadding = isTablet ? spacing.xl : spacing.lg;

  const styles = StyleSheet.create({
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: spacing.sm + spacing.xs,
      paddingHorizontal: horizontalPadding,
    },
    link: {
      fontSize: footerTextSize,
      fontFamily: fonts.Regular,
      color: "#8E8E93",
    },
    separator: {
      color: "#8E8E93",
      fontSize: footerTextSize,
    },
  });

  return (
    <View style={styles.footer}>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.link}>Learn More</Text>
      </TouchableOpacity>

      <Text style={styles.separator}>|</Text>

      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.link}>Terms of Use</Text>
      </TouchableOpacity>

      <Text style={styles.separator}>|</Text>

      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.link}>Privacy Policy</Text>
      </TouchableOpacity>
    </View>
  );
};
