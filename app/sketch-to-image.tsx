import { ClothSwapGenerateButton } from "@/components/ClothSwap/ClothSwapGenerateButton";
import { ImageUploadBox } from "@/components/ClothSwap/ImageUploadBox";
import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { useResponsive } from "@/hooks/useResponsive";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function SketchToImageScreen() {
  const {
    spacing,
    typography,
    getBorderRadius,
    getResponsiveValue,
    safeAreaBottom,
  } = useResponsive();

  const [sketchImage, setSketchImage] = useState<string | undefined>(undefined);
  const [prompt, setPrompt] = useState("");

  const inputHeight = getResponsiveValue(80, 90, 100, 110, 120);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSketchImage(result.assets[0].uri);
    }
  };

  const handleRemoveImage = () => {
    setSketchImage(undefined);
  };

  const handleGenerate = () => {
    if (!sketchImage) return;
    router.push("/image-result");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    buttonContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "transparent",
      paddingHorizontal: spacing.lg,
    },
    sectionTitle: {
      fontSize: typography.body,
      fontWeight: "600",
      color: "#FFFFFF",
      marginBottom: spacing.sm,
      marginTop: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    inputContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: getBorderRadius("large"),
      padding: spacing.md,
      height: inputHeight,
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
      marginHorizontal: spacing.lg,
    },
    input: {
      flex: 1,
      color: "#FFFFFF",
      fontSize: typography.body,
      textAlignVertical: "top",
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
        <ImageGenHeader title="Sketch to Image" />

        {/* Sketch Upload */}
        <Text style={styles.sectionTitle}>1. Upload Sketch</Text>
        <ImageUploadBox
          label="Sketch Image"
          optional={false}
          type="model"
          selectedImage={sketchImage}
          onUpload={pickImage}
          onRemove={handleRemoveImage}
        />

        {/* Prompt Input */}
        <Text style={styles.sectionTitle}>2. Description (Optional)</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Describe the desired outcome..."
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            multiline
            value={prompt}
            onChangeText={setPrompt}
          />
        </View>
      </KeyboardAwareScrollView>

      {/* Generate Button container with absolute positioning to match Hairstyle */}
      <View style={styles.buttonContainer}>
        <ClothSwapGenerateButton
          onPress={handleGenerate}
          credits={10}
          disabled={!sketchImage}
        />
      </View>
    </GradientBackground>
  );
}
