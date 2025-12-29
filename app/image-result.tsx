import Delete from "@/assets/icons/Dele.svg";
import { ActionButtons } from "@/components/CreationDetails/ActionButtons";
import { GradientBackground } from "@/components/GradientBackground";
import { GeneratedImageCard } from "@/components/Imagegen/GeneratedImageCard";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { PromptDisplay } from "@/components/Imagegen/PromptDisplay";
import { SuccessModal } from "@/components/Modals/AproveModal";
import { LoadingModal } from "@/components/Modals/LoadingModal";
import { ConfirmModal } from "@/components/Modals/modal";
import { ShareModal } from "@/components/Modals/shareModal";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { useRouter } from "expo-router";

import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function ImageResultScreen() {
  const router = useRouter();
  const { getResponsiveValue } = useResponsive();
  const [isShareVisible, setShareVisible] = React.useState(false);
  const [isSuccessVisible, setSuccessVisible] = React.useState(false);
  const [isDeleteVisible, setDeleteVisible] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState({
    title: "",
    subtitle: "",
  });

  const { t } = useLanguageStore();

  // Mock data - in real app would come from generation state/context/params
  const uri =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800";

  const prompt =
    "Cute child hugging a fluffy fox in a snowy forest, soft lighting, winter atmosphere, cozy clothing, photorealistic, warm emotional moment.";

  const handleShare = () => {
    setShareVisible(true);
  };

  const handleDelete = () => {
    setDeleteVisible(true);
  };

  const confirmDelete = () => {
    setDeleteVisible(false);
    router.back();
  };

  const handleRegenerate = () => {
    setLoading(true);
    // Simulate generation
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleDownload = () => {
    setLoading(true);
    // Simulate download
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage({
        title: t("result.saved"),
        subtitle: t("result.imageSavedDesc"),
      });
      setSuccessVisible(true);
    }, 1500);
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ImageGenHeader title={t("result.imageResult")} />

        <GeneratedImageCard imageUri={uri} />

        <PromptDisplay prompt={prompt} />
        <ActionButtons
          onShare={handleShare}
          onDelete={handleDelete}
          onRegenerate={handleRegenerate}
          onDownload={handleDownload}
        />

        <ShareModal
          isVisible={isShareVisible}
          onClose={() => setShareVisible(false)}
          shareUrl={uri}
          shareText={t("result.shareText")
            .replace("{type}", "image")
            .replace("{prompt}", prompt)}
        />

        <SuccessModal
          isVisible={isSuccessVisible}
          onClose={() => setSuccessVisible(false)}
          onContinue={() => setSuccessVisible(false)}
          title={successMessage.title}
          subtitle={successMessage.subtitle}
          buttonText={t("result.continue")}
        />

        <ConfirmModal
          isVisible={isDeleteVisible}
          onClose={() => setDeleteVisible(false)}
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
          showCloseButton={true}
        />

        <LoadingModal isVisible={isLoading} />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
