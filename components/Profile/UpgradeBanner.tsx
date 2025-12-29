import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
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
  isLoggedIn?: boolean;
}

export const UpgradeBanner: React.FC<UpgradeBannerProps> = ({
  isSubscribed = false,
  imageUri = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
  onPress,
  isLoggedIn = false,
}) => {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const {
    spacing,
    typography,
    getResponsiveValue,
    getBorderRadius,
    getIconSize,
  } = useResponsive();

  const fonts = useFontFamily();

  const isUpgradeAvailable = (isLoggedIn && !isSubscribed) || !isLoggedIn;

  const bannerText = isUpgradeAvailable
    ? t("home.upgradeNow") // Need to ensure this exists or create it
    : t("home.manageSubscription");

  const iconSize = getIconSize("medium");

  const styles = StyleSheet.create({
    upgradeBanner: {
      height: getResponsiveValue(170, 180, 190, 200, 210),
      borderRadius: getBorderRadius("large") + 10,
      overflow: "hidden",
      marginBottom: spacing.lg,
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
      bottom: spacing.sm + spacing.xs / 2,
      left: spacing.sm + spacing.xs / 2,
      right: spacing.sm + spacing.xs / 2,
      flexDirection: isArabic ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    bannerText: {
      fontSize: typography.body,
      fontFamily: isArabic ? "Zain-Bold" : fonts.Medium,
      color: "#FFFFFF",
      textAlign: isArabic ? "right" : "left",
    },
    bannerTextContainer: {
      borderRadius: 999,
      overflow: "hidden", // REQUIRED
      padding: spacing.sm + spacing.xs / 2,
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderWidth: 2,
    },
    bannerIconContainer: {
      padding: spacing.sm,
      overflow: "hidden", // REQUIRED
      borderRadius: 999,
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderWidth: 2,
      transform: [{ scaleX: isArabic ? -1 : 1 }],
    },
  });

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
          {/* Text container */}
          {Platform.OS === "ios" ? (
            <BlurView
              intensity={30}
              tint="dark"
              style={styles.bannerTextContainer}
            >
              <Text style={styles.bannerText}>{bannerText}</Text>
            </BlurView>
          ) : (
            <LinearGradient
              colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.6)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.bannerTextContainer, { justifyContent: "center" }]}
            >
              <Text style={styles.bannerText}>{bannerText}</Text>
            </LinearGradient>
          )}

          {/* Icon container */}
          {Platform.OS === "ios" ? (
            <BlurView
              intensity={30}
              tint="dark"
              style={styles.bannerIconContainer}
            >
              <ArrowLeft
                width={iconSize}
                height={iconSize}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </BlurView>
          ) : (
            <LinearGradient
              colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.6)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[
                styles.bannerIconContainer,
                { justifyContent: "center", alignItems: "center" },
              ]}
            >
              <ArrowLeft
                width={iconSize}
                height={iconSize}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </LinearGradient>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
