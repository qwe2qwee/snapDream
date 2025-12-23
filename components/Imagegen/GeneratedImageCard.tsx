import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface GeneratedImageCardProps {
  imageUri: string;
  onBookmark?: () => void;
  isBookmarked?: boolean;
}

export const GeneratedImageCard: React.FC<GeneratedImageCardProps> = ({
  imageUri,
  onBookmark,
  isBookmarked = false,
}) => {
  const { spacing, width, getBorderRadius, isTablet } = useResponsive();

  const imageWidth = isTablet ? width * 0.7 : width - spacing.lg * 2;
  const imageHeight = imageWidth * 1.4; // 3:4 ratio approximately

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    imageWrapper: {
      width: imageWidth,
      height: imageHeight,
      borderRadius: getBorderRadius("large") + spacing.sm,
      overflow: "hidden",
      position: "relative",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    bookmarkButton: {
      position: "absolute",
      top: spacing.md,
      right: spacing.md,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />

        {onBookmark && (
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={onBookmark}
            activeOpacity={0.7}
          >
            <Feather
              name={isBookmarked ? "bookmark" : "bookmark"}
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
