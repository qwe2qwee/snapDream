import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Feature {
  icon: React.FC<{ width?: number; height?: number }>;
  label: string;
}

interface PricingFeaturesProps {
  features: Feature[];
}

export const PricingFeatures: React.FC<PricingFeaturesProps> = ({
  features,
}) => {
  const fonts = useFontFamily();
  const { spacing, getResponsiveValue, isTablet } = useResponsive();

  const featureIconSize = getResponsiveValue(14, 16, 18, 20, 22);
  const featureTextSize = getResponsiveValue(8, 10, 12, 14, 16);
  const featureGap = getResponsiveValue(18, 20, 22, 24, 26);
  const horizontalPadding = isTablet ? spacing.xl : spacing.lg;

  // Split features into left and right columns
  const leftFeatures = features.filter((_, index) => index % 2 === 0);
  const rightFeatures = features.filter((_, index) => index % 2 === 1);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: horizontalPadding,
      marginBottom: spacing.xxl,
    },
    featuresGrid: {
      flexDirection: "row",
      gap: spacing.md,
    },
    column: {
      flex: 1,
      gap: featureGap,
    },
    featureItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
    },
    featureText: {
      fontSize: featureTextSize,
      fontFamily: fonts.Regular,
      color: "#FFFFFF",
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.featuresGrid}>
        {/* Left Column */}
        <View style={styles.column}>
          {leftFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <View key={index * 2} style={styles.featureItem}>
                <Icon width={featureIconSize} height={featureIconSize} />
                <Text style={styles.featureText}>{feature.label}</Text>
              </View>
            );
          })}
        </View>

        {/* Right Column */}
        <View style={styles.column}>
          {rightFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <View key={index * 2 + 1} style={styles.featureItem}>
                <Icon width={featureIconSize} height={featureIconSize} />
                <Text style={styles.featureText}>{feature.label}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
