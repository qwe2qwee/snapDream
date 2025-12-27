import React, { useState } from "react";
import {
  Alert,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Star from "@/assets/icons/Rate.svg";
import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { useResponsive } from "@/hooks/useResponsive";
import { router } from "expo-router";

export default function RateAppScreen() {
  const {
    spacing,
    typography,
    getResponsiveValue,
    safeAreaBottom,
    getIconSize,
  } = useResponsive();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRating = (value: number) => {
    setRating(value);
    // In a real app, you would submit this rating to your backend
    setTimeout(() => {
      if (value >= 4) {
        // Open app store for high ratings
        Alert.alert(
          "Thank You!",
          "Would you like to rate us on the App Store?",
          [
            { text: "Not Now", style: "cancel" },
            {
              text: "Rate Now",
              onPress: () => {
                // Replace with your actual app store URL
                Linking.openURL("https://apps.apple.com/app/snackdream");
              },
            },
          ]
        );
      } else {
        // Collect feedback for low ratings
        Alert.alert(
          "Thank You!",
          "We appreciate your feedback. Would you like to tell us how we can improve?",
          [
            { text: "Not Now", style: "cancel" },
            {
              text: "Send Feedback",
              onPress: () => router.push("/feedback"),
            },
          ]
        );
      }
    }, 300);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0D0D0F",
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.xl * 2,
      alignItems: "center",
    },
    title: {
      fontSize: typography.h1,
      fontWeight: "700",
      color: "#FFFFFF",
      textAlign: "center",
      marginBottom: spacing.md,
    },
    subtitle: {
      fontSize: typography.body,
      color: "#A0A0A0",
      textAlign: "center",
      marginBottom: spacing.xl * 2,
      lineHeight: typography.body * 1.5,
    },
    starsContainer: {
      flexDirection: "row",
      gap: spacing.md,
      marginBottom: spacing.xl,
    },
    starButton: {
      padding: spacing.xs,
    },
    feedbackText: {
      fontSize: typography.small,
      color: "#666666",
      textAlign: "center",
      marginTop: spacing.xl,
      paddingHorizontal: spacing.lg,
    },
    ratingText: {
      fontSize: typography.h3,
      fontWeight: "600",
      color: "#FFFFFF",
      marginTop: spacing.md,
    },
  });

  const renderStar = (index: number) => {
    const isFilled = index <= (hoveredRating || rating);
    return (
      <TouchableOpacity
        key={index}
        style={styles.starButton}
        onPress={() => handleRating(index)}
        activeOpacity={0.7}
      >
        <Star
          width={getIconSize("large")}
          height={getIconSize("large")}
          fill={isFilled ? "#FFD700" : "none"}
          stroke={isFilled ? "#FFD700" : "#666666"}
          strokeWidth={2}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <ImageGenHeader title="Rate App" />

        <View style={styles.content}>
          <Text style={styles.title}>Enjoying SnackDream?</Text>
          <Text style={styles.subtitle}>
            Your feedback helps us improve and create better experiences for
            everyone
          </Text>

          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((index) => renderStar(index))}
          </View>

          {rating > 0 && (
            <Text style={styles.ratingText}>
              {rating === 5
                ? "Excellent! 🎉"
                : rating === 4
                ? "Great! 😊"
                : rating === 3
                ? "Good 👍"
                : rating === 2
                ? "Fair 🤔"
                : "Needs Improvement 😔"}
            </Text>
          )}

          <Text style={styles.feedbackText}>
            Tap a star to rate your experience with SnackDream
          </Text>
        </View>
      </GradientBackground>
    </View>
  );
}
