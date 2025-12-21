import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, ScrollView, Share, StyleSheet } from "react-native";

import { GradientBackground } from "@/components/GradientBackground";

import { ActionButtons } from "@/components/CommunityDetails/ActionButtons";
import { ImageInfoBar } from "@/components/CommunityDetails/ImageInfoBar";
import { PromptSection } from "@/components/CommunityDetails/PromptSection";
import { ResultHeader } from "@/components/CommunityDetails/ResultHeader";
import { ResultImage } from "@/components/CommunityDetails/ResultImage";
import { COMMUNITY_IMAGES } from "@/constants/data";
import { useResponsive } from "@/hooks/useResponsive";

export default function TextToImageResultScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const numericId = Number(id);
  const item = COMMUNITY_IMAGES.find((it) => it.id === numericId);

  const { spacing, safeAreaTop, safeAreaBottom } = useResponsive();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this AI generated image!\n\nPrompt: ${item?.prompt}`,
        url: item?.uri || "",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share image");
    }
  };

  const handleRegenerate = () => {
    Alert.alert(
      "Regenerate",
      "This will generate a new image with the same prompt"
    );
  };

  const handleDownload = () => {
    Alert.alert("Download", "Image will be saved to your gallery");
  };

  const copyPrompt = async () => {
    await Clipboard.setStringAsync(item?.prompt || "");
    Alert.alert("Copied!", "Prompt copied to clipboard");
  };

  const copyImageInfo = () => {
    Alert.alert("Copy", "Image info copied");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: safeAreaTop,
    },
    scrollContent: {
      paddingBottom: safeAreaBottom + spacing.xl,
    },
  });

  return (
    <GradientBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <ResultHeader title="Text to Image" />
        {/* Generated Image */}
        <ResultImage imageUri={item?.uri || ""} />
        {/* Image Info Bar */}
        <ImageInfoBar
          model={item?.AIModel || "Stable Diffusion v1.5"}
          aspectRatio={item?.height || "3:4 Aspect Ratio"}
        />
        {/* Prompt Section */}
        <PromptSection prompt={item?.prompt || ""} onCopy={copyPrompt} />

        {/* Action Buttons */}
        <ActionButtons
          onShare={handleShare}
          onRegenerate={handleRegenerate}
          onDownload={handleDownload}
        />
      </ScrollView>
    </GradientBackground>
  );
}
