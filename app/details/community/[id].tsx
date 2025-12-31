import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { GradientBackground } from "@/components/GradientBackground";

import { ActionButtons } from "@/components/CommunityDetails/ActionButtons";
import { ImageInfoBar } from "@/components/CommunityDetails/ImageInfoBar";
import { PromptSection } from "@/components/CommunityDetails/PromptSection";
import { ResultHeader } from "@/components/CommunityDetails/ResultHeader";
import { ResultImage } from "@/components/CommunityDetails/ResultImage";
import { SuccessModal } from "@/components/Modals/AproveModal";
import { LoadingModal } from "@/components/Modals/LoadingModal";
import { ShareModal } from "@/components/Modals/shareModal";
import { COMMUNITY_IMAGES } from "@/constants/data";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";

export default function TextToImageResultScreen() {
  const { t } = useLanguageStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  const numericId = Number(id);
  const item = COMMUNITY_IMAGES.find((it) => it.id === numericId);

  const { spacing, safeAreaTop, safeAreaBottom } = useResponsive();

  // Modal states
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState("");
  const [successTitle, setSuccessTitle] = useState("");

  const handleShare = () => {
    setShareModalVisible(true);
  };

  const handleRegenerate = () => {
    setLoadingTitle(t("creations.regenerating"));
    setLoadingModalVisible(true);

    // Simulate API call
    setTimeout(() => {
      setLoadingModalVisible(false);
    }, 2000);
  };

  const handleDownload = () => {
    setLoadingTitle(t("creations.downloading"));
    setLoadingModalVisible(true);

    // Simulate download
    setTimeout(() => {
      setLoadingModalVisible(false);
      setSuccessTitle(t("common.savedToGallery"));
      setSuccessModalVisible(true);

      setTimeout(() => {
        setSuccessModalVisible(false);
      }, 1500);
    }, 2000);
  };

  const copyPrompt = async () => {
    await Clipboard.setStringAsync(item?.prompt || "");
    setSuccessTitle(t("common.copied"));
    setSuccessModalVisible(true);

    setTimeout(() => {
      setSuccessModalVisible(false);
    }, 1500);
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

  const shareUrl = item?.uri || "https://myapp.com";
  const shareText = item?.prompt
    ? `${t("common.appName")} creation: "${item.prompt}"`
    : `${t("common.appName")} creation!`;

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

      {/* Share Modal */}
      <ShareModal
        isVisible={shareModalVisible}
        onClose={() => setShareModalVisible(false)}
        shareUrl={shareUrl}
        shareText={shareText}
        title={t("common.share")}
      />

      {/* Loading Modal */}
      <LoadingModal
        isVisible={loadingModalVisible}
        title={loadingTitle}
        onModalHide={() => {}}
      />

      {/* Success Modal */}
      <SuccessModal
        isVisible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
        onContinue={() => setSuccessModalVisible(false)}
        title={successTitle}
        showCloseButton={false}
        buttonText={t("common.close")}
      />
    </GradientBackground>
  );
}
