import { ClothSwapGenerateButton } from "@/components/ClothSwap/ClothSwapGenerateButton";
import { ClothSwapHeader } from "@/components/ClothSwap/ClothSwapHeader";
import { ImageUploadBox } from "@/components/ClothSwap/ImageUploadBox";
import { GradientBackground } from "@/components/GradientBackground";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function ClothSwapScreen() {
  const [modelImage, setModelImage] = useState<string | undefined>(undefined);
  const [clothImage, setClothImage] = useState<string | undefined>(undefined);

  const pickImage = async (type: "model" | "cloth") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === "model" ? [3, 4] : [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === "model") {
        setModelImage(result.assets[0].uri);
      } else {
        setClothImage(result.assets[0].uri);
      }
    }
  };

  const handleGenerate = () => {
    if (!modelImage || !clothImage) {
      Alert.alert(
        "Missing Images",
        "Please upload both model and cloth images"
      );
      return;
    }

    Alert.alert("Generate", "Starting cloth swap generation...");
    // Implement generation logic here
  };

  const handleRemoveModelImage = () => {
    Alert.alert("Remove Image", "Are you sure you want to remove this image?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => setModelImage(undefined),
      },
    ]);
  };

  const handleRemoveClothImage = () => {
    Alert.alert("Remove Image", "Are you sure you want to remove this image?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => setClothImage(undefined),
      },
    ]);
  };

  const canGenerate = modelImage && clothImage;

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ClothSwapHeader />

          {/* Model Image Upload */}
          <ImageUploadBox
            label="Model Image"
            optional={true}
            type="model"
            selectedImage={modelImage}
            onUpload={() => pickImage("model")}
            onRemove={handleRemoveModelImage}
          />

          {/* Cloth Image Upload */}
          <ImageUploadBox
            label="Cloth Image"
            optional={true}
            type="cloth"
            selectedImage={clothImage}
            onUpload={() => pickImage("cloth")}
            onRemove={handleRemoveClothImage}
          />
        </ScrollView>

        {/* Generate Button */}
        <ClothSwapGenerateButton
          onPress={handleGenerate}
          credits={10}
          disabled={!canGenerate}
        />
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
});
