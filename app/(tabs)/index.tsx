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
    switch (id) {
      case 1: // Clothes Swap
        router.push("/cloth-swap");
        break;
      case 4: // Face Swap
        break;
      case 8: // Prompt to Image
        router.push("/image-generation");
        break;
      case 9: // Sketch to Image
        router.push("/sketch-to-image");
        break;
      case 13: // Model Consistency
        router.push("/multiple-image-upload"); // Using multi-upload for now
        break;
      case 14: // Outfit Variations
        router.push("/outfit-variations");
        break;
      case 16: // Hair Style
        router.push("/hairstyle");
        break;
      case 12: // Upscaler
        router.push("/image-upscale");
        break;
      case 20: // Video Generate
        router.push("/video-generation");
        break;
      default:
        // Generic detail page for single image processing
        // Covers: Color Change (2), Model Swap (3), Background (5), Pose (6),
        // Camera (7), Video (10), Styles (11), Lighting (15)
        router.push(`/details/${id}`);
    }
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
        <Header credits={5000} onProPress={() => router.push("/upgrade")} />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            dynamicStyles.scrollContent,
          ]}
        >
          {/* Feature Cards Grid */}
          <View style={[styles.featureCards, dynamicStyles.featureCards]}>
            <FeatureCard
              title="Image Generation"
              gradient={["#1E3A5F", "#0D7377"]}
              image={require("../../assets/icons/imageGen.png")}
              onPress={() => handleEffectPress(8)}
            />
            <FeatureCard
              title="Video Generation"
              gradient={["#2D1B4E", "#1E3A5F"]}
              image={require("../../assets/icons/videoGen.png")}
              onPress={() => handleEffectPress(20)}
            />
          </View>

          <View
            style={[
              styles.featureCards,
              dynamicStyles.featureCards,
              { marginTop: -10 },
            ]}
          >
            <FeatureCard
              title="Cloth Swap"
              gradient={["#4A148C", "#880E4F"]}
              image={require("../../assets/icons/imageGen.png")}
              onPress={() => handleEffectPress(1)}
            />
            <FeatureCard
              title="Hair Style"
              gradient={["#FF6B6B", "#556270"]}
              image={require("../../assets/icons/imageGen.png")}
              onPress={() => handleEffectPress(16)}
            />
          </View>

          {/* Video Effects Section */}
          <EffectsSection
            title="Video Effects"
            effects={videoEffects}
            onSeeAll={() => router.push("/effects/video")}
            onEffectPress={handleEffectPress}
          />

          {/* Image Effects Section */}
          <EffectsSection
            title="Image Effects"
            effects={imageEffects}
            onSeeAll={() => router.push("/effects/image")}
            onEffectPress={handleEffectPress}
          />

          {/* Hairstyle Changer Section */}
          <EffectsSection
            title="Hairstyle Changer"
            effects={hairstyleEffects}
            onSeeAll={() => router.push("/effects/hairstyle")}
            onEffectPress={handleEffectPress}
          />

          {/* Try-on Clothes Section */}
          <EffectsSection
            title="Try-on Clothes"
            effects={tryOnEffects}
            onSeeAll={() => router.push("/effects/tryon")}
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
