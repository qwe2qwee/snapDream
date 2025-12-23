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

export default function ClothSwapScreen() {
  const router = useRouter();
  const fonts = useFontFamily();
  const { spacing, safeAreaTop, getResponsiveValue, getBorderRadius } =
    useResponsive();

  const [personImage, setPersonImage] = useState<string | null>(null);
  const [clothImage, setClothImage] = useState<string | null>(null);
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

  const pickImage = async (type: "person" | "cloth") => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === "person") {
        setPersonImage(result.assets[0].uri);
      } else {
        setClothImage(result.assets[0].uri);
      }
    }
  };

  const handleSwap = () => {
    if (!personImage || !clothImage) return;
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
        opacity: isGenerating || !personImage || !clothImage ? 0.7 : 1,
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
      personImage,
      clothImage,
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
            <Text style={dynamicStyles.title}>Cloth Swap</Text>
            <View style={{ width: responsiveValues.backIconSize }} />
          </View>

          {/* Person Image Upload */}
          <View style={dynamicStyles.uploadSection}>
            <Text style={dynamicStyles.sectionTitle}>1. Upload Person</Text>
            <TouchableOpacity
              style={dynamicStyles.uploadBox}
              onPress={() => pickImage("person")}
              activeOpacity={0.8}
            >
              {personImage ? (
                <Image
                  source={{ uri: personImage }}
                  style={dynamicStyles.imagePreview}
                  resizeMode="cover"
                />
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 30 }}>👤</Text>
                  <Text style={dynamicStyles.uploadPlaceholderText}>
                    Tap to upload person
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Cloth Image Upload */}
          <View style={dynamicStyles.uploadSection}>
            <Text style={dynamicStyles.sectionTitle}>2. Upload Cloth</Text>
            <TouchableOpacity
              style={dynamicStyles.uploadBox}
              onPress={() => pickImage("cloth")}
              activeOpacity={0.8}
            >
              {clothImage ? (
                <Image
                  source={{ uri: clothImage }}
                  style={dynamicStyles.imagePreview}
                  resizeMode="cover"
                />
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 30 }}>👕</Text>
                  <Text style={dynamicStyles.uploadPlaceholderText}>
                    Tap to upload cloth
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Generate Button */}
          <TouchableOpacity
            style={dynamicStyles.swapButton}
            onPress={handleSwap}
            disabled={isGenerating || !personImage || !clothImage}
            activeOpacity={0.8}
          >
            {isGenerating ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={dynamicStyles.buttonText}>Swap Clothes</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </GradientBackground>
  );
}
