import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UploadViewProps {
  onUpload: () => void;
  label?: string;
}

export const UploadView: React.FC<UploadViewProps> = ({ onUpload, label }) => {
  const { t } = useLanguageStore();
  const displayLabel = label || t("features.upscale.upload");
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius, getResponsiveValue } =
    useResponsive();

  const containerHeight = getResponsiveValue(350, 400, 450, 500, 550);
  const cardWidth = getResponsiveValue(100, 110, 120, 130, 140);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.md,
      justifyContent: "center",
      alignItems: "center",
      height: containerHeight,
      marginBottom: spacing.lg,
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
      width: cardWidth * 2,
      height: cardWidth * 1,
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
    innerUploadArea: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    uploadText: {
      fontSize: typography.body,
      fontFamily: fonts.Medium,
      color: "#FFFFFF",
      marginTop: spacing.md,
    },
    emptyImage: {
      width: "100%",
      height: "100%",
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.innerUploadArea, styles.dashedBorder]}>
        <TouchableOpacity
          style={styles.dashedBorder}
          onPress={onUpload}
          activeOpacity={0.8}
        >
          <View style={styles.stackContainer}>
            <Image
              source={require("@/assets/images/Group.png")}
              style={styles.emptyImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.uploadText}>{displayLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
