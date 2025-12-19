import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");
const COLUMN_GAP = 12;
const PADDING = 16;
const COLUMN_WIDTH = (width - PADDING * 2 - COLUMN_GAP) / 2;

interface MasonryImageCardProps {
  uri: string;
  height: number;
  onPress?: () => void;
}

export const MasonryImageCard: React.FC<MasonryImageCardProps> = ({
  uri,
  height,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.imageCard, { height: COLUMN_WIDTH * height }]}
    activeOpacity={0.9}
    onPress={onPress}
  >
    <Image source={{ uri }} style={styles.image} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  imageCard: {
    width: "100%",
    borderRadius: 23,
    overflow: "hidden",
    backgroundColor: "#1A1A1D",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
