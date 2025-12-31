import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { ModelSelector } from "@/components/Imagegen/ModelSelector";
import { OptionsBottomSheet } from "@/components/Imagegen/OptionsBottomSheet";
import { PromptInput } from "@/components/Imagegen/PromptInput";
import { ConfirmModal } from "@/components/Modals/modal";
import { GenerateButton } from "@/components/MultiImage/GenerateButton";
import { MultiImageUpload } from "@/components/MultiImage/MultiImageUpload";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

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

  // Modal States
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [imageToDeleteIndex, setImageToDeleteIndex] = useState<number | null>(
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

  const handleAddImage = async () => {
    if (images.length >= 10) {
      showInfoModal(
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
    setImageToDeleteIndex(index);
    setDeleteModalVisible(true);
  };

  const confirmRemoveImage = () => {
    if (imageToDeleteIndex !== null) {
      const newImages = images.filter((_, i) => i !== imageToDeleteIndex);
      setImages(newImages);
      setDeleteModalVisible(false);
      setImageToDeleteIndex(null);
    }
  };

  const handleGenerate = () => {
    if (images.length === 0) {
      showInfoModal(t("common.noImages"), t("common.noImagesDesc"));
      return;
    }

    if (!prompt.trim()) {
      showInfoModal(t("common.noPrompt"), t("common.noPromptDesc"));
      return;
    }

    // Simulate generation
    router.push("/image-result");
  };

  const handleAIGenerate = () => {
    showInfoModal(t("common.aiGenerate"), t("common.aiGenerateDesc"));
  };

  const handleModelSelect = () => {
    showInfoModal(t("common.modelSelection"), t("common.modelSelectionDesc"));
  };
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
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: spacing.xl * 2 + safeAreaBottom + 80,
          },
        ]}
        bottomOffset={Platform.OS === "ios" ? 40 : 0}
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
