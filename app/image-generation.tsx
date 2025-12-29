import { GradientBackground } from "@/components/GradientBackground";
import { GenerateButton } from "@/components/Imagegen/GenerateButton";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { ModelSelector } from "@/components/Imagegen/ModelSelector";
import { OptionsBottomSheet } from "@/components/Imagegen/OptionsBottomSheet";
import { PromptInput } from "@/components/Imagegen/PromptInput";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { router } from "expo-router";
import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function ImageGenScreen() {
  const { currentLanguage, t } = useLanguageStore();
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

  const { spacing, safeAreaBottom, getResponsiveValue } = useResponsive();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    bottomContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "transparent",
    },
  });

  return (
    <GradientBackground>
      <KeyboardAwareScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: spacing.xl * 2 + safeAreaBottom + 80,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        bottomOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ImageGenHeader title={t("imageGen.title")} />

        <ModelSelector
          modelName={t("models.nanoBananaPro")}
          modelIcon="https://example.com/model-icon.png"
          onPress={handleModelSelect}
        />

        <PromptInput
          value={prompt}
          onChangeText={setPrompt}
          onAIGenerate={handleAIGenerate}
          label={t("imageGen.prompt")}
          placeholder={t("imageGen.promptPlaceholder")}
        />
        <View style={{ height: spacing.xl }} />
      </KeyboardAwareScrollView>

      <View style={styles.bottomContainer}>
        <GenerateButton
          onPress={handleGenerate}
          credits={10}
          onOptionsPress={() => setShowOptions(true)}
        />
      </View>

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
    </GradientBackground>
  );
}
