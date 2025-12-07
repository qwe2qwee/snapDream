import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const EFFECT_CARD_WIDTH = width * 0.45;

const IMAGES = {
  imageGen:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
  videoGen:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  hugging: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200",
  aiDance: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200",
  video: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  ghibli: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200",
  christmas: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
  anime: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
};

const CrownBadge = () => (
  <View style={styles.crownBadge}>
    <Text style={styles.crownEmoji}>👑</Text>
  </View>
);

interface EffectCardProps {
  title: string;
  image: string;
  isPremium: boolean;
}

const EffectCard = ({ title, image, isPremium }: EffectCardProps) => (
  <TouchableOpacity style={styles.effectCard} activeOpacity={0.8}>
    <View style={styles.effectImageContainer}>
      <Image source={{ uri: image }} style={styles.effectImage} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.effectGradient}
      />
      {isPremium && <CrownBadge />}
    </View>
    <Text style={styles.effectTitle}>{title}</Text>
  </TouchableOpacity>
);

interface FeatureCardProps {
  title: string;
  gradient: [string, string];
  image: string;
}

const FeatureCard = ({ title, gradient, image }: FeatureCardProps) => (
  <TouchableOpacity style={styles.featureCard} activeOpacity={0.85}>
    <LinearGradient
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.featureGradient}
    >
      <Text style={styles.featureTitle}>{title}</Text>
      <Image source={{ uri: image }} style={styles.featureImage} />
    </LinearGradient>
  </TouchableOpacity>
);

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

const SectionHeader = ({ title, onSeeAll }: SectionHeaderProps) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity onPress={onSeeAll}>
      <Text style={styles.seeAllText}>See All</Text>
    </TouchableOpacity>
  </View>
);

export default function HomeScreen() {
  const videoEffects = [
    { id: 1, title: "Hugging", image: IMAGES.hugging, isPremium: true },
    { id: 2, title: "AI Dance", image: IMAGES.aiDance, isPremium: true },
    { id: 3, title: "Video", image: IMAGES.video, isPremium: true },
    { id: 4, title: "Motion", image: IMAGES.hugging, isPremium: false },
  ];

  const imageEffects = [
    { id: 1, title: "Ghibli Style", image: IMAGES.ghibli, isPremium: false },
    { id: 2, title: "Christmas", image: IMAGES.christmas, isPremium: true },
    { id: 3, title: "Anime", image: IMAGES.anime, isPremium: true },
    { id: 4, title: "Cartoon", image: IMAGES.ghibli, isPremium: false },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1E2D43", "#272A2A", "#121212", "#0C0C0C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" backgroundColor="#0D0D0F" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>SnapDream</Text>
          <View style={styles.headerRight}>
            <View style={styles.creditsContainer}>
              <MaterialCommunityIcons
                name="circle-multiple"
                size={16}
                color="#ffffffff"
              />
              <Text style={styles.creditsText}>5000</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8}>
              <LinearGradient
                colors={["#f5550b", "#ffa47add"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.proButton}
              >
                <Text style={styles.proButtonText}>Go Pro</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

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
          <SectionHeader title="Video Effects" onSeeAll={() => {}} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.effectsRow}
          >
            {videoEffects.map((effect) => (
              <EffectCard
                key={effect.id}
                title={effect.title}
                image={effect.image}
                isPremium={effect.isPremium}
              />
            ))}
          </ScrollView>

          {/* Image Effects Section */}
          <SectionHeader title="Image Effects" onSeeAll={() => {}} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.effectsRow}
          >
            {imageEffects.map((effect) => (
              <EffectCard
                key={effect.id}
                title={effect.title}
                image={effect.image}
                isPremium={effect.isPremium}
              />
            ))}
          </ScrollView>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0F",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
  },
  logo: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  creditsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252530ff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 6,
  },
  creditsText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  proButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  proButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
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
  featureCard: {
    flex: 1,
    height: 90,
    borderRadius: 16,
    overflow: "hidden",
  },
  featureGradient: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 8,
  },
  featureTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    maxWidth: "55%",
    lineHeight: 20,
  },
  featureImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  seeAllText: {
    color: "#6B6B6B",
    fontSize: 14,
    fontWeight: "500",
  },
  effectsRow: {
    paddingLeft: 16,
    paddingRight: 8,
    gap: 12,
    marginBottom: 24,
  },
  effectCard: {
    width: EFFECT_CARD_WIDTH,
  },
  effectImageContainer: {
    width: "100%",
    height: EFFECT_CARD_WIDTH * 1,
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 8,
  },
  effectImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  effectGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
  },
  crownBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    backgroundColor: "rgba(255,215,0,0.25)",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  crownEmoji: {
    fontSize: 14,
  },
  effectTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
