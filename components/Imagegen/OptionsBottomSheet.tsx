import Close from "@/assets/icons/Close.svg";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { OptionsPicker } from "./OptionsPicker";

interface OptionsBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  numberOfImages: number;
  onNumberOfImagesChange: (value: number) => void;
  aspectRatio: string;
  onAspectRatioChange: (value: string) => void;
  resolution: string;
  onResolutionChange: (value: string) => void;
  // Video Props
  duration?: string;
  onDurationChange?: (value: string) => void;
  fps?: string;
  onFpsChange?: (value: string) => void;
  type?: "image" | "video";
}

export const OptionsBottomSheet: React.FC<OptionsBottomSheetProps> = ({
  isVisible,
  onClose,
  numberOfImages,
  onNumberOfImagesChange,
  aspectRatio,
  onAspectRatioChange,
  resolution,
  onResolutionChange,
  duration,
  onDurationChange,
  fps,
  onFpsChange,
  type = "image",
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius, safeAreaBottom } =
    useResponsive();

  const styles = StyleSheet.create({
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    container: {
      backgroundColor: "#2C2C2E",
      borderTopLeftRadius: getBorderRadius("large") + spacing.md,
      borderTopRightRadius: getBorderRadius("large") + spacing.md,
      paddingTop: spacing.lg,
      paddingBottom: safeAreaBottom + spacing.lg,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: typography.h3,
      fontFamily: fonts.SemiBold,
      color: "#FFFFFF",
    },
    closeButton: {
      borderRadius: 16,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      paddingHorizontal: spacing.lg,
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.7}
      backdropColor="#000000"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
      hideModalContentWhileAnimating
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Options</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Close width={30} height={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {type === "image" ? (
            <>
              <OptionsPicker
                label="Number of Images"
                options={["1", "2", "3", "4"]}
                selectedValue={numberOfImages.toString()}
                onSelect={(value) => onNumberOfImagesChange(Number(value))}
              />

              <OptionsPicker
                label="Aspect Ratio"
                options={["1:1", "2:3", "3:4", "4:5", "9:16"]}
                selectedValue={aspectRatio}
                onSelect={onAspectRatioChange}
              />

              <OptionsPicker
                label="Resolutions"
                options={["1K", "2K", "3K"]}
                selectedValue={resolution}
                onSelect={onResolutionChange}
              />
            </>
          ) : (
            <>
              {/* Video Options */}
              <OptionsPicker
                label="Aspect Ratio"
                options={["16:9", "9:16", "1:1"]}
                selectedValue={aspectRatio}
                onSelect={onAspectRatioChange}
              />

              {duration && onDurationChange && (
                <OptionsPicker
                  label="Duration (sec)"
                  options={["3s", "5s", "10s"]}
                  selectedValue={duration}
                  onSelect={onDurationChange}
                />
              )}

              {fps && onFpsChange && (
                <OptionsPicker
                  label="Frame Rate"
                  options={["24", "30", "60"]}
                  selectedValue={fps}
                  onSelect={onFpsChange}
                />
              )}

              <OptionsPicker
                label="Resolution"
                options={["720p", "1080p", "4K"]}
                selectedValue={resolution}
                onSelect={onResolutionChange}
              />
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};
