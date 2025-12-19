import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";

import { GradientBackground } from "@/components/GradientBackground";
import { EffectsSection } from "@/components/Home/EffectsSection";
import { FeatureCard } from "@/components/Home/FeatureCard";
import { Header } from "@/components/Home/Header";
import {
  hairstyleEffects,
  imageEffects,
  IMAGES,
  tryOnEffects,
  videoEffects,
} from "@/constants/data";

export default function HomeScreen() {
  const router = useRouter();

  const handleEffectPress = (id: number) => {
    router.push(`/details/${id}`);
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <StatusBar barStyle="light-content" backgroundColor="#0D0D0F" />

        {/* Header */}
        <Header credits={5000} onProPress={() => {}} />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Feature Cards */}
          <View style={styles.featureCards}>
            <FeatureCard
              title="Image Generation"
              gradient={["#1E3A5F", "#0D7377"]}
              image={IMAGES.imageGen}
            />
            <FeatureCard
              title="Video Generation"
              gradient={["#2D1B4E", "#1E3A5F"]}
              image={IMAGES.videoGen}
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
    paddingBottom: 120,
  },
  featureCards: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
});
