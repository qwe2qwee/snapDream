import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const PADDING = 16;
const GAP = 14;
const CARD_WIDTH = (width - PADDING * 2 - GAP) / 2;

type FilterType = "all" | "image" | "video";

interface Creation {
  id: number;
  uri: string;
  type: "image" | "video";
}

// Sample creations data
const CREATIONS: Creation[] = [
  {
    id: 1,
    uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    type: "image",
  },
  {
    id: 2,
    uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    type: "image",
  },
  {
    id: 3,
    uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
    type: "image",
  },
  {
    id: 4,
    uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    type: "image",
  },
  {
    id: 5,
    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    type: "image",
  },
  {
    id: 6,
    uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    type: "image",
  },
];

interface FilterTabProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const FilterTab = ({ label, isActive, onPress }: FilterTabProps) => (
  <TouchableOpacity
    style={[styles.filterTab, isActive && styles.filterTabActive]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text
      style={[styles.filterTabText, isActive && styles.filterTabTextActive]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

interface CreationCardProps {
  uri: string;
  type: "image" | "video";
}

const CreationCard = ({ uri, type }: CreationCardProps) => (
  <View style={styles.creationCard}>
    <Image source={{ uri }} style={styles.creationImage} />

    {/* Top-left share icon */}
    <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
      <MaterialCommunityIcons
        name="image-auto-adjust"
        size={24}
        color="#FFFFFF"
      />
    </TouchableOpacity>

    {/* Top-right more options icon */}
    <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
      <Feather name="more-vertical" size={20} color="#FFFFFF" />
    </TouchableOpacity>
  </View>
);

const EmptyState = () => (
  <View style={styles.emptyState}>
    <View style={styles.emptyIconContainer}>
      <MaterialCommunityIcons
        name="image-off-outline"
        size={48}
        color="#6B6B6B"
      />
    </View>
    <Text style={styles.emptyText}>Oops! No creations.</Text>
  </View>
);

export default function CreationsScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredCreations = CREATIONS.filter((creation) => {
    if (activeFilter === "all") return true;
    return creation.type === activeFilter;
  });

  const hasCreations = filteredCreations.length > 0;

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
          <Text style={styles.title}>Creations</Text>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <FilterTab
            label="All"
            isActive={activeFilter === "all"}
            onPress={() => setActiveFilter("all")}
          />
          <FilterTab
            label="Image"
            isActive={activeFilter === "image"}
            onPress={() => setActiveFilter("image")}
          />
          <FilterTab
            label="Video"
            isActive={activeFilter === "video"}
            onPress={() => setActiveFilter("video")}
          />
        </View>

        {hasCreations ? (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.grid}>
              {filteredCreations.map((creation) => (
                <CreationCard
                  key={creation.id}
                  uri={creation.uri}
                  type={creation.type}
                />
              ))}
            </View>
          </ScrollView>
        ) : (
          <EmptyState />
        )}
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
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: PADDING,
    gap: 10,
    marginBottom: 20,
  },
  filterTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#1A1A1D",
  },
  filterTabActive: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  filterTabTextActive: {
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PADDING,
    paddingBottom: 120,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
  },
  creationCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#1A1A1D",
    position: "relative",
  },
  creationImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  shareButton: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "rgba(30, 30, 35, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  moreButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "rgba(30, 30, 35, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  emptyIconContainer: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#6B6B6B",
    fontWeight: "400",
  },
});
