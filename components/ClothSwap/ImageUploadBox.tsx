import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ImageUploadBoxProps {
  label: string;
  optional?: boolean;
  type?: "model" | "cloth";
  selectedImage?: string;
  onUpload: () => void;
  onRemove?: () => void;
}

export const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
  label,
  optional = true,
  type = "model",
  selectedImage,
  onUpload,
  onRemove,
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius, getResponsiveValue } =
    useResponsive();

  const removeButtonSize = getResponsiveValue(32, 36, 40, 42, 44);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    labelContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    label: {
      fontSize: typography.caption,
      fontFamily: fonts.Regular,
      color: "#FFFFFF",
    },
    optional: {
      color: "#8E8E93",
      marginLeft: spacing.xs,
    },
    uploadArea: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: getBorderRadius("large") + spacing.sm,
      minHeight: getResponsiveValue(200, 220, 240, 260, 280),
      padding: spacing.sm,
    },
    emptyState: {
      padding: spacing.xl,
      alignItems: "center",
      justifyContent: "center",
      minHeight: getResponsiveValue(200, 220, 240, 260, 280),
    },
    imagesPreview: {
      flexDirection: "row",
      justifyContent: "center",
      gap: -spacing.md,
      marginBottom: spacing.md,
    },
    previewImage: {
      width: getResponsiveValue(60, 65, 70, 75, 80),
      height: getResponsiveValue(80, 85, 90, 95, 100),
      borderRadius: getBorderRadius("medium"),
      borderWidth: 3,
      borderColor: "#2C2C2E",
    },
    uploadText: {
      fontSize: typography.body,
      fontFamily: fonts.Medium,
      color: "#FFFFFF",
    },
    filledState: {
      position: "relative",
    },
    selectedImage: {
      width: "100%",
      height: getResponsiveValue(280, 300, 320, 340, 360),
    },
    emptyImage: {
      width: getResponsiveValue(150, 160, 170, 180, 190),
      height: getResponsiveValue(80, 100, 120, 140, 160),
    },
    removeButton: {
      position: "absolute",
      top: spacing.md,
      right: spacing.md,
      width: removeButtonSize,
      height: removeButtonSize,
      borderRadius: removeButtonSize / 2,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
    },
    innerUploadArea: {
      alignItems: "center",
      justifyContent: "center",
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderStyle: "dashed",
      borderWidth: 2,

      borderRadius: getBorderRadius("large"),

      flex: 1,
      width: "100%",
      height: "100%",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {optional && <Text style={styles.optional}>(Optional)</Text>}
      </View>

      <TouchableOpacity
        style={styles.uploadArea}
        onPress={selectedImage ? undefined : onUpload}
        activeOpacity={selectedImage ? 1 : 0.7}
      >
        <View style={styles.innerUploadArea}>
          {selectedImage ? (
            // Filled State
            <View style={styles.filledState}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.selectedImage}
                resizeMode="cover"
              />
              {onRemove && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={onRemove}
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              )}
            </View>
          ) : (
            // Empty State
            <View style={styles.emptyState}>
              {type === "model" ? (
                <Image
                  source={require("@/assets/images/Group.png")}
                  style={styles.emptyImage}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("@/assets/images/Group2.png")}
                  style={styles.emptyImage}
                  resizeMode="contain"
                />
              )}
              <Text style={styles.uploadText}>Upload Image</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
