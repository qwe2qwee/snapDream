import Close from "@/assets/icons/Close.svg";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React, { useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

interface OTPModalProps {
  isVisible: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  title?: string;
  subtitle?: string;
  email?: string;
  onModalHide?: () => void;
}

export const OTPModal: React.FC<OTPModalProps> = ({
  isVisible,
  onClose,
  onVerify,
  title = "Verify Your Email",
  subtitle = "We've sent a verification code to",
  email = "your email",
  onModalHide,
}) => {
  const { spacing, getResponsiveValue, getBorderRadius, isTablet, width } =
    useResponsive();
  const fonts = useFontFamily();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Responsive values
  const responsiveValues = useMemo(
    () => ({
      modalWidth: isTablet ? width * 0.5 : width * 0.85,
      closeButtonSize: getResponsiveValue(28, 30, 32, 34, 36),
      titleSize: getResponsiveValue(18, 20, 22, 24, 26),
      subtitleSize: getResponsiveValue(13, 14, 15, 16, 17),
      emailSize: getResponsiveValue(14, 15, 16, 17, 18),
      otpBoxSize: getResponsiveValue(36, 38, 40, 45, 50),
      otpTextSize: getResponsiveValue(20, 22, 24, 26, 28),
      buttonHeight: getResponsiveValue(48, 52, 56, 60, 64),
      buttonTextSize: getResponsiveValue(15, 16, 17, 18, 19),
      modalBorderRadius: getBorderRadius("large") + spacing.md,
      otpBorderRadius: getBorderRadius("medium"),
      buttonBorderRadius: getResponsiveValue(25, 27, 29, 31, 33),
    }),
    [width, spacing, getResponsiveValue, getBorderRadius, isTablet]
  );

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      onVerify(otpCode);
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  const dynamicStyles = useMemo(
    () => ({
      modalContent: {
        width: responsiveValues.modalWidth,
        paddingTop: spacing.xl,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
        borderRadius: responsiveValues.modalBorderRadius,
      },
      closeButton: {
        width: responsiveValues.closeButtonSize,
        height: responsiveValues.closeButtonSize,
      },
      title: {
        fontSize: responsiveValues.titleSize,
        fontFamily: fonts.SemiBold,
        marginBottom: spacing.sm,
      },
      subtitle: {
        fontSize: responsiveValues.subtitleSize,
        fontFamily: fonts.Regular,
        marginBottom: spacing.xs / 2,
      },
      email: {
        fontSize: responsiveValues.emailSize,
        fontFamily: fonts.SemiBold,
        marginBottom: spacing.xl,
      },
      otpBox: {
        width: responsiveValues.otpBoxSize,
        height: responsiveValues.otpBoxSize,
        borderRadius: responsiveValues.otpBorderRadius,
      },
      otpText: {
        fontSize: responsiveValues.otpTextSize,
        fontFamily: fonts.SemiBold,
      },
      button: {
        height: responsiveValues.buttonHeight,
        borderRadius: responsiveValues.buttonBorderRadius,
      },
      buttonText: {
        fontSize: responsiveValues.buttonTextSize,
        fontFamily: fonts.Bold,
      },
    }),
    [spacing, fonts, responsiveValues]
  );

  return (
    <Modal
      isVisible={isVisible}
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

        {/* Title */}
        <Text style={[styles.title, dynamicStyles.title]}>{title}</Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
          {subtitle}
        </Text>
        <Text style={[styles.email, dynamicStyles.email]}>{email}</Text>

        {/* OTP Input Boxes */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={[
                styles.otpBox,
                dynamicStyles.otpBox,
                digit && styles.otpBoxFilled,
              ]}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[
            styles.button,
            dynamicStyles.button,
            !isComplete && styles.buttonDisabled,
          ]}
          onPress={handleVerify}
          activeOpacity={0.9}
          disabled={!isComplete}
        >
          <Text style={[styles.buttonText, dynamicStyles.buttonText]}>
            Verify
          </Text>
        </TouchableOpacity>

        {/* Resend Link */}
        <TouchableOpacity style={styles.resendContainer} activeOpacity={0.7}>
          <Text
            style={[
              styles.resendText,
              { fontSize: responsiveValues.subtitleSize },
            ]}
          >
            Didn't receive code? <Text style={styles.resendLink}>Resend</Text>
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
  title: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    color: "#8E8E93",
    textAlign: "center",
  },
  email: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  otpBox: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFFFF",
  },
  otpBoxFilled: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  otpText: {
    color: "#FFFFFF",
  },
  button: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#0D0D0F",
  },
  resendContainer: {
    marginTop: 8,
  },
  resendText: {
    color: "#8E8E93",
    textAlign: "center",
  },
  resendLink: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
