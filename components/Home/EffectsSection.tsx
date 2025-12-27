import { ImageSource } from "expo-image";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { useResponsive } from "@/hooks/useResponsive";
import { EffectCard } from "./EffectCard";
import { SectionHeader } from "./SectionHeader";

interface Effect {
  id: number;
  title: string;
  image: string | ImageSource;
  isPremium: boolean;
}

interface EffectsSectionProps {
  title: string;
  seeAllText?: string;
  effects: Effect[];
  onSeeAll?: () => void;
  onEffectPress?: (id: number) => void;
}

export const EffectsSection: React.FC<EffectsSectionProps> = ({
  title,
  seeAllText,
  effects,
  onSeeAll,
  onEffectPress,
}) => {
  const { spacing, getResponsiveValue, isTablet, isSmallScreen } =
    useResponsive();

  // Responsive values with memoization
  const responsiveValues = useMemo(
    () => ({
      // Padding left (aligns with HomeScreen container)
      paddingLeft: isTablet ? spacing.lg : spacing.md,

      // Padding right (smaller for scroll indicator space)
      paddingRight: isSmallScreen ? spacing.xs : spacing.sm,

      // Gap between cards
      gap: getResponsiveValue(10, 12, 14, 16, 18),

      // Margin bottom of entire section
      marginBottom: getResponsiveValue(20, 22, 24, 26, 28),
    }),
    [spacing, getResponsiveValue, isTablet, isSmallScreen]
  );

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      effectsRow: {
        paddingLeft: responsiveValues.paddingLeft,
        paddingRight: responsiveValues.paddingRight,
        gap: responsiveValues.gap,
        marginBottom: responsiveValues.marginBottom,
      },
    }),
    [responsiveValues]
  );

  return (
    <>
      <SectionHeader
        title={title}
        seeAllText={seeAllText}
        onSeeAll={onSeeAll}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.effectsRow, dynamicStyles.effectsRow]}
        decelerationRate="fast"
        snapToInterval={undefined} // Could be enhanced with card width + gap for snap scrolling
      >
        {effects.map((effect) => (
          <EffectCard
            key={effect.id}
            title={effect.title}
            image={effect.image}
            isPremium={effect.isPremium}
            onPress={() => onEffectPress?.(effect.id)}
          />
        ))}
      </ScrollView>
    </>
  );
};

// ------------------------------
// Static base styles
// ------------------------------
const styles = StyleSheet.create({
  effectsRow: {
    // All spacing values are dynamic
  },
});
