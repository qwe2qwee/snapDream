import { GradientBackground } from "@/components/GradientBackground";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import BackIcon from "../assets/icons/BackIcon.svg";

export default function MultipleImageUploadScreen() {
  const router = useRouter();
  const fonts = useFontFamily();
  const { spacing, safeAreaTop, getResponsiveValue, getBorderRadius } =
    useResponsive();

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Responsive values
  const responsiveValues = useMemo(
    () => ({
      backIconSize: getResponsiveValue(42, 45, 48, 50, 52),
      titleSize: getResponsiveValue(18, 20, 22, 24, 26),
      headerPaddingVertical: spacing.md,
      buttonHeight: getResponsiveValue(50, 52, 54, 56, 58),
      imageSize: getResponsiveValue(100, 110, 120, 130, 140),
    }),
    [getResponsiveValue, spacing]
  );

  const pickImages = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10, // Example limit
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages((prev) => [
        ...prev,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  const removeImage = (uri: string) => {
    setSelectedImages((prev) => prev.filter((img) => img !== uri));
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
      actionButton: {
        backgroundColor: "#6366F1",
        height: responsiveValues.buttonHeight,
        borderRadius: getBorderRadius("large"),
        justifyContent: "center" as const,
        alignItems: "center" as const,
        marginBottom: spacing.lg,
      },
      buttonText: {
        color: "#FFFFFF",
        fontFamily: fonts.Bold,
        fontSize: 16,
      },
      imageContainer: {
        flex: 1,
        marginBottom: spacing.md,
      },
      imageWrapper: {
        margin: spacing.xs,
        position: "relative" as const,
      },
      image: {
        width: responsiveValues.imageSize,
        height: responsiveValues.imageSize,
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
    }),
    [safeAreaTop, spacing, responsiveValues, fonts, getBorderRadius]
  );

  const renderImageItem = ({ item }: { item: string }) => (
    <View style={dynamicStyles.imageWrapper}>
      <TouchableOpacity
        style={dynamicStyles.removeButton}
        onPress={() => removeImage(item)}
      >
        <Text style={dynamicStyles.removeText}>×</Text>
      </TouchableOpacity>
      <Image source={{ uri: item }} style={dynamicStyles.image} />
    </View>
  );

  return (
    <GradientBackground>
      <View style={dynamicStyles.container}>
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
          <Text style={dynamicStyles.title}>Upload Images</Text>
          <View style={{ width: responsiveValues.backIconSize }} />
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={dynamicStyles.actionButton}
          onPress={pickImages}
          activeOpacity={0.8}
        >
          <Text style={dynamicStyles.buttonText}>
            {selectedImages.length > 0 ? "Add More Images" : "Select Images"}
          </Text>
        </TouchableOpacity>

        {/* Images Grid */}
        <FlatList
          data={selectedImages}
          renderItem={renderImageItem}
          keyExtractor={(item) => item}
          numColumns={3}
          contentContainerStyle={dynamicStyles.imageContainer}
          showsVerticalScrollIndicator={false}
        />

        {selectedImages.length > 0 && (
          <TouchableOpacity
            style={[
              dynamicStyles.actionButton,
              { backgroundColor: "#34D399", marginTop: spacing.sm },
            ]} // Success color
            onPress={() => {
              // Handle upload logic
              alert("Ready to upload " + selectedImages.length + " images!");
            }}
            activeOpacity={0.8}
          >
            <Text style={dynamicStyles.buttonText}>
              Upload {selectedImages.length} Images
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </GradientBackground>
  );
}
