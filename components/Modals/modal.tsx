import Close from "@/assets/icons/Close.svg";
import { Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";

type IconType = React.ReactNode;

interface ConfirmModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon?: IconType; // Custom icon component (SVG or Feather icon name)
  iconName?: keyof typeof Feather.glyphMap; // Feather icon name as fallback
  iconColor?: string;
  iconBackgroundColor?: string;
  title: string;
  subtitle: string;
  confirmText?: string;
  confirmColor?: string;
  showCloseButton?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  icon,
  iconName = "trash-2",
  iconColor = "#FFFFFF",
  iconBackgroundColor = "rgba(255, 255, 255, 0.1)",
  title,
  subtitle,
  confirmText,
  confirmColor = "#FFFFFF",
  showCloseButton = true,
}) => {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const displayConfirmText = confirmText || t("common.confirm");
  const { spacing, getResponsiveValue, getBorderRadius, isTablet, width } =
    useResponsive();

  const fonts = useFontFamily();

  // Responsive values
  const responsiveValues = useMemo(
    () => ({
      // Modal width
      modalWidth: isTablet ? width * 0.5 : width * 0.85,

      // Icon container size
      iconContainerSize: getResponsiveValue(56, 60, 64, 68, 72),

      // Icon size
      iconSize: getResponsiveValue(28, 30, 32, 34, 36),

      // Close button size
      closeButtonSize: getResponsiveValue(28, 30, 32, 34, 36),

      // Title font size
      titleSize: getResponsiveValue(18, 20, 22, 24, 26),

      // Subtitle font size
      subtitleSize: getResponsiveValue(13, 14, 15, 16, 17),

      // Button text size
      buttonTextSize: getResponsiveValue(15, 16, 17, 18, 19),

      // Button height
      buttonHeight: getResponsiveValue(45, 49, 53, 57, 61),

      // Border radius
      modalBorderRadius: getBorderRadius("large") + spacing.md,
      iconBorderRadius: getResponsiveValue(28, 30, 32, 34, 36),
      buttonBorderRadius: getResponsiveValue(25, 27, 29, 31, 33),
    }),
    [width, spacing, getResponsiveValue, getBorderRadius, isTablet]
  );

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      modalContent: {
        width: responsiveValues.modalWidth,
        paddingTop: spacing.lg,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
        borderRadius: responsiveValues.modalBorderRadius,
      },
      iconContainer: {
        width: responsiveValues.iconContainerSize,
        height: responsiveValues.iconContainerSize,
        borderRadius: responsiveValues.iconBorderRadius,
        backgroundColor: iconBackgroundColor,
        marginBottom: spacing.sm,
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
      },
      closeButton: {
        width: responsiveValues.closeButtonSize,
        height: responsiveValues.closeButtonSize,
        position: "absolute" as const,
        top: 16,
        right: isArabic ? undefined : 16,
        left: isArabic ? 16 : undefined,
      },
      title: {
        fontSize: responsiveValues.titleSize,
        fontFamily: isArabic ? "Zain-Bold" : fonts.Medium,
        marginBottom: spacing.sm,
      },
      subtitle: {
        fontSize: responsiveValues.subtitleSize,
        fontFamily: isArabic ? "Zain-Regular" : fonts.Regular,
        marginBottom: spacing.xl,
      },
      confirmButton: {
        height: responsiveValues.buttonHeight,
        borderRadius: responsiveValues.buttonBorderRadius,
        backgroundColor: confirmColor,
      },
      confirmButtonText: {
        fontSize: responsiveValues.buttonTextSize,
        fontFamily: isArabic ? "Zain-Bold" : fonts.Bold,
      },
    }),
    [spacing, fonts, responsiveValues, iconBackgroundColor, confirmColor]
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
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

        {/* Icon */}
        <View style={[styles.iconContainer, dynamicStyles.iconContainer]}>
          {icon || (
            <Feather
              name={iconName}
              size={responsiveValues.iconSize}
              color={iconColor}
            />
          )}
        </View>

        {/* Title */}
        <Text style={[styles.title, dynamicStyles.title]}>{title}</Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
          {subtitle}
        </Text>

        {/* Confirm Button */}
        <TouchableOpacity
          style={[styles.confirmButton, dynamicStyles.confirmButton]}
          onPress={() => {
            onConfirm();
            onClose();
          }}
          activeOpacity={0.9}
        >
          <Text
            style={[
              styles.confirmButtonText,
              dynamicStyles.confirmButtonText,
              { color: confirmColor === "#FFFFFF" ? "#0D0D0F" : "#FFFFFF" },
            ]}
          >
            {displayConfirmText}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

// Static base styles
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
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 20,
  },
  confirmButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    // Text color is dynamic based on button background
  },
});
