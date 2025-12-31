import { ClothSwapGenerateButton } from "@/components/ClothSwap/ClothSwapGenerateButton";
import { ImageUploadBox } from "@/components/ClothSwap/ImageUploadBox";
import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { LoadingModal } from "@/components/Modals/LoadingModal";
import { ConfirmModal } from "@/components/Modals/modal";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function ClothSwapScreen() {
  const { t } = useLanguageStore();
  const { spacing, safeAreaBottom } = useResponsive();
  const [loading, setLoading] = useState(false);
  const [modelImage, setModelImage] = useState<string | undefined>(undefined);
  const [clothImage, setClothImage] = useState<string | undefined>(undefined);

  // Modal states
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<"model" | "cloth" | null>(
    null
  );
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState({
    title: "",
    subtitle: "",
  });

  const showInfoModal = (title: string, subtitle: string) => {
    setInfoModalContent({ title, subtitle });
    setInfoModalVisible(true);
  };

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
      showInfoModal(
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
    setDeleteTarget("model");
    setDeleteModalVisible(true);
  };

  const handleRemoveClothImage = () => {
    setDeleteTarget("cloth");
    setDeleteModalVisible(true);
  };

  const confirmRemoveImage = () => {
    if (deleteTarget === "model") {
      setModelImage(undefined);
    } else if (deleteTarget === "cloth") {
      setClothImage(undefined);
    }
    setDeleteModalVisible(false);
    setDeleteTarget(null);
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isVisible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={confirmRemoveImage}
        title={t("common.removeImage")}
        subtitle={t("common.removeImageConfirm")}
        confirmText={t("common.remove")}
        cancelText={t("common.cancel")}
        iconName="trash-2"
        isDestructive
      />

      {/* Info/Error Modal */}
      <ConfirmModal
        isVisible={infoModalVisible}
        onClose={() => setInfoModalVisible(false)}
        onConfirm={() => setInfoModalVisible(false)}
        title={infoModalContent.title}
        subtitle={infoModalContent.subtitle}
        confirmText={t("common.ok")}
        showCloseButton={false}
        iconName="info"
      />
    </GradientBackground>
  );
}
