import { GradientBackground } from "@/components/GradientBackground";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  DimensionValue,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import BackIcon from "../assets/icons/BackIcon.svg";

export default function SketchToImageScreen() {
  const router = useRouter();
  const fonts = useFontFamily();
  const { spacing, safeAreaTop, getResponsiveValue, getBorderRadius } =
    useResponsive();

  const [sketchImage, setSketchImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Responsive values
  const responsiveValues = useMemo(
    () => ({
      backIconSize: getResponsiveValue(42, 45, 48, 50, 52),
      titleSize: getResponsiveValue(18, 20, 22, 24, 26),
      headerPaddingVertical: spacing.md,
      buttonHeight: getResponsiveValue(50, 52, 54, 56, 58),
      uploadBoxHeight: getResponsiveValue(250, 280, 300, 320, 350),
      inputHeight: getResponsiveValue(80, 90, 100, 110, 120),
    }),
    [getResponsiveValue, spacing]
  );

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

  const handleGenerate = () => {
    if (!sketchImage) return;
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      // Logic to show result would go here
    }, 2500);
  };

  const dynamicStyles = useMemo(
    () => ({
      container: {
        paddingTop: safeAreaTop,
        paddingHorizontal: spacing.md,
      },
      header: {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        justifyContent: "space-between" as const,
        paddingVertical: responsiveValues.headerPaddingVertical,
        marginBottom: spacing.lg,
      },
      title: {
        fontSize: responsiveValues.titleSize,
        fontFamily: fonts.Bold,
        color: "#FFFFFF",
      },
      backButton: {
        width: responsiveValues.backIconSize,
        height: responsiveValues.backIconSize,
        justifyContent: "center" as const,
        alignItems: "center" as const,
      },
      sectionTitle: {
        fontSize: 16,
        fontFamily: fonts.Medium,
        color: "#FFFFFF",
        marginBottom: spacing.sm,
        marginTop: spacing.md,
      },
      uploadBox: {
        height: responsiveValues.uploadBoxHeight,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: getBorderRadius("large"),
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderStyle: "dashed" as const,
        justifyContent: "center" as const,
        alignItems: "center" as const,
        overflow: "hidden" as const,
        marginBottom: spacing.md,
      },
      imagePreview: {
        width: "100%" as DimensionValue,
        height: "100%" as DimensionValue,
      },
      uploadPlaceholderText: {
        color: "rgba(255, 255, 255, 0.6)",
        marginTop: spacing.sm,
        fontFamily: fonts.Regular,
      },
      inputContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: getBorderRadius("large"),
        padding: spacing.md,
        height: responsiveValues.inputHeight,
        marginBottom: spacing.lg,
      },
      input: {
        flex: 1,
        color: "#FFFFFF",
        fontFamily: fonts.Regular,
        fontSize: 16,
        textAlignVertical: "top" as const,
      },
      generateButton: {
        backgroundColor: "#6366F1",
        height: responsiveValues.buttonHeight,
        borderRadius: getBorderRadius("large"),
        justifyContent: "center" as const,
        alignItems: "center" as const,
        marginBottom: spacing.xl,
        opacity: isGenerating || !sketchImage ? 0.7 : 1,
      },
      buttonText: {
        color: "#FFFFFF",
        fontFamily: fonts.Bold,
        fontSize: 18,
      },
    }),
    [
      safeAreaTop,
      spacing,
      responsiveValues,
      fonts,
      getBorderRadius,
      isGenerating,
      sketchImage,
    ]
  );

  return (
    <GradientBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={dynamicStyles.container}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={dynamicStyles.header}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={dynamicStyles.backButton}
                activeOpacity={0.7}
              >
                <BackIcon
                  width={responsiveValues.backIconSize}
                  height={responsiveValues.backIconSize}
                />
              </TouchableOpacity>
              <Text style={dynamicStyles.title}>Sketch to Image</Text>
              <View style={{ width: responsiveValues.backIconSize }} />
            </View>

            {/* Sketch Upload */}
            <Text style={dynamicStyles.sectionTitle}>1. Upload Sketch</Text>
            <TouchableOpacity
              style={dynamicStyles.uploadBox}
              onPress={pickImage}
              activeOpacity={0.8}
            >
              {sketchImage ? (
                <Image
                  source={{ uri: sketchImage }}
                  style={dynamicStyles.imagePreview}
                  resizeMode="contain"
                />
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 34 }}>✏️</Text>
                  <Text style={dynamicStyles.uploadPlaceholderText}>
                    Tap to upload sketch
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Prompt Input */}
            <Text style={dynamicStyles.sectionTitle}>
              2. Description (Optional)
            </Text>
            <View style={dynamicStyles.inputContainer}>
              <TextInput
                style={dynamicStyles.input}
                placeholder="Describe the desired outcome..."
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                multiline
                value={prompt}
                onChangeText={setPrompt}
              />
            </View>

            {/* Generate Button */}
            <TouchableOpacity
              style={dynamicStyles.generateButton}
              onPress={handleGenerate}
              disabled={isGenerating || !sketchImage}
              activeOpacity={0.8}
            >
              {isGenerating ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={dynamicStyles.buttonText}>Generate Realism</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </GradientBackground>
  );
}
