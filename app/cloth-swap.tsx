import { ClothSwapGenerateButton } from "@/components/ClothSwap/ClothSwapGenerateButton";
import { ImageUploadBox } from "@/components/ClothSwap/ImageUploadBox";
import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { LoadingModal } from "@/components/Modals/LoadingModal";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function ClothSwapScreen() {
  const { t } = useLanguageStore();
  const { spacing, safeAreaBottom, getResponsiveValue } = useResponsive();
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
    Alert.alert(t("common.removeImage"), t("common.removeImageConfirm"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.remove"),
        style: "destructive",
        onPress: () => setModelImage(undefined),
      },
    ]);
  };

  const handleRemoveClothImage = () => {
    Alert.alert(t("common.removeImage"), t("common.removeImageConfirm"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.remove"),
        style: "destructive",
        onPress: () => setClothImage(undefined),
      },
    ]);
  };

  const canGenerate = modelImage && clothImage;

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
        <ImageGenHeader title={t("clothSwap.title")} />

        {/* Model Image Upload */}
        <ImageUploadBox
          label={t("clothSwap.modelImage")}
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
      </KeyboardAwareScrollView>

      {/* Generate Button container with absolute positioning to match Hairstyle */}
      <View style={styles.buttonContainer}>
        <ClothSwapGenerateButton
          onPress={handleGenerate}
          credits={10}
          disabled={!canGenerate}
        />
      </View>

      <LoadingModal isVisible={loading} />
    </GradientBackground>
  );
}
