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

export default function VideoGenScreen() {
  const [prompt, setPrompt] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  // Video specific state
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [resolution, setResolution] = useState("1080p");
  const [duration, setDuration] = useState("5s");

  const handleGenerate = () => {
    console.log("Generate Video with:", {
      prompt,
      aspectRatio,
      resolution,
      duration,
    });
    router.push("/video-result");
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
          <ImageGenHeader title="Video Gen" />

          <ModelSelector
            modelName="Sora Turbo"
            modelIcon="https://example.com/sora-icon.png" // Placeholder
            onPress={handleModelSelect}
          />

          <ReferenceImageUploader onUpload={handleImageUpload} />

          <PromptInput
            value={prompt}
            onChangeText={setPrompt}
            onAIGenerate={handleAIGenerate}
          />
          <GenerateButton
            onPress={handleGenerate}
            credits={20} // Video might cost more?
            onOptionsPress={() => setShowOptions(true)}
          />
        </ScrollView>

        <OptionsBottomSheet
          isVisible={showOptions}
          onClose={() => setShowOptions(false)}
          type="video"
          // Image props (ignored/defaults)
          numberOfImages={1}
          onNumberOfImagesChange={() => {}}
          // Shared/Video props
          aspectRatio={aspectRatio}
          onAspectRatioChange={setAspectRatio}
          resolution={resolution}
          onResolutionChange={setResolution}
          duration={duration}
          onDurationChange={setDuration}
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
