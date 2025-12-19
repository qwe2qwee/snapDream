import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// SVG icons (both)
import ImageIcon from "../../assets/icons/ImageIcon.svg";
import VideoIcon from "../../assets/icons/VideoIcon.svg";

const { width } = Dimensions.get("window");
const PADDING = 16;
const GAP = 14;
const CARD_WIDTH = (width - PADDING * 2 - GAP) / 2;

interface CreationCardProps {
  uri: string;
  type: "image" | "video";
  onDownload?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

/* ----------------------------------------
   Media type icon (SVG)
----------------------------------------- */
const MediaTypeIcon = ({ type }: { type: "image" | "video" }) => {
  return type === "video" ? (
    <VideoIcon width={20} height={20} />
  ) : (
    <ImageIcon width={20} height={20} />
  );
};

export const CreationCard: React.FC<CreationCardProps> = ({
  uri,
  type,
  onDownload,
  onShare,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleOptionPress = (callback?: () => void) => {
    setShowMenu(false);
    callback?.();
  };

  return (
    <View style={styles.creationCard}>
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
          <Feather name="more-vertical" size={20} color="#FFFFFF" />
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
                <Feather name="download" size={18} color="#FFFFFF" />
                <Text style={styles.menuOptionText}>Download</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => handleOptionPress(onShare)}
              >
                <Feather name="share-2" size={18} color="#FFFFFF" />
                <Text style={styles.menuOptionText}>Share</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => handleOptionPress(onDelete)}
              >
                <Feather name="trash-2" size={18} color="#FF4B4B" />
                <Text style={[styles.menuOptionText, styles.deleteText]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </BlurView>
          </View>
        </>
      )}
    </View>
  );
};

/* ----------------------------------------
   Styles
----------------------------------------- */
const styles = StyleSheet.create({
  creationCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: 20,
    backgroundColor: "#1A1A1D",
    position: "relative",
  },
  creationImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  iconButton: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    zIndex: 10,
  },
  moreButton: {
    left: undefined,
    right: 12,
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
    top: 56,
    right: 12,
    width: 160,
    borderRadius: 14,
    overflow: "hidden",
    zIndex: 20,
    elevation: 8,
  },
  menuBlur: {
    padding: 6,
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  menuOptionText: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  deleteText: {
    color: "#FF4B4B",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 10,
  },
});
