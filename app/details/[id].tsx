import { ClothSwapGenerateButton } from "@/components/ClothSwap/ClothSwapGenerateButton";
import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { PromptInput } from "@/components/Imagegen/PromptInput";
import { LoadingModal } from "@/components/Modals/LoadingModal";
import { EffectSelector } from "@/components/Shared/EffectSelector";
import { EffectsModal } from "@/components/Shared/EffectsModal";
import { UploadView } from "@/components/Shared/UploadView";
import {
  clothesSwapEffect,
  hairStyleEffect,
  imageEffects,
  modelConsistencyEffect,
  outfitVariationsEffect,
  tryOnEffects,
  videoEffects,
} from "@/constants/data";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function GenericEffectScreen() {
  const { t } = useLanguageStore();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { spacing, getBorderRadius, getResponsiveValue, safeAreaBottom } =
    useResponsive();

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEffectsModal, setShowEffectsModal] = useState(false);

  // Find the current effect logic
  const currentEffect = useMemo(() => {
    const allEffects = [
      ...imageEffects,
      ...videoEffects,
      ...tryOnEffects,
      clothesSwapEffect,
      outfitVariationsEffect,
      modelConsistencyEffect,
      hairStyleEffect,
    ];
    return allEffects.find((e) => e.id === Number(id));
  }, [id]);

  const isImageToVideo = Number(id) === 10;

  const headerTitle = isImageToVideo
    ? t("features.imageToVideo.title")
    : currentEffect?.title || t("home.imageEffects");

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(undefined);
  };

  const handleGenerate = () => {
    if (!selectedImage) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Determine if it's a video effect
      const isVideoEffect = videoEffects.some((e) => e.id === Number(id));

      if (isVideoEffect) {
        router.push("/video-result");
      } else {
        router.push("/image-result");
      }
    }, 2000);
  };

  const handleEffectChange = (newId: number) => {
    router.replace(`/details/${newId}`);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    imagePreviewContainer: {
      marginHorizontal: spacing.md,
      borderRadius: getBorderRadius("large"),
      overflow: "hidden",
      position: "relative",
      height: getResponsiveValue(350, 400, 450, 500, 550), // Match upload height
      marginBottom: spacing.lg,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    previewImage: {
      width: "100%",
      height: "100%",
    },
    closeButton: {
      position: "absolute",
      top: spacing.md,
      right: spacing.md,
      backgroundColor: "rgba(0,0,0,0.6)",
      borderRadius: 20,
      padding: 6,
      zIndex: 10,
    },
    buttonContainer: {
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: spacing.xl * 2 + safeAreaBottom + 80,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        bottomOffset={Platform.OS === "ios" ? 40 : 0}
        style={styles.container}
      >
        <ImageGenHeader title={headerTitle} />

        <EffectSelector
          title={headerTitle}
          icon={currentEffect?.image}
          onPress={() => setShowEffectsModal(true)}
        />

        {selectedImage ? (
          <View style={styles.imagePreviewContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.previewImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleRemoveImage}
            >
              <Feather name="x" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <UploadView
            onUpload={handleImageUpload}
            label={
              isImageToVideo ? t("features.imageToVideo.upload") : undefined
            }
          />
        )}

        {isImageToVideo && (
          <View style={{ marginTop: spacing.sm }}>
            <PromptInput
              value={prompt}
              onChangeText={setPrompt}
              onAIGenerate={() => console.log("AI Generate prompt")}
              label={t("features.imageToVideo.promptLabel")}
              placeholder={t("features.imageToVideo.promptPlaceholder")}
            />
          </View>
        )}
      </KeyboardAwareScrollView>

      <View style={styles.buttonContainer}>
        <ClothSwapGenerateButton
          onPress={handleGenerate}
          credits={10}
          disabled={!selectedImage || loading}
        />
      </View>

      <LoadingModal isVisible={loading} title={t("common.loading")} />

      <EffectsModal
        isVisible={showEffectsModal}
        onClose={() => setShowEffectsModal(false)}
        effects={imageEffects}
        onSelectEffect={handleEffectChange}
        currentEffectId={Number(id)}
      />
    </GradientBackground>
  );
}
