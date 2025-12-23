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
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackIcon from "../assets/icons/BackIcon.svg";

export default function FaceSwapScreen() {
  const router = useRouter();
  const fonts = useFontFamily();
  const { spacing, safeAreaTop, getResponsiveValue, getBorderRadius } =
    useResponsive();

  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Responsive values
  const responsiveValues = useMemo(
    () => ({
      backIconSize: getResponsiveValue(42, 45, 48, 50, 52),
      titleSize: getResponsiveValue(18, 20, 22, 24, 26),
      headerPaddingVertical: spacing.md,
      buttonHeight: getResponsiveValue(50, 52, 54, 56, 58),
      uploadBoxHeight: getResponsiveValue(180, 200, 220, 240, 260),
    }),
    [getResponsiveValue, spacing]
  );

  const pickImage = async (type: "base" | "face") => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === "base") {
        setBaseImage(result.assets[0].uri);
      } else {
        setFaceImage(result.assets[0].uri);
      }
    }
  };

  const handleSwap = () => {
    if (!baseImage || !faceImage) return;
    setIsGenerating(true);
    // Simulate processing
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
        flex: 1,
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
      uploadSection: {
        marginBottom: spacing.xl,
      },
      sectionTitle: {
        fontSize: 16,
        fontFamily: fonts.Medium,
        color: "#FFFFFF",
        marginBottom: spacing.sm,
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
      },
      uploadPlaceholderText: {
        color: "rgba(255, 255, 255, 0.6)",
        marginTop: spacing.sm,
        fontFamily: fonts.Regular,
      },
      imagePreview: {
        width: "100%" as DimensionValue,
        height: "100%" as DimensionValue,
      },
      swapButton: {
        backgroundColor: "#6366F1",
        height: responsiveValues.buttonHeight,
        borderRadius: getBorderRadius("large"),
        justifyContent: "center" as const,
        alignItems: "center" as const,
        marginTop: spacing.md,
        marginBottom: spacing.xl,
        opacity: isGenerating || !baseImage || !faceImage ? 0.7 : 1,
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
      baseImage,
      faceImage,
    ]
  );

  return (
    <GradientBackground>
      <View style={{ flex: 1 }}>
        <ScrollView style={dynamicStyles.container}>
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
            <Text style={dynamicStyles.title}>Face Swap</Text>
            <View style={{ width: responsiveValues.backIconSize }} />
          </View>

          {/* Base Image Upload */}
          <View style={dynamicStyles.uploadSection}>
            <Text style={dynamicStyles.sectionTitle}>1. Upload Base Image</Text>
            <TouchableOpacity
              style={dynamicStyles.uploadBox}
              onPress={() => pickImage("base")}
              activeOpacity={0.8}
            >
              {baseImage ? (
                <Image
                  source={{ uri: baseImage }}
                  style={dynamicStyles.imagePreview}
                  resizeMode="cover"
                />
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 30 }}>🖼️</Text>
                  <Text style={dynamicStyles.uploadPlaceholderText}>
                    Select base image
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Face Image Upload */}
          <View style={dynamicStyles.uploadSection}>
            <Text style={dynamicStyles.sectionTitle}>
              2. Upload Face Source
            </Text>
            <TouchableOpacity
              style={dynamicStyles.uploadBox}
              onPress={() => pickImage("face")}
              activeOpacity={0.8}
            >
              {faceImage ? (
                <Image
                  source={{ uri: faceImage }}
                  style={dynamicStyles.imagePreview}
                  resizeMode="cover"
                />
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 30 }}>👤</Text>
                  <Text style={dynamicStyles.uploadPlaceholderText}>
                    Select face image
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Generate Button */}
          <TouchableOpacity
            style={dynamicStyles.swapButton}
            onPress={handleSwap}
            disabled={isGenerating || !baseImage || !faceImage}
            activeOpacity={0.8}
          >
            {isGenerating ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={dynamicStyles.buttonText}>Swap Face</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </GradientBackground>
  );
}
