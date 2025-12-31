import Delete from "@/assets/icons/Dele.svg";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { ActionButtons } from "@/components/CreationDetails/ActionButtons";
import { ImageInfoBar } from "@/components/CreationDetails/ImageInfoBar";
import { PromptSection } from "@/components/CreationDetails/PromptSection";
import { ResultHeader } from "@/components/CreationDetails/ResultHeader";
import { ResultImage } from "@/components/CreationDetails/ResultImage";
import { GradientBackground } from "@/components/GradientBackground";
import { SuccessModal } from "@/components/Modals/AproveModal";
import { LoadingModal } from "@/components/Modals/LoadingModal";
import { ConfirmModal } from "@/components/Modals/modal";
import { ShareModal } from "@/components/Modals/shareModal";
import { CREATIONS } from "@/constants/data";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";

export default function CreationDetailScreen() {
  const { t } = useLanguageStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const numericId = Number(id);

  // Find the item in CREATIONS data
  const item = CREATIONS.find((it) => it.id === numericId);

  const { spacing, safeAreaTop, safeAreaBottom, getResponsiveValue } =
    useResponsive();

  // Modal state
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState("");
  const [successTitle, setSuccessTitle] = useState("");
  const [successSubtitle, setSuccessSubtitle] = useState("");

  const handleShare = () => {
    // Show share modal instead of native share
    setShareModalVisible(true);
  };

  const handleRegenerate = () => {
    setLoadingTitle(t("creations.regenerating"));
    setLoadingModalVisible(true);

    // Simulate API call
    setTimeout(() => {
      setLoadingModalVisible(false);
      // Optional: Show success or just refresh
    }, 2000);
  };

  const handleDownload = () => {
    setLoadingTitle(t("creations.downloading"));
    setLoadingModalVisible(true);

    // Simulate download
    setTimeout(() => {
      setLoadingModalVisible(false);
      // Optional: Show success
    }, 2000);
  };

  const handleDelete = () => {
    // Show modal instead of Alert
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setDeleteModalVisible(false);
    // Simulate deletion delay or just navigate back
    router.back();
  };

  const copyPrompt = async () => {
    if (item?.prompt) {
      await Clipboard.setStringAsync(item.prompt);
      setSuccessTitle(t("common.copied"));
      setSuccessSubtitle("");
      setSuccessModalVisible(true);

      // Auto close after 1.5 seconds
      setTimeout(() => {
        setSuccessModalVisible(false);
      }, 1500);
    }
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

  // Determine what to show
  const itemPrompt = item?.prompt;
  const itemAIModel = item?.AIModel;
  const itemAspectRatio =
    item?.aspectRatio || `3:4 ${t("creations.aspectRatio")}`;

  const showInfo = !!itemAIModel;
  const showPrompt = !!itemPrompt;
  const isExpanded = !showInfo && !showPrompt;

  // Share data
  const shareUrl = `https://myapp.com/creation/${numericId}`;
  const shareText = item?.prompt
    ? `${t("common.appName")} creation: "${item.prompt}"`
    : `${t("common.appName")} creation!`;

  return (
    <GradientBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]}
        showsVerticalScrollIndicator={false}
      >
        <ResultHeader title={t("creations.myCreation")} />

        <View style={isExpanded ? { flex: 1, minHeight: 400 } : {}}>
          <ResultImage
            imageUri={item?.uri || ""}
            containerStyle={isExpanded ? { flex: 1 } : {}}
          />
        </View>

        {/* Conditionally render ImageInfoBar if AIModel exists */}
        {showInfo && itemAIModel && (
          <ImageInfoBar model={itemAIModel} aspectRatio={itemAspectRatio} />
        )}

        {/* Conditionally render PromptSection if prompt exists */}
        {showPrompt && itemPrompt && (
          <PromptSection prompt={itemPrompt} onCopy={copyPrompt} />
        )}

        <View style={isExpanded ? { marginTop: "auto" } : {}}>
          <ActionButtons
            onShare={handleShare}
            onRegenerate={handleRegenerate}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        </View>
      </ScrollView>

      {/* Share Modal */}
      <ShareModal
        isVisible={shareModalVisible}
        onClose={() => setShareModalVisible(false)}
        shareUrl={shareUrl}
        shareText={shareText}
        title={t("common.share")}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isVisible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        icon={
          <Delete
            color="#FFFFFF"
            width={getResponsiveValue(24, 26, 28, 30, 32)}
            height={getResponsiveValue(24, 26, 28, 30, 32)}
          />
        }
        onConfirm={confirmDelete}
        iconName="trash-2"
        iconColor="#FFFFFF"
        iconBackgroundColor="rgba(255, 255, 255, 0.05)"
        title={t("result.deleteTitle")}
        subtitle={t("result.deleteConfirm")}
        confirmText={t("common.delete")}
        cancelText={t("common.cancel")}
        isDestructive={true}
        showCloseButton={true}
      />

      {/* Loading Modal */}
      <LoadingModal
        isVisible={loadingModalVisible}
        title={loadingTitle}
        onModalHide={() => {}}
      />

      {/* Success Modal (used for Copy feedback) */}
      <SuccessModal
        isVisible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
        onContinue={() => setSuccessModalVisible(false)}
        title={successTitle}
        subtitle={successSubtitle}
        showCloseButton={false}
        buttonText={t("common.close")}
      />
    </GradientBackground>
  );
}
