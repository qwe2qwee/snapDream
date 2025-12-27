import Close from "@/assets/icons/Close.svg";
import Success from "@/assets/icons/Success.svg";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
  onContinue: () => void;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  showCloseButton?: boolean;
  onModalHide?: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isVisible,
  onClose,
  onContinue,
  title,
  subtitle,
  buttonText,
  showCloseButton = true,
  onModalHide,
}) => {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";

  const displayTitle = title || t("common.done");
  const displaySubtitle = subtitle || t("auth.successVerified");
  const displayButtonText = buttonText || t("auth.letsGo");

  const { spacing, getResponsiveValue, getBorderRadius, isTablet, width } =
    useResponsive();
  const fonts = useFontFamily();

  // Responsive values
  const responsiveValues = useMemo(
    () => ({
      modalWidth: isTablet ? width * 0.5 : width * 0.85,
      iconContainerSize: getResponsiveValue(60, 64, 68, 72, 76),
      iconSize: getResponsiveValue(24, 28, 32, 36, 40),
      closeButtonSize: getResponsiveValue(28, 30, 32, 34, 36),
      titleSize: getResponsiveValue(18, 20, 22, 24, 26),
      subtitleSize: getResponsiveValue(13, 14, 15, 16, 17),
      buttonHeight: getResponsiveValue(48, 52, 56, 60, 64),
      buttonTextSize: getResponsiveValue(15, 16, 17, 18, 19),
      modalBorderRadius: getBorderRadius("large") + spacing.md,
      iconBorderRadius: getResponsiveValue(30, 32, 34, 36, 38),
      buttonBorderRadius: getResponsiveValue(25, 27, 29, 31, 33),
    }),
    [width, spacing, getResponsiveValue, getBorderRadius, isTablet]
  );

  const dynamicStyles = useMemo(
    () => ({
      modalContent: {
        width: responsiveValues.modalWidth,
        paddingTop: spacing.xl,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
        borderRadius: responsiveValues.modalBorderRadius,
      },
      iconContainer: {
        width: responsiveValues.iconContainerSize,
        height: responsiveValues.iconContainerSize,
        borderRadius: responsiveValues.iconBorderRadius,
        marginBottom: spacing.md,
      },
      closeButton: {
        width: responsiveValues.closeButtonSize,
        height: responsiveValues.closeButtonSize,
      },
      title: {
        fontSize: responsiveValues.titleSize,
        fontFamily: isArabic ? "Zain-Bold" : fonts.Bold,
        marginBottom: spacing.sm,
      },
      subtitle: {
        fontSize: responsiveValues.subtitleSize,
        fontFamily: isArabic ? "Zain-Regular" : fonts.Regular,
        marginBottom: spacing.xl,
        lineHeight: responsiveValues.subtitleSize * 1.5,
      },
      button: {
        height: responsiveValues.buttonHeight,
        borderRadius: responsiveValues.buttonBorderRadius,
      },
      buttonText: {
        fontSize: responsiveValues.buttonTextSize,
        fontFamily: isArabic ? "Zain-Bold" : fonts.Bold,
      },
    }),
    [spacing, fonts, responsiveValues]
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onModalHide={onModalHide}
      backdropOpacity={0.7}
      backdropColor="#000000"
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver
      hideModalContentWhileAnimating
      style={styles.modal}
    >
      <View style={[styles.modalContent, dynamicStyles.modalContent]}>
        {/* Close Button */}
        {showCloseButton && (
          <TouchableOpacity
            style={[styles.closeButton, dynamicStyles.closeButton]}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Close
              width={responsiveValues.closeButtonSize}
              height={responsiveValues.closeButtonSize}
              color="#8E8E93"
            />
          </TouchableOpacity>
        )}

        {/* Success Icon */}
        <View style={[styles.iconContainer, dynamicStyles.iconContainer]}>
          <Success
            width={responsiveValues.iconSize}
            height={responsiveValues.iconSize}
          />
        </View>

        {/* Title */}
        <Text style={[styles.title, dynamicStyles.title]}>{displayTitle}</Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
          {displaySubtitle}
        </Text>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.button, dynamicStyles.button]}
          onPress={() => {
            onContinue();
            onClose();
          }}
          activeOpacity={0.9}
        >
          <Text style={[styles.buttonText, dynamicStyles.buttonText]}>
            {displayButtonText}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#2C2C2E",
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  iconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    color: "#8E8E93",
    textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#0D0D0F",
  },
});
