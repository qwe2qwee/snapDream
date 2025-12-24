import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ReferenceImageUploaderProps {
  onUpload: () => void;
  images?: string[];
}

export const ReferenceImageUploader: React.FC<ReferenceImageUploaderProps> = ({
  onUpload,
  images = [],
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius, getResponsiveValue } =
    useResponsive();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    label: {
      fontSize: typography.caption,
      fontFamily: fonts.Regular,
      color: "#FFFFFF",
      marginBottom: spacing.xs,
    },
    optional: {
      color: "#8E8E93",
    },
    uploadArea: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: getBorderRadius("large"),

      padding: spacing.xs,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 200,
    },
    emptyImage: {
      width: getResponsiveValue(150, 160, 170, 180, 190),
      height: getResponsiveValue(80, 100, 120, 140, 160),
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
    imagesPreview: {
      flexDirection: "row",
      gap: -spacing.sm,
      marginBottom: spacing.md,
    },
    previewImage: {
      width: 60,
      height: 80,
      borderRadius: getBorderRadius("medium"),
      borderWidth: 2,
      borderColor: "#2C2C2E",
    },
    uploadText: {
      fontSize: typography.body,
      fontFamily: fonts.Medium,
      color: "#FFFFFF",
      marginTop: 0,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Reference Image <Text style={styles.optional}>(Optional)</Text>
      </Text>
      <TouchableOpacity
        style={styles.uploadArea}
        onPress={onUpload}
        activeOpacity={0.7}
      >
        <View style={styles.innerUploadArea}>
          {images.length > 0 && (
            <View style={styles.imagesPreview}>
              {images.map((img, index) => (
                <Image
                  key={index}
                  source={{ uri: img }}
                  style={[
                    styles.previewImage,
                    { marginLeft: index > 0 ? -20 : 0 },
                  ]}
                />
              ))}
            </View>
          )}
          <Image
            source={require("@/assets/images/Group.png")}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={styles.uploadText}>Upload Image</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
