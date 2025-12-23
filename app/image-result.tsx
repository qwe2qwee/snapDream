import { GradientBackground } from "@/components/GradientBackground";
import { GeneratedImageCard } from "@/components/Imagegen/GeneratedImageCard";
import { ImageActionButtons } from "@/components/Imagegen/ImageActionButtons";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { PromptDisplay } from "@/components/Imagegen/PromptDisplay";

import React from "react";
import { Alert, ScrollView, Share, StyleSheet } from "react-native";

export default function ImageResultScreen() {
  const imageUri = "https://example.com/generated-image.jpg";
  const prompt =
    "Cute child hugging a fluffy fox in a snowy forest, soft lighting, winter atmosphere, cozy clothing, photorealistic, warm emotional moment.";

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this AI generated image!\n\n${prompt}`,
        url: imageUri,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share image");
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this image?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => console.log("Deleted"),
      },
    ]);
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

  return (
    <GradientBackground>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ImageGenHeader />
        <GeneratedImageCard imageUri={imageUri} />
        <PromptDisplay prompt={prompt} />
        <ImageActionButtons
          onShare={handleShare}
          onDelete={handleDelete}
          onRegenerate={handleRegenerate}
          onDownload={handleDownload}
        />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
