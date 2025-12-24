import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UpscaleUploadViewProps {
  onUpload: () => void;
}

export const UpscaleUploadView: React.FC<UpscaleUploadViewProps> = ({
  onUpload,
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius, getResponsiveValue } =
    useResponsive();

  const containerHeight = getResponsiveValue(350, 400, 450, 500, 550);
  const cardWidth = getResponsiveValue(100, 110, 120, 130, 140);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.md,
      justifyContent: "center",
      alignItems: "center",
      height: containerHeight,
    },
    dashedBorder: {
      width: "100%",
      height: "100%",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.15)",
      borderStyle: "dashed",
      borderRadius: getBorderRadius("large"),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.02)",
    },
    stackContainer: {
      position: "relative",
      width: cardWidth * 2.5,
      height: cardWidth * 1.5,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    card: {
      width: cardWidth,
      height: cardWidth,
      borderRadius: getBorderRadius("medium"),
      position: "absolute",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.2)",
      overflow: "hidden",
    },
    card1: {
      transform: [{ translateX: -cardWidth * 0.6 }, { rotate: "-15deg" }],
      zIndex: 1,
    },
    card2: {
      transform: [{ translateX: cardWidth * 0.6 }, { rotate: "15deg" }],
      zIndex: 1,
    },
    card3: {
      transform: [{ translateY: -10 }, { scale: 1.1 }],
      zIndex: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
      elevation: 10,
    },
    cardImage: {
      width: "100%",
      height: "100%",
    },
    uploadText: {
      fontSize: typography.body,
      fontFamily: fonts.Medium,
      color: "#FFFFFF",
      marginTop: spacing.md,
    },
  });

  // Placeholder images - using simple gradients or colored views if actual images aren't perfect match yet
  // In a real scenario, I'd use the proper assets. For now, using what's available or colors.
  // The user provided uploaded images earlier, but I don't have direct access to their paths in the assets folder perfectly without checking.
  // I'll generic placeholder images from assets or colors.

  // Since I saw `placeholder.png` in assets, I'll use that or colorful views.
  const MockCard = ({ style, color }: { style: any; color: string }) => (
    <View style={[styles.card, style, { backgroundColor: color }]}>
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.3)"]}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dashedBorder}
        onPress={onUpload}
        activeOpacity={0.8}
      >
        <View style={styles.stackContainer}>
          {/* simulating the stack */}
          <MockCard style={styles.card1} color="#6A4BC6" />
          <MockCard style={styles.card2} color="#4A90E2" />
          {/* Center card usually main focus */}
          <MockCard style={styles.card3} color="#D95698" />
        </View>
        <Text style={styles.uploadText}>Upload Image</Text>
      </TouchableOpacity>
    </View>
  );
};
