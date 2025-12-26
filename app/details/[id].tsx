import { ClothSwapGenerateButton } from "@/components/ClothSwap/ClothSwapGenerateButton";
import { ClothSwapHeader } from "@/components/ClothSwap/ClothSwapHeader";
import { GradientBackground } from "@/components/GradientBackground";
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
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function GenericEffectScreen() {
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
      paddingBottom: safeAreaBottom + 100,
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
  });

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <ClothSwapHeader title="Image Effects" />

            <EffectSelector
              title={currentEffect?.title || "Unknown Effect"}
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
              <UploadView onUpload={handleImageUpload} />
            )}

            {Number(id) === 10 && (
              <View style={{ marginTop: spacing.sm }}>
                <PromptInput
                  value={prompt}
                  onChangeText={setPrompt}
                  onAIGenerate={() => console.log("AI Generate prompt")}
                />
              </View>
            )}
          </ScrollView>

          <ClothSwapGenerateButton
            onPress={handleGenerate}
            credits={10}
            disabled={!selectedImage || loading}
          />
        </View>

        <LoadingModal isVisible={loading} />

        <EffectsModal
          isVisible={showEffectsModal}
          onClose={() => setShowEffectsModal(false)}
          effects={imageEffects}
          onSelectEffect={handleEffectChange}
          currentEffectId={Number(id)}
        />
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
