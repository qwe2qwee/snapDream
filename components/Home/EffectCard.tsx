import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CrownIcon from "../../assets/icons/CrownIcon.svg";

const { width } = Dimensions.get("window");
const EFFECT_CARD_WIDTH = width * 0.45;

const CrownBadge = () => (
  <View style={styles.iconButton}>
    <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
      <CrownIcon width={16} height={16} />
    </BlurView>
  </View>
);

interface EffectCardProps {
  title: string;
  image: string;
  isPremium: boolean;
  onPress?: () => void;
}

export const EffectCard: React.FC<EffectCardProps> = ({
  title,
  image,
  isPremium,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.effectCard}
    activeOpacity={0.8}
    onPress={onPress}
  >
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

const styles = StyleSheet.create({
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
  iconButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    zIndex: 10,
  },
  blurContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
