import { ClothSwapGenerateButton } from "@/components/ClothSwap/ClothSwapGenerateButton";
import { ClothSwapHeader } from "@/components/ClothSwap/ClothSwapHeader";
import { GradientBackground } from "@/components/GradientBackground";
import { UpscaleOptions } from "@/components/ImageUpscale/UpscaleOptions";
import { UpscaleUploadView } from "@/components/ImageUpscale/UpscaleUploadView";
import { LoadingModal } from "@/components/Modals/LoadingModal";
import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function ImageUpscaleScreen() {
  const router = useRouter();
  const { spacing, getBorderRadius, getResponsiveValue, safeAreaBottom } =
    useResponsive();

  const [modelImage, setModelImage] = useState<string | undefined>(undefined);
  const [enhanceModel, setEnhanceModel] = useState<"Classic" | "Pro" | "Flash">(
    "Classic"
  );
  const [upscaleFactor, setUpscaleFactor] = useState<"2x" | "4x">("2x");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setModelImage(result.assets[0].uri);
    }
  };

  const handleRemoveImage = () => {
    setModelImage(undefined);
  };

  const handleGenerate = () => {
    if (!modelImage) return;

    setLoading(true);
    // Mock generation delay
    setTimeout(() => {
      setLoading(false);
      // Navigate to result logic here - reusable result page? or new one?
      // Using existing image-result for now as placeholder or creating a specific one if needed.
      // The mock shows just the upscale page. Assuming it navigates to result.
      router.push("/image-result");
    }, 2000);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: safeAreaBottom + 100, // Space for bottom button
    },
    imagePreviewContainer: {
      marginHorizontal: spacing.md,
      borderRadius: getBorderRadius("large"),
      overflow: "hidden",
      position: "relative",
      height: getResponsiveValue(350, 400, 450, 500, 550), // Match upload height
      marginBottom: spacing.lg,
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
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ClothSwapHeader title="Image Upscale" />

          {modelImage ? (
            // Image Preview State
            <View>
              <View style={styles.imagePreviewContainer}>
                <Image
                  source={{ uri: modelImage }}
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

              <UpscaleOptions
                enhanceModel={enhanceModel}
                setEnhanceModel={setEnhanceModel}
                upscaleFactor={upscaleFactor}
                setUpscaleFactor={setUpscaleFactor}
              />
            </View>
          ) : (
            // Upload State
            <UpscaleUploadView onUpload={pickImage} />
          )}
        </ScrollView>

        {/* Floating Generate Button Area */}
        {modelImage && (
          <ClothSwapGenerateButton
            onPress={handleGenerate}
            credits={10}
            disabled={loading}
          />
        )}
      </View>
      <LoadingModal isVisible={loading} />
    </GradientBackground>
  );
}
