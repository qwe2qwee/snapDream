import { MasonryGrid } from "@/components/Community/MasonryGrid";
import { PageHeader } from "@/components/Creations/PageHeader";
import { GradientBackground } from "@/components/GradientBackground";
import { COMMUNITY_IMAGES } from "@/constants/data";
import React, { useCallback, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

export default function CommunityScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const handleImagePress = (id: number) => {
    console.log("Image pressed:", id);
    // Add navigation or modal logic here
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <StatusBar barStyle="light-content" backgroundColor="#0D0D0F" />

        {/* Header */}
        <PageHeader title="Community" />

        {/* Masonry Grid */}
        <MasonryGrid
          images={COMMUNITY_IMAGES}
          onImagePress={handleImagePress}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </GradientBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0F",
  },
});
