import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface GeneratedVideoCardProps {
  videoUri: string; // For now treating as image thumbnail for placeholder, eventually video component
  onBookmark?: () => void;
  isBookmarked?: boolean;
}

export const GeneratedVideoCard: React.FC<GeneratedVideoCardProps> = ({
  videoUri,
  onBookmark,
  isBookmarked = false,
}) => {
  const { spacing, width, getBorderRadius, isTablet } = useResponsive();

  const videoWidth = isTablet ? width * 0.7 : width - spacing.lg * 2;
  const videoHeight = videoWidth * (12 / 9); // 16:9 ratio

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    videoWrapper: {
      width: videoWidth,
      height: videoHeight,
      borderRadius: getBorderRadius("large") + spacing.sm,
      overflow: "hidden",
      position: "relative",
      backgroundColor: "#000",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      opacity: 0.7,
    },
    playIcon: {
      position: "absolute",
      zIndex: 10,
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
      zIndex: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.videoWrapper}>
        <Image
          source={{ uri: videoUri }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.playIcon}>
          <Feather name="play-circle" size={48} color="#FFFFFF" />
        </View>

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
