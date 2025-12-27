import { ClothSwapGenerateButton } from "@/components/ClothSwap/ClothSwapGenerateButton";
import { ImageUploadBox } from "@/components/ClothSwap/ImageUploadBox";
import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { LoadingModal } from "@/components/Modals/LoadingModal";
import useLanguageStore from "@/store/useLanguageStore";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function ClothSwapScreen() {
  const { t } = useLanguageStore();
  const [loading, setLoading] = useState(false);
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

  const handleGenerate = async () => {
    if (!modelImage || !clothImage) {
      Alert.alert(
        t("common.error"),
        t("clothSwap.uploadImage") // Or a specific error key
      );
      return;
    }

    setLoading(true);
    // Implement generation logic here
    setTimeout(() => {
      setLoading(false);
      router.push("/image-result");
    }, 2000);
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
          <ImageGenHeader title={t("clothSwap.title")} />

          {/* Model Image Upload */}
          <ImageUploadBox
            label={t("auth.email")} // Need better key for "Model Image"
            optional={true}
            type="model"
            selectedImage={modelImage}
            onUpload={() => pickImage("model")}
            onRemove={handleRemoveModelImage}
          />

          {/* Cloth Image Upload */}
          <ImageUploadBox
            label={t("clothSwap.selectCloth")}
            optional={true}
            type="cloth"
            selectedImage={clothImage}
            onUpload={() => pickImage("cloth")}
            onRemove={handleRemoveClothImage}
          />
          {/* Generate Button */}
          <ClothSwapGenerateButton
            onPress={handleGenerate}
            credits={10}
            disabled={!canGenerate}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingModal isVisible={loading} />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 0,
  },
});
