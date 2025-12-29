import Delete from "@/assets/icons/Dele.svg";
import { ActionButtons } from "@/components/CreationDetails/ActionButtons";
import { GradientBackground } from "@/components/GradientBackground";
import { GeneratedImageCard } from "@/components/Imagegen/GeneratedImageCard";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { SuccessModal } from "@/components/Modals/AproveModal";
import { LoadingModal } from "@/components/Modals/LoadingModal";
import { ConfirmModal } from "@/components/Modals/modal";
import { ShareModal } from "@/components/Modals/shareModal";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function HairStyleResultScreen() {
  const { t } = useLanguageStore();
  const router = useRouter();
  const { getResponsiveValue, safeAreaBottom, spacing } = useResponsive();
  const [isShareVisible, setShareVisible] = React.useState(false);
  const [isSuccessVisible, setSuccessVisible] = React.useState(false);
  const [isDeleteVisible, setDeleteVisible] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  // Mock data - in real app would come from generation state/context/params
  const uri = "https://example.com/generated-image.jpg";

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
    // Just go back for now to regenerate
    router.back();
  };

  const handleDownload = () => {
    setLoading(true);
    // Simulate download
    setTimeout(() => {
      setLoading(false);
      setSuccessVisible(true);
    }, 1500);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: safeAreaBottom + spacing.xl,
    },
  });

  return (
    <GradientBackground>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ImageGenHeader title={t("hairstyle.resultTitle")} />

        <GeneratedImageCard imageUri={uri} />

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
          shareText={t("hairstyle.checkOut")}
        />

        <SuccessModal
          isVisible={isSuccessVisible}
          onClose={() => setSuccessVisible(false)}
          onContinue={() => setSuccessVisible(false)}
          title={t("result.saved")}
          subtitle={t("result.imageSavedDesc")}
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
