import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { EffectCard } from "./EffectCard";
import { SectionHeader } from "./SectionHeader";

interface Effect {
  id: number;
  title: string;
  image: string;
  isPremium: boolean;
}

interface EffectsSectionProps {
  title: string;
  effects: Effect[];
  onSeeAll?: () => void;
  onEffectPress?: (id: number) => void;
}

export const EffectsSection: React.FC<EffectsSectionProps> = ({
  title,
  effects,
  onSeeAll,
  onEffectPress,
}) => (
  <>
    <SectionHeader title={title} onSeeAll={onSeeAll} />
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.effectsRow}
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

const styles = StyleSheet.create({
  effectsRow: {
    paddingLeft: 16,
    paddingRight: 8,
    gap: 12,
    marginBottom: 24,
  },
});
