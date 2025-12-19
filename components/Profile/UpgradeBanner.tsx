import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface UpgradeBannerProps {
  isSubscribed?: boolean;
  imageUri?: string;
  onPress?: () => void;
}

export const UpgradeBanner: React.FC<UpgradeBannerProps> = ({
  isSubscribed = false,
  imageUri = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
  onPress,
}) => {
  const bannerText = isSubscribed
    ? "Manage Your Subscription"
    : "Upgrade Now to Level Up";

  return (
    <TouchableOpacity
      style={styles.upgradeBanner}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <LinearGradient
        colors={["#1a2a3a", "#0d1a2a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bannerGradient}
      >
        <Image
          source={require("../../assets/icons/UpgradeBanner.png")}
          style={styles.bannerImage}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.bannerOverlay}
        />
        <View style={styles.bannerContent}>
          <BlurView
            intensity={Platform.OS === "ios" ? 30 : 80}
            tint="dark"
            style={styles.bannerTextContainer}
          >
            <Text style={styles.bannerText}>{bannerText}</Text>
          </BlurView>
          <BlurView
            intensity={Platform.OS === "ios" ? 30 : 80}
            tint="dark"
            style={styles.bannerIconContainer}
          >
            <Feather name="arrow-up-right" size={16} color="#FFFFFF" />
          </BlurView>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  upgradeBanner: {
    height: 190,
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 24,
  },
  bannerGradient: {
    flex: 1,
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  bannerContent: {
    position: "absolute",
    bottom: 13,
    left: 13,
    right: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  bannerTextContainer: {
    borderRadius: 999,
    overflow: "hidden", // REQUIRED
    padding: 13,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
  },
  bannerIconContainer: {
    padding: 13,
    overflow: "hidden", // REQUIRED
    borderRadius: 999,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
  },
});
