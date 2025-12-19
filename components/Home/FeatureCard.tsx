import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface FeatureCardProps {
  title: string;
  gradient: [string, string];
  image: string;
  onPress?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  gradient,
  image,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.featureCard}
    activeOpacity={0.85}
    onPress={onPress}
  >
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

const styles = StyleSheet.create({
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
});
