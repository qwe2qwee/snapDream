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
import useLanguageStore from "@/store/useLanguageStore";

export default function TextToImageResultScreen() {
  const { t } = useLanguageStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  const numericId = Number(id);
  const item = COMMUNITY_IMAGES.find((it) => it.id === numericId);

  const { spacing, safeAreaTop, safeAreaBottom } = useResponsive();

  const handleShare = async () => {
    try {
      await Share.share({
        message: t("community.shareMessage").replace(
          "{prompt}",
          item?.prompt || ""
        ),
        url: item?.uri || "",
      });
    } catch (error) {
      Alert.alert(t("common.error"), t("common.error"));
    }
  };

  const handleRegenerate = () => {
    Alert.alert(t("common.regenerate"), t("community.regenerateDesc"));
  };

  const handleDownload = () => {
    Alert.alert(t("common.download"), t("common.savedToGallery"));
  };

  const copyPrompt = async () => {
    await Clipboard.setStringAsync(item?.prompt || "");
    Alert.alert(t("common.copied"), t("common.copied"));
  };

  const copyImageInfo = () => {
    Alert.alert(t("common.copy"), t("common.copied"));
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
        <ResultHeader title={t("community.textToImage")} />
        {/* Generated Image */}
        <ResultImage imageUri={item?.uri || ""} />
        {/* Image Info Bar */}
        <ImageInfoBar
          model={item?.AIModel || t("common.unknownModel")}
          aspectRatio={item?.height || `3:4 ${t("creations.aspectRatio")}`}
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
