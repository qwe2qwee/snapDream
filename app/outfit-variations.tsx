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

export default function OutfitVariationsScreen() {
  const router = useRouter();
  const fonts = useFontFamily();
  const { spacing, safeAreaTop, getResponsiveValue, getBorderRadius } =
    useResponsive();

  const [modelImage, setModelImage] = useState<string | null>(null);
  const [outfitImages, setOutfitImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Responsive values
  const responsiveValues = useMemo(
    () => ({
      backIconSize: getResponsiveValue(42, 45, 48, 50, 52),
      titleSize: getResponsiveValue(18, 20, 22, 24, 26),
      headerPaddingVertical: spacing.md,
      buttonHeight: getResponsiveValue(50, 52, 54, 56, 58),
      uploadBoxHeight: getResponsiveValue(200, 220, 240, 260, 280),
      smallImageSize: getResponsiveValue(80, 90, 100, 110, 120),
    }),
    [getResponsiveValue, spacing]
  );

  const pickModelImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setModelImage(result.assets[0].uri);
    }
  };

  const pickOutfitImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setOutfitImages((prev) => [
        ...prev,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  const removeOutfit = (uri: string) => {
    setOutfitImages((prev) => prev.filter((img) => img !== uri));
  };

  const handleGenerate = () => {
    if (!modelImage || outfitImages.length === 0) return;
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      // Logic to show result would go here
    }, 3000);
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
      section: {
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
      imagePreview: {
        width: "100%" as DimensionValue,
        height: "100%" as DimensionValue,
      },
      uploadPlaceholderText: {
        color: "rgba(255, 255, 255, 0.6)",
        marginTop: spacing.sm,
        fontFamily: fonts.Regular,
      },
      outfitsContainer: {
        flexDirection: "row" as const,
        flexWrap: "wrap" as const,
        marginTop: spacing.sm,
      },
      outfitItem: {
        width: responsiveValues.smallImageSize,
        height: responsiveValues.smallImageSize,
        margin: spacing.xs,
        borderRadius: getBorderRadius("medium"),
        position: "relative" as const,
      },
      outfitImage: {
        width: "100%" as DimensionValue,
        height: "100%" as DimensionValue,
        borderRadius: getBorderRadius("medium"),
      },
      removeButton: {
        position: "absolute" as const,
        top: -5,
        right: -5,
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: "center" as const,
        alignItems: "center" as const,
        zIndex: 1,
      },
      removeText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "bold" as const,
      },
      addMoreButton: {
        width: responsiveValues.smallImageSize,
        height: responsiveValues.smallImageSize,
        margin: spacing.xs,
        borderRadius: getBorderRadius("medium"),
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        justifyContent: "center" as const,
        alignItems: "center" as const,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderStyle: "dashed" as const,
      },
      generateButton: {
        backgroundColor: "#6366F1",
        height: responsiveValues.buttonHeight,
        borderRadius: getBorderRadius("large"),
        justifyContent: "center" as const,
        alignItems: "center" as const,
        marginBottom: spacing.xl + spacing.xl, // Extra bottom padding
        marginTop: spacing.lg,
        opacity:
          isGenerating || !modelImage || outfitImages.length === 0 ? 0.7 : 1,
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
      modelImage,
      outfitImages.length,
    ]
  );

  return (
    <GradientBackground>
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
            <Text style={dynamicStyles.title}>Outfit Variations</Text>
            <View style={{ width: responsiveValues.backIconSize }} />
          </View>

          {/* Model Upload */}
          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>1. Upload Model</Text>
            <TouchableOpacity
              style={dynamicStyles.uploadBox}
              onPress={pickModelImage}
              activeOpacity={0.8}
            >
              {modelImage ? (
                <Image
                  source={{ uri: modelImage }}
                  style={dynamicStyles.imagePreview}
                  resizeMode="cover"
                />
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 30 }}>👤</Text>
                  <Text style={dynamicStyles.uploadPlaceholderText}>
                    Tap to upload model
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Outfits Upload */}
          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>
              2. Upload Outfits (Select Multiple)
            </Text>
            <View style={dynamicStyles.outfitsContainer}>
              {outfitImages.map((uri, index) => (
                <View key={index} style={dynamicStyles.outfitItem}>
                  <TouchableOpacity
                    style={dynamicStyles.removeButton}
                    onPress={() => removeOutfit(uri)}
                  >
                    <Text style={dynamicStyles.removeText}>×</Text>
                  </TouchableOpacity>
                  <Image source={{ uri }} style={dynamicStyles.outfitImage} />
                </View>
              ))}
              <TouchableOpacity
                style={dynamicStyles.addMoreButton}
                onPress={pickOutfitImages}
              >
                <Text style={{ fontSize: 24, color: "#FFF" }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Generate Button */}
          <TouchableOpacity
            style={dynamicStyles.generateButton}
            onPress={handleGenerate}
            disabled={isGenerating || !modelImage || outfitImages.length === 0}
            activeOpacity={0.8}
          >
            {isGenerating ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={dynamicStyles.buttonText}>Generate Variations</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </GradientBackground>
  );
}
