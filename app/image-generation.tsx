import { GradientBackground } from "@/components/GradientBackground";
import { GenerateButton } from "@/components/Imagegen/GenerateButton";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { ModelSelector } from "@/components/Imagegen/ModelSelector";
import { OptionsBottomSheet } from "@/components/Imagegen/OptionsBottomSheet";
import { PromptInput } from "@/components/Imagegen/PromptInput";
import { ReferenceImageUploader } from "@/components/Imagegen/ReferenceImageUploader";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function ImageGenScreen() {
  const [prompt, setPrompt] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [aspectRatio, setAspectRatio] = useState("2:3");
  const [resolution, setResolution] = useState("2K");

  const handleGenerate = () => {
    console.log("Generate with:", {
      prompt,
      numberOfImages,
      aspectRatio,
      resolution,
    });
    router.push("/image-result");
  };

  const handleAIGenerate = () => {
    console.log("AI Generate prompt");
  };

  const handleModelSelect = () => {
    console.log("Select model");
  };

  const handleImageUpload = () => {
    console.log("Upload reference image");
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ImageGenHeader />

          <ModelSelector
            modelName="Nano Banana Pro"
            modelIcon="https://example.com/model-icon.png"
            onPress={handleModelSelect}
          />

          <ReferenceImageUploader onUpload={handleImageUpload} />

          <PromptInput
            value={prompt}
            onChangeText={setPrompt}
            onAIGenerate={handleAIGenerate}
          />
        </ScrollView>

        <GenerateButton
          onPress={handleGenerate}
          credits={10}
          onOptionsPress={() => setShowOptions(true)}
        />

        <OptionsBottomSheet
          isVisible={showOptions}
          onClose={() => setShowOptions(false)}
          numberOfImages={numberOfImages}
          onNumberOfImagesChange={setNumberOfImages}
          aspectRatio={aspectRatio}
          onAspectRatioChange={setAspectRatio}
          resolution={resolution}
          onResolutionChange={setResolution}
        />
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
