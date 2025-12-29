import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { ModelSelector } from "@/components/Imagegen/ModelSelector";
import { OptionsBottomSheet } from "@/components/Imagegen/OptionsBottomSheet";
import { PromptInput } from "@/components/Imagegen/PromptInput";
import { GenerateButton } from "@/components/MultiImage/GenerateButton";
import { MultiImageUpload } from "@/components/MultiImage/MultiImageUpload";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function OutfitVariationsScreen() {
  const { t } = useLanguageStore();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [aspectRatio, setAspectRatio] = useState("2:3");
  const [resolution, setResolution] = useState("2K");
  const { spacing, safeAreaBottom } = useResponsive();

  const handleAddImage = async () => {
    if (images.length >= 10) {
      Alert.alert(
        t("common.maxImagesReached"),
        t("common.maxImagesDesc").replace("{max}", "10")
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleRemoveImage = (index: number) => {
    Alert.alert(
      t("common.removeImage"),
      t("common.removeImageConfirm"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.remove"),
          style: "destructive",
          onPress: () => {
            const newImages = images.filter((_, i) => i !== index);
            setImages(newImages);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleGenerate = () => {
    if (images.length === 0) {
      Alert.alert(t("common.noImages"), t("common.noImagesDesc"));
      return;
    }

    if (!prompt.trim()) {
      Alert.alert(t("common.noPrompt"), t("common.noPromptDesc"));
      return;
    }

    // Simulate generation
    router.push("/image-result");
  };

  const handleAIGenerate = () => {
    Alert.alert(t("common.aiGenerate"), t("common.aiGenerateDesc"));
  };

  const handleModelSelect = () => {
    Alert.alert(t("common.modelSelection"), t("common.modelSelectionDesc"));
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
          contentContainerStyle={{
            paddingBottom: safeAreaBottom,
          }}
        >
          <ImageGenHeader title={t("features.outfit.title")} />

          <ModelSelector
            modelName={t("models.nanoBananaPro")}
            modelIcon="https://via.placeholder.com/32"
            onPress={handleModelSelect}
          />

          <MultiImageUpload
            images={images}
            maxImages={10}
            onAddImage={handleAddImage}
            onRemoveImage={handleRemoveImage}
          />

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
