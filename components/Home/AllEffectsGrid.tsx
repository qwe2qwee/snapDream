import { ImageSource } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { useResponsive } from "@/hooks/useResponsive";
import { EffectCard } from "./EffectCard";

interface Effect {
  id: number;
  title: string;
  image: string | ImageSource;
  isPremium: boolean;
}

interface AllEffectsGridProps {
  effects: Effect[];
}

export const AllEffectsGrid: React.FC<AllEffectsGridProps> = ({ effects }) => {
  const router = useRouter();
  const { spacing, isTablet, isSmallScreen, width } = useResponsive();

  const handleEffectPress = (id: number) => {
    router.push(`/details/${id}`);
  };

  // Calculate number of columns based on screen size
  const numColumns = useMemo(() => {
    if (isTablet) return 3;
    if (isSmallScreen) return 2;
    return 2;
  }, [isTablet, isSmallScreen]);

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      container: {
        paddingHorizontal: isTablet ? spacing.lg : spacing.md,
        paddingTop: spacing.md,
      },
      columnWrapper: {
        gap: isSmallScreen ? spacing.sm : spacing.md,
        marginBottom: isSmallScreen ? spacing.sm : spacing.md,
      },
    }),
    [spacing, isTablet, isSmallScreen]
  );

  return (
    <FlatList
      data={effects}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <EffectCard
            title={item.title}
            image={item.image}
            isPremium={item.isPremium}
            onPress={() => handleEffectPress(item.id)}
          />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      columnWrapperStyle={dynamicStyles.columnWrapper}
      contentContainerStyle={dynamicStyles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
  },
});
