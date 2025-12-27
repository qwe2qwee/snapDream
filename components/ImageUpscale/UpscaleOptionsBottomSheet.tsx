import Close from "@/assets/icons/Close.svg";
import { UpscaleOptions } from "@/components/ImageUpscale/UpscaleOptions";
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

interface UpscaleOptionsBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  enhanceModel: "Classic" | "Pro" | "Flash";
  setEnhanceModel: (model: "Classic" | "Pro" | "Flash") => void;
  upscaleFactor: "2x" | "4x";
  setUpscaleFactor: (factor: "2x" | "4x") => void;
}

export const UpscaleOptionsBottomSheet: React.FC<
  UpscaleOptionsBottomSheetProps
> = ({
  isVisible,
  onClose,
  enhanceModel,
  setEnhanceModel,
  upscaleFactor,
  setUpscaleFactor,
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
          <UpscaleOptions
            enhanceModel={enhanceModel}
            setEnhanceModel={setEnhanceModel}
            upscaleFactor={upscaleFactor}
            setUpscaleFactor={setUpscaleFactor}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};
