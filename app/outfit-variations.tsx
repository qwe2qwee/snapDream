import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { ModelSelector } from "@/components/Imagegen/ModelSelector";
import { OptionsBottomSheet } from "@/components/Imagegen/OptionsBottomSheet";
import { PromptInput } from "@/components/Imagegen/PromptInput";
import { GenerateButton } from "@/components/MultiImage/GenerateButton";
import { MultiImageUpload } from "@/components/MultiImage/MultiImageUpload";
import { useResponsive } from "@/hooks/useResponsive";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function ImageGenScreen() {
  const [images, setImages] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [aspectRatio, setAspectRatio] = useState("2:3");
  const [resolution, setResolution] = useState("2K");
  const { spacing, safeAreaBottom } = useResponsive();

  const handleAddImage = async () => {
    if (images.length >= 10) {
      Alert.alert("Maximum Reached", "You can upload up to 10 images only");
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
    Alert.alert("Remove Image", "Are you sure you want to remove this image?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          const newImages = images.filter((_, i) => i !== index);
          setImages(newImages);
        },
      },
    ]);
  };

  const handleGenerate = () => {
    if (images.length === 0) {
      Alert.alert("No Images", "Please upload at least one image");
      return;
    }

    if (!prompt.trim()) {
      Alert.alert("No Prompt", "Please enter a prompt");
      return;
    }

    console.log("Generate with:", {
      images,
      prompt,
      numberOfImages,
      aspectRatio,
      resolution,
    });

    Alert.alert("Generate", "Starting image generation...");
  };

  const handleAIGenerate = () => {
    Alert.alert("AI Generate", "Generating prompt with AI...");
    // Implement AI prompt generation
  };

  const handleModelSelect = () => {
    Alert.alert("Model Selection", "Select AI model");
    // Navigate to model selection screen
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
          <ImageGenHeader />

          <ModelSelector
            modelName="Nano Banana Pro"
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
