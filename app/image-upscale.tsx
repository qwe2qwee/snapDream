import { GradientBackground } from "@/components/GradientBackground";
import { GenerateButton } from "@/components/Imagegen/GenerateButton";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { UpscaleOptionsBottomSheet } from "@/components/ImageUpscale/UpscaleOptionsBottomSheet";
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
  const [showOptions, setShowOptions] = useState(false);

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
    setTimeout(() => {
      setLoading(false);
      router.push("/image-result");
    }, 2000);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: spacing.xl * 2 + safeAreaBottom + 80,
    },
    imagePreviewContainer: {
      marginHorizontal: spacing.lg,
      borderRadius: getBorderRadius("large"),
      overflow: "hidden",
      position: "relative",
      height: getResponsiveValue(350, 400, 450, 500, 550),
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
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ImageGenHeader title="Image Upscale" />

          {modelImage ? (
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
          ) : (
            <UpscaleUploadView onUpload={pickImage} />
          )}
        </ScrollView>

        {modelImage && (
          <View style={styles.bottomContainer}>
            <GenerateButton
              onPress={handleGenerate}
              credits={10}
              onOptionsPress={() => setShowOptions(true)}
            />
          </View>
        )}

        <UpscaleOptionsBottomSheet
          isVisible={showOptions}
          onClose={() => setShowOptions(false)}
          enhanceModel={enhanceModel}
          setEnhanceModel={setEnhanceModel}
          upscaleFactor={upscaleFactor}
          setUpscaleFactor={setUpscaleFactor}
        />
      </View>
      <LoadingModal isVisible={loading} />
    </GradientBackground>
  );
}
