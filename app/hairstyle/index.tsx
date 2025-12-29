import { ImageUploadBox } from "@/components/ClothSwap/ImageUploadBox";
import { GradientBackground } from "@/components/GradientBackground";
import { BottomAction } from "@/components/HairStyle/BottomAction";
import { ColorSelector } from "@/components/HairStyle/ColorSelector";
import { HairStyleHeader } from "@/components/HairStyle/HairStyleHeader";
import {
  HairColorModal,
  HairStyleModal,
} from "@/components/HairStyle/HairStyleModal";
import { StyleSelector } from "@/components/HairStyle/StyleSelector";
import { LoadingModal } from "@/components/Modals/LoadingModal";

import {
  ALL_HAIR_COLORS,
  HAIR_STYLES,
  HairColor,
  HairStyle,
} from "@/constants/hairStyleData";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { useSafeNavigate } from "@/utils/useSafeNavigate";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function HairStyleScreen() {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const { spacing, safeAreaBottom } = useResponsive();
  const { push } = useSafeNavigate();

  // Image state
  const [userImage, setUserImage] = useState<string | undefined>(undefined);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Selection states
  const [selectedStyle, setSelectedStyle] = useState<HairStyle>(HAIR_STYLES[0]);
  const [selectedColor, setSelectedColor] = useState<HairColor>(
    ALL_HAIR_COLORS[18]
  ); // Gray
  const [imageCount, setImageCount] = useState(1);

  // Modal states
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);

  // Image picker
  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(t("common.error"), t("hairstyle.permissionsError"), [
          { text: t("common.ok") },
        ]);
        return;
      }

      setIsUploadingImage(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUserImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(t("common.error"), t("clothSwap.uploadError"));
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    Alert.alert(t("common.removeImage"), t("common.removeImageConfirm"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.remove"),
        style: "destructive",
        onPress: () => setUserImage(undefined),
      },
    ]);
  };

  // Generate hairstyle
  const handleGenerate = async () => {
    if (!userImage) {
      Alert.alert(t("common.error"), t("clothSwap.uploadImage"));
      return;
    }

    try {
      setIsGenerating(true);

      // TODO: Replace with actual API call
      // const result = await generateHairstyle({
      //   userImage,
      //   style: selectedStyle.id,
      //   color: selectedColor.id,
      //   count: imageCount,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setIsGenerating(false);

      // Navigate to result screen
      push("/hairstyle/result");
    } catch (error) {
      setIsGenerating(false);
      console.error("Generation error:", error);
      Alert.alert(t("common.error"), t("hairstyle.generateError"), [
        { text: t("common.ok") },
      ]);
    }
  };

  const canGenerate = Boolean(userImage && !isGenerating);

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
        {/* Header */}
        <HairStyleHeader title={t("hairstyle.title")} />

        {/* Hair Style Selector */}
        <StyleSelector
          label={t("hairstyle.selectStyle")}
          selectedStyle={{
            id: selectedStyle.id,
            name: selectedStyle.name,
            image: selectedStyle.image,
          }}
          onPress={() => setShowStyleModal(true)}
        />

        {/* Hair Color Selector */}
        <ColorSelector
          label={t("hairstyle.selectColor")}
          selectedColor={{
            id: selectedColor.id,
            name: selectedColor.name,
            color: selectedColor.color,
          }}
          onPress={() => setShowColorModal(true)}
        />

        {/* Image Upload */}
        <ImageUploadBox
          label={t("onboarding.slide1Title")} // Or create a new key
          optional={false}
          type="model"
          selectedImage={userImage}
          onUpload={pickImage}
          onRemove={userImage ? handleRemoveImage : undefined}
          isLoading={isUploadingImage}
        />
      </KeyboardAwareScrollView>

      {/* Bottom Action Button */}
      <View
        style={[
          styles.buttonContainer,
          {
            paddingHorizontal: spacing.lg,
          },
        ]}
      >
        <BottomAction
          onGenerate={handleGenerate}
          credits={10 * imageCount}
          disabled={!canGenerate}
          imageCount={imageCount}
          onImageCountChange={setImageCount}
        />
      </View>

      {/* Hair Style Selection Modal */}
      <HairStyleModal
        isVisible={showStyleModal}
        onClose={() => setShowStyleModal(false)}
        selectedStyle={selectedStyle}
        onSelectStyle={setSelectedStyle}
      />

      {/* Hair Color Selection Modal */}
      <HairColorModal
        isVisible={showColorModal}
        onClose={() => setShowColorModal(false)}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
      />

      {/* Loading Modal */}
      <LoadingModal
        isVisible={isGenerating}
        title={t("hairstyle.processing")}
        subtitle={t("hairstyle.processingDesc")
          .replace("{count}", imageCount.toString())
          .replace(
            "{style}",
            t(`hairstyle.items.${selectedStyle.id}`) || selectedStyle.name
          )
          .replace(
            "{color}",
            t(`hairstyle.items.${selectedColor.id}`) || selectedColor.name
          )}
      />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
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
  },
});
