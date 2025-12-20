import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";

import { GradientBackground } from "@/components/GradientBackground";
import { EffectsSection } from "@/components/Home/EffectsSection";
import { FeatureCard } from "@/components/Home/FeatureCard";
import { Header } from "@/components/Home/Header";
import {
  hairstyleEffects,
  imageEffects,
  tryOnEffects,
  videoEffects,
} from "@/constants/data";
import { useResponsive } from "@/hooks/useResponsive";

export default function HomeScreen() {
  const router = useRouter();
  const {
    spacing,
    safeAreaTop,
    getTabBarHeight,
    getContentHeight,
    isSmallScreen,
    isTablet,
    width,
  } = useResponsive();

  const handleEffectPress = (id: number) => {
    router.push(`/details/${id}`);
  };

  // Responsive dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      container: {
        paddingTop: 0,
      },
      scrollContent: {
        // Account for tab bar height + extra breathing room
        paddingBottom: getTabBarHeight(true) + spacing.lg,
      },
      featureCards: {
        paddingHorizontal: isTablet ? spacing.lg : spacing.md,
        gap: isSmallScreen ? spacing.sm : spacing.md,
        marginBottom: isTablet ? spacing.xl : spacing.lg,
      },
    }),
    [safeAreaTop, spacing, getTabBarHeight, isSmallScreen, isTablet]
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <GradientBackground>
        <StatusBar barStyle="light-content" backgroundColor="#0D0D0F" />

        {/* Header */}
        <Header credits={5000} onProPress={() => {}} isSubscribed />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            dynamicStyles.scrollContent,
          ]}
        >
          {/* Feature Cards */}
          <View style={[styles.featureCards, dynamicStyles.featureCards]}>
            <FeatureCard
              title="Image Generation"
              gradient={["#1E3A5F", "#0D7377"]}
              image={require("../../assets/icons/imageGen.png")}
            />
            <FeatureCard
              title="Video Generation"
              gradient={["#2D1B4E", "#1E3A5F"]}
              image={require("../../assets/icons/videoGen.png")}
            />
          </View>

          {/* Video Effects Section */}
          <EffectsSection
            title="Video Effects"
            effects={videoEffects}
            onSeeAll={() => {}}
            onEffectPress={handleEffectPress}
          />

          {/* Image Effects Section */}
          <EffectsSection
            title="Image Effects"
            effects={imageEffects}
            onSeeAll={() => {}}
            onEffectPress={handleEffectPress}
          />

          {/* Hairstyle Changer Section */}
          <EffectsSection
            title="Hairstyle Changer"
            effects={hairstyleEffects}
            onSeeAll={() => {}}
            onEffectPress={handleEffectPress}
          />

          {/* Try-on Clothes Section */}
          <EffectsSection
            title="Try-on Clothes"
            effects={tryOnEffects}
            onSeeAll={() => {}}
            onEffectPress={handleEffectPress}
          />
        </ScrollView>
      </GradientBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0F",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // Dynamic paddingBottom applied via dynamicStyles
  },
  featureCards: {
    flexDirection: "row",
    // Dynamic spacing applied via dynamicStyles
  },
});
