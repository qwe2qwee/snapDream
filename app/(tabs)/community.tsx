import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import { MasonryGrid } from "@/components/Community/MasonryGrid";
import { PageHeader } from "@/components/Creations/PageHeader";
import { GradientBackground } from "@/components/GradientBackground";
import { COMMUNITY_IMAGES } from "@/constants/data";
import { useResponsive } from "@/hooks/useResponsive";

export default function CommunityScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const { safeAreaTop, getTabBarHeight, spacing, getContentHeight } =
    useResponsive();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const handleImagePress = (id: number) => {
    // Navigate to community-specific details page for the selected image
    router.push(`/details/community/${id}`);
  };

  // Calculate tab bar height including safe area bottom
  const tabBarHeight = useMemo(() => getTabBarHeight(true), [getTabBarHeight]);

  // Calculate available content height (screen minus header and tab bar)
  const contentHeight = useMemo(
    () => getContentHeight(true, true),
    [getContentHeight]
  );

  // Dynamic styles with memoization
  const dynamicStyles = useMemo(
    () => ({
      container: {
        paddingTop: 0,
      },
    }),
    []
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <GradientBackground>
        <StatusBar barStyle="light-content" backgroundColor="#0D0D0F" />

        {/* Header */}
        <PageHeader title="Community" isLoggedIn={true} />

        {/* Masonry Grid - Pass tab bar height for proper bottom padding */}
        <MasonryGrid
          images={COMMUNITY_IMAGES}
          onImagePress={handleImagePress}
          refreshing={refreshing}
          onRefresh={onRefresh}
          tabBarHeight={tabBarHeight}
          contentHeight={contentHeight}
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
