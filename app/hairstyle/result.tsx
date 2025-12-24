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
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function HairStyleResultScreen() {
  const router = useRouter();
  const { getResponsiveValue } = useResponsive();
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

  return (
    <GradientBackground>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ImageGenHeader title="Hair Style Result" />

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
          shareText="Check out my new hairstyle!"
        />

        <SuccessModal
          isVisible={isSuccessVisible}
          onClose={() => setSuccessVisible(false)}
          onContinue={() => setSuccessVisible(false)}
          title="Saved!"
          subtitle="Image has been saved to your gallery."
          buttonText="Continue"
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
          title="Delete Creation"
          subtitle="Are you sure you want to delete this creation? This action cannot be undone."
          confirmText="Delete"
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
