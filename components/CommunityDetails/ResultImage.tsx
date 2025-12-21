import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface ResultImageProps {
  imageUri: string;
}

export const ResultImage: React.FC<ResultImageProps> = ({ imageUri }) => {
  const { spacing, width, getResponsiveValue, getBorderRadius, isTablet } =
    useResponsive();

  const imageWidth = isTablet ? width * 0.7 : width - spacing.lg * 2;
  const imageHeight = (imageWidth * 4) / 3; // 3:4 aspect ratio
  const imageBorderRadius = getBorderRadius("large") + spacing.sm;

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      paddingHorizontal: spacing.sm,
      marginBottom: getResponsiveValue(16, 18, 20, 22, 24),
    },
    image: {
      width: imageWidth,
      height: imageHeight,
      borderRadius: imageBorderRadius,
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};
