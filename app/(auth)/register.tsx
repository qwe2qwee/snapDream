import { LoginButton } from "@/components/Auth/LoginButton";
import { LoginInput } from "@/components/Auth/LoginInput";
import { LoginLink } from "@/components/Auth/LoginLink";
import { OrDivider } from "@/components/Auth/OrDivider";
import { RegisterHeader } from "@/components/Auth/RegisterHeader";
import { SocialLoginButtons } from "@/components/Auth/SocialLoginButtons";
import { GradientBackground } from "@/components/GradientBackground";
import { SuccessModal } from "@/components/Modals/AproveModal";
import { LoadingModal } from "@/components/Modals/LoadingModal";
import { OTPModal } from "@/components/Modals/OTPModal";
import { useResponsive } from "@/hooks/useResponsive";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const { spacing, safeAreaTop, safeAreaBottom } = useResponsive();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [nextModal, setNextModal] = useState<"loading" | "success" | null>(
    null
  );

  const handleVerifyOTP = (otp: string) => {
    console.log("OTP verified:", otp);
    setNextModal("loading");
    setShowOTP(false);
  };

  const handleOTPModalHide = () => {
    if (nextModal === "loading") {
      console.log("OTP Modal hidden, opening Loading Modal");
      setShowLoading(true);
      setNextModal(null);

      // Simulate API call
      setTimeout(() => {
        console.log("Loading complete, closing Loading Modal");
        setNextModal("success");
        setShowLoading(false);
      }, 2000);
    }
  };

  const handleLoadingModalHide = () => {
    if (nextModal === "success") {
      console.log("Loading Modal hidden, opening Success Modal");
      setShowSuccess(true);
      setNextModal(null);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign up");
  };

  const handleAppleSignUp = () => {
    console.log("Apple sign up");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: safeAreaTop,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: safeAreaBottom + spacing.xl,
    },
    form: {
      paddingHorizontal: spacing.lg,
    },
  });

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <RegisterHeader />

          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
            <LoginInput
              label="Email"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              icon="mail"
              keyboardType="email-address"
            />

            {/* Password Input */}
            <LoginInput
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              icon="lock"
              secureTextEntry
            />

            {/* Confirm Password Input */}
            <LoginInput
              label="Confirm Password"
              placeholder="Re-Enter Your Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              icon="lock"
              secureTextEntry
            />

            {/* Sign Up Button */}
            <LoginButton onPress={() => setShowOTP(true)} text="Sign Up" />

            {/* Login Link */}
            <LoginLink onPress={handleLogin} />

            {/* Divider */}
            <OrDivider />

            {/* Social Sign Up Buttons */}
            <SocialLoginButtons
              onGooglePress={handleGoogleSignUp}
              onApplePress={handleAppleSignUp}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* OTP Modal */}
      <OTPModal
        isVisible={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleVerifyOTP}
        onModalHide={handleOTPModalHide}
        email="example@email.com"
      />

      {/* Loading Modal */}
      <LoadingModal
        isVisible={showLoading}
        onModalHide={handleLoadingModalHide}
        title="Just a moment…"
      />

      {/* Success Modal */}
      <SuccessModal
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
        onContinue={() => {
          setShowSuccess(false);
          // Navigate to next screen
        }}
      />
    </GradientBackground>
  );
}
