import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const COLUMN_GAP = 12;
const PADDING = 16;
const COLUMN_WIDTH = (width - PADDING * 2 - COLUMN_GAP) / 2;

// Sample community images with varying heights for masonry effect
const COMMUNITY_IMAGES = [
  {
    id: 1,
    uri: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400",
    height: 1.0,
  },
  {
    id: 2,
    uri: "https://images.unsplash.com/photo-1436891620584-47fd0e565afb?w=400",
    height: 1.0,
  },
  {
    id: 3,
    uri: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400",
    height: 1.25,
  },
  {
    id: 4,
    uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    height: 1.35,
  },
  {
    id: 5,
    uri: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400",
    height: 1.1,
  },
  {
    id: 6,
    uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    height: 1.2,
  },
  {
    id: 7,
    uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
    height: 1.0,
  },
  {
    id: 8,
    uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    height: 1.3,
  },
  {
    id: 9,
    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    height: 1.1,
  },
  {
    id: 10,
    uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    height: 1.2,
  },
];

interface ImageCardProps {
  uri: string;
  height: number;
}

const ImageCard = ({ uri, height }: ImageCardProps) => (
  <TouchableOpacity
    style={[styles.imageCard, { height: COLUMN_WIDTH * height }]}
    activeOpacity={0.9}
  >
    <Image source={{ uri }} style={styles.image} />
  </TouchableOpacity>
);

export default function CommunityScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  // Split images into two columns for masonry effect
  const leftColumn = COMMUNITY_IMAGES.filter((_, index) => index % 2 === 0);
  const rightColumn = COMMUNITY_IMAGES.filter((_, index) => index % 2 === 1);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1E2D43", "#272A2A", "#121212", "#0C0C0C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Community</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FFFFFF"
            />
          }
        >
          <View style={styles.masonryContainer}>
            {/* Left Column */}
            <View style={styles.column}>
              {leftColumn.map((item) => (
                <ImageCard key={item.id} uri={item.uri} height={item.height} />
              ))}
            </View>

            {/* Right Column */}
            <View style={styles.column}>
              {rightColumn.map((item) => (
                <ImageCard key={item.id} uri={item.uri} height={item.height} />
              ))}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0F",
  },
  header: {
    paddingHorizontal: PADDING,
    paddingTop: 56,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PADDING,
    paddingBottom: 120,
  },
  masonryContainer: {
    flexDirection: "row",
    gap: COLUMN_GAP,
  },
  column: {
    flex: 1,
    gap: COLUMN_GAP,
  },
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
