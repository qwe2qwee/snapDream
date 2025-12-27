import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ImageUploadBoxProps {
  label: string;
  optional?: boolean;
  type?: "model" | "cloth";
  selectedImage?: string;
  onUpload: () => void;
  onRemove?: () => void;
  isLoading?: boolean;
}

export const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
  label,
  optional = true,
  type = "model",
  selectedImage,
  onUpload,
  onRemove,
  isLoading = false,
}) => {
  const { currentLanguage, t } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius, getResponsiveValue } =
    useResponsive();

  const containerHeight = getResponsiveValue(280, 300, 320, 340, 360);
  const removeButtonSize = getResponsiveValue(32, 36, 40, 42, 44);
  const emptyImageSize = getResponsiveValue(100, 110, 120, 130, 140);

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
      fontFamily: isArabic ? "Zain-Bold" : fonts.Regular,
      color: "#FFFFFF",
    },
    optional: {
      color: "#8E8E93",
      marginLeft: spacing.xs,
    },
    uploadArea: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: getBorderRadius("large") + spacing.sm,
      height: containerHeight,
      overflow: "hidden", // Important for borderRadius
    },
    innerUploadArea: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    dashedBorder: {
      // Only show dashed border when no image
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderStyle: "dashed",
      borderWidth: 2,
      borderRadius: getBorderRadius("large"),
      margin: spacing.sm,
    },
    emptyState: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.md,
    },
    emptyImage: {
      width: emptyImageSize,
      height: emptyImageSize - spacing.md,
    },
    uploadText: {
      fontSize: typography.body,
      fontFamily: isArabic ? "Zain-Bold" : fonts.Medium,
      color: "#FFFFFF",
    },
    filledState: {
      width: "100%",
      height: "100%",
      position: "relative",
    },
    selectedImage: {
      width: "100%",
      height: "100%",
      backgroundColor: "#1A1A1A", // Fallback color while loading
    },
    removeButton: {
      position: "absolute",
      top: spacing.md,
      right: spacing.md,
      width: removeButtonSize,
      height: removeButtonSize,
      borderRadius: removeButtonSize / 2,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
      // Shadow for better visibility
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
    },
  });

  return (
    <View style={styles.container}>
      {/* Label */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {optional && (
          <Text style={styles.optional}>
            ({t("common.optional") || (isArabic ? "اختياري" : "Optional")})
          </Text>
        )}
      </View>

      {/* Upload Area */}
      <TouchableOpacity
        style={styles.uploadArea}
        onPress={selectedImage || isLoading ? undefined : onUpload}
        activeOpacity={selectedImage || isLoading ? 1 : 0.7}
        disabled={!!selectedImage || isLoading}
      >
        {isLoading ? (
          <View style={[styles.innerUploadArea, styles.dashedBorder]}>
            <View style={styles.emptyState}>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
          </View>
        ) : selectedImage ? (
          // ✅ FILLED STATE - Show Selected Image
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
                <Feather name="x" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          // ✅ EMPTY STATE - Show Upload Placeholder
          <View style={[styles.innerUploadArea, styles.dashedBorder]}>
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
              <Text style={styles.uploadText}>
                {t("clothSwap.uploadImage")}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
