import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// SVG icons (both)
import ImageIcon from "../../assets/icons/ImageIcon.svg";
import VideoIcon from "../../assets/icons/VideoIcon.svg";

interface CreationCardProps {
  uri: string;
  type: "image" | "video";
  onDownload?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
  id?: number;
}

/* ----------------------------------------
   Media type icon (SVG)
----------------------------------------- */
const MediaTypeIcon = ({ type }: { type: "image" | "video" }) => {
  const { getIconSize } = useResponsive();
  const iconSize = getIconSize("medium");

  return type === "video" ? (
    <VideoIcon width={iconSize} height={iconSize} />
  ) : (
    <ImageIcon width={iconSize} height={iconSize} />
  );
};

export const CreationCard: React.FC<CreationCardProps> = ({
  uri,
  type,
  onDownload,
  onShare,
  onDelete,
  id,
}) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const { width, spacing, getResponsiveValue, getBorderRadius, typography } =
    useResponsive();
  const fonts = useFontFamily();

  const PADDING = spacing.md;
  const GAP = getResponsiveValue(10, 12, 14, 16, 18);
  const CARD_WIDTH = (width - PADDING * 2 - GAP) / 2;

  const handleOptionPress = (callback?: () => void) => {
    setShowMenu(false);
    callback?.();
  };

  const handleCardPress = () => {
    if (id) {
      router.push(`/details/creations/${id}`);
    }
  };

  const styles = StyleSheet.create({
    creationCard: {
      width: CARD_WIDTH,
      height: CARD_WIDTH,
      borderRadius: getBorderRadius("large"),
      backgroundColor: "#1A1A1D",
      position: "relative",
    },
    creationImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      borderRadius: getBorderRadius("large"),
    },
    iconButton: {
      position: "absolute",
      top: spacing.sm + spacing.xs,
      left: spacing.sm + spacing.xs,
      width: getResponsiveValue(32, 34, 36, 38, 40),
      height: getResponsiveValue(32, 34, 36, 38, 40),
      borderRadius: getResponsiveValue(16, 17, 18, 19, 20),
      overflow: "hidden",
      zIndex: 10,
    },
    moreButton: {
      left: undefined,
      right: spacing.sm + spacing.xs,
    },
    blurContainer: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    menuOverlay: {
      position: "absolute",
      inset: 0,
      zIndex: 15,
    },
    menuContainer: {
      position: "absolute",
      top: getResponsiveValue(50, 54, 56, 58, 60),
      right: spacing.sm + spacing.xs,
      width: getResponsiveValue(120, 130, 140, 150, 160),
      borderRadius: getBorderRadius("large") + 2,
      overflow: "hidden",
      zIndex: 20,
    },
    menuBlur: {
      padding: spacing.xs + 2,
    },
    menuOption: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.sm + spacing.xs,
      paddingHorizontal: spacing.sm + 2,
      gap: spacing.sm + 2,
    },
    menuOptionText: {
      fontSize: typography.body,
      color: "#FFFFFF",
      fontFamily: fonts.Medium,
    },
    deleteText: {
      color: "#FF4B4B",
    },
    menuDivider: {
      height: 1,
      backgroundColor: "rgba(255,255,255,0.1)",
      marginHorizontal: spacing.sm + 2,
    },
  });

  return (
    <TouchableOpacity
      style={styles.creationCard}
      activeOpacity={0.9}
      onPress={handleCardPress}
    >
      {/* Media preview */}
      <Image source={{ uri }} style={styles.creationImage} />

      {/* Top-left media type icon */}
      <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
        <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
          <MediaTypeIcon type={type} />
        </BlurView>
      </TouchableOpacity>

      {/* Top-right menu button */}
      <TouchableOpacity
        style={[styles.iconButton, styles.moreButton]}
        activeOpacity={0.7}
        onPress={() => setShowMenu((prev) => !prev)}
      >
        <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
          <Feather
            name="more-vertical"
            size={getResponsiveValue(18, 19, 20, 21, 22)}
            color="#FFFFFF"
          />
        </BlurView>
      </TouchableOpacity>

      {/* Options menu */}
      {showMenu && (
        <>
          {/* Overlay to close menu */}
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPress={() => setShowMenu(false)}
          />

          <View style={styles.menuContainer}>
            <BlurView intensity={90} tint="dark" style={styles.menuBlur}>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => handleOptionPress(onDownload)}
              >
                <Text style={styles.menuOptionText}>Download</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => handleOptionPress(onShare)}
              >
                <Text style={styles.menuOptionText}>Share</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => handleOptionPress(onDelete)}
              >
                <Text style={[styles.menuOptionText, styles.deleteText]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </BlurView>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};
