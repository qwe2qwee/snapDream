import Loader from "@/assets/icons/loader.svg";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

interface LoadingModalProps {
  isVisible: boolean;
  title?: string;
  subtitle?: string;
  onModalHide?: () => void;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({
  isVisible,
  title = "Just a moment…",
  onModalHide,
}) => {
  const { spacing, getResponsiveValue, getBorderRadius, isTablet, width } =
    useResponsive();
  const fonts = useFontFamily();

  // Rotation animation
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Responsive values
  const responsiveValues = useMemo(
    () => ({
      modalWidth: isTablet ? width * 0.5 : width * 0.7,
      loaderSize: getResponsiveValue(40, 45, 50, 55, 60),
      titleSize: getResponsiveValue(18, 20, 22, 24, 26),
      modalBorderRadius: getBorderRadius("large") + spacing.md,
    }),
    [width, spacing, getResponsiveValue, getBorderRadius, isTablet]
  );

  // Start rotation animation when modal is visible
  useEffect(() => {
    if (isVisible) {
      // Reset rotation
      rotateAnim.setValue(0);

      // Create infinite rotation animation
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000, // 1.5 seconds per rotation
          easing: Easing.linear,
          useNativeDriver: true, // Use native driver for better performance
        })
      ).start();
    } else {
      // Stop animation when modal is hidden
      rotateAnim.stopAnimation();
    }
  }, [isVisible, rotateAnim]);

  // Interpolate rotation value
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const dynamicStyles = useMemo(
    () => ({
      modalContent: {
        width: responsiveValues.modalWidth,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.md,
        borderRadius: responsiveValues.modalBorderRadius,
      },
      title: {
        fontSize: responsiveValues.titleSize,
        fontFamily: fonts.SemiBold,
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
      },
    }),
    [spacing, fonts, responsiveValues]
  );

  return (
    <Modal
      isVisible={isVisible}
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
        {/* Custom Animated Loader */}
        <Animated.View
          style={{
            transform: [{ rotate }],
          }}
        >
          <Loader
            width={responsiveValues.loaderSize}
            height={responsiveValues.loaderSize}
            color="#FFFFFF"
          />
        </Animated.View>
        {/* Title */}
        <Text style={[styles.title, dynamicStyles.title]}>{title}</Text>
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
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});
