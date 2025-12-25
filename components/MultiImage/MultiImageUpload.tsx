import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MultiImageUploadProps {
  images: string[];
  maxImages?: number;
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
}

export const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  images,
  maxImages = 10,
  onAddImage,
  onRemoveImage,
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius, getResponsiveValue } =
    useResponsive();

  const imageSize = getResponsiveValue(100, 105, 110, 115, 120);
  const removeButtonSize = getResponsiveValue(24, 26, 28, 30, 32);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    label: {
      fontSize: typography.caption,
      fontFamily: fonts.Regular,
      color: "#FFFFFF",
    },
    count: {
      fontSize: typography.caption,
      fontFamily: fonts.Regular,
      color: "#8E8E93",
      marginLeft: spacing.xs,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.sm,
    },
    addButton: {
      width: imageSize,
      height: imageSize,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: getBorderRadius("medium"),
      borderWidth: 2,
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderStyle: "dashed",
      justifyContent: "center",
      alignItems: "center",
    },
    addButtonText: {
      fontSize: typography.caption - 2,
      fontFamily: fonts.Regular,
      color: "#8E8E93",
      marginTop: spacing.xs,
    },
    imageWrapper: {
      width: imageSize,
      height: imageSize,
      position: "relative",
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: getBorderRadius("medium"),
    },
    removeButton: {
      position: "absolute",
      top: 4,
      right: 4,
      width: removeButtonSize,
      height: removeButtonSize,
      borderRadius: removeButtonSize / 2,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
    },
  });

  const canAddMore = images.length < maxImages;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Upload Images</Text>
        <Text style={styles.count}>
          ({images.length}/{maxImages})
        </Text>
      </View>

      <View style={styles.grid}>
        {/* Add Image Button - Always first */}
        {canAddMore && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={onAddImage}
            activeOpacity={0.7}
          >
            <Feather name="download" size={20} color="#8E8E93" />
            <Text style={styles.addButtonText}>Add Image</Text>
          </TouchableOpacity>
        )}

        {/* Uploaded Images */}
        {images.map((imageUri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => onRemoveImage(index)}
              activeOpacity={0.7}
            >
              <Feather name="x" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};
