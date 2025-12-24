import { ActionButtons } from "@/components/CreationDetails/ActionButtons";
import { GradientBackground } from "@/components/GradientBackground";
import { GeneratedImageCard } from "@/components/Imagegen/GeneratedImageCard";
import { GeneratedVideoCard } from "@/components/Imagegen/GeneratedVideoCard";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { PromptDisplay } from "@/components/Imagegen/PromptDisplay";
import { SuccessModal } from "@/components/Modals/AproveModal";
import { LoadingModal } from "@/components/Modals/LoadingModal";
import { ShareModal } from "@/components/Modals/shareModal";
import { useLocalSearchParams } from "expo-router";

import React from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";

export default function ResultScreen() {
  const { type } = useLocalSearchParams<{ type: "image" | "video" }>();
  const [isShareVisible, setShareVisible] = React.useState(false);
  const [isSuccessVisible, setSuccessVisible] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState({
    title: "",
    subtitle: "",
  });
  // Mock data - in real app would come from generation state/context/params
  const uri =
    type === "video"
      ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800" // Video thumbnail
      : "https://example.com/generated-image.jpg";

  const prompt =
    "Cute child hugging a fluffy fox in a snowy forest, soft lighting, winter atmosphere, cozy clothing, photorealistic, warm emotional moment.";

  const handleShare = () => {
    setShareVisible(true);
  };

  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => console.log("Deleted"),
      },
    ]);
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
        title: "Saved!",
        subtitle: `${
          type === "video" ? "Video" : "Image"
        } has been saved to your gallery.`,
      });
      setSuccessVisible(true);
    }, 1500);
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ImageGenHeader
          title={type === "video" ? "Video Result" : "Image Result"}
        />

        {type === "video" ? (
          <GeneratedVideoCard videoUri={uri} />
        ) : (
          <GeneratedImageCard imageUri={uri} />
        )}

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
          shareText={`Check out this AI generated ${
            type || "image"
          }!\n\n${prompt}`}
        />

        <SuccessModal
          isVisible={isSuccessVisible}
          onClose={() => setSuccessVisible(false)}
          onContinue={() => setSuccessVisible(false)}
          title={successMessage.title}
          subtitle={successMessage.subtitle}
          buttonText="Continue"
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
