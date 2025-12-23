import { LoginButton } from "@/components/Auth/LoginButton";
import { LoginHeader } from "@/components/Auth/LoginHeader";
import { LoginInput } from "@/components/Auth/LoginInput";
import { GradientBackground } from "@/components/GradientBackground";
import { SuccessModal } from "@/components/Modals/AproveModal";
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

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { spacing, safeAreaTop, safeAreaBottom } = useResponsive();
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSendLink = () => {
    console.log("Send link pressed for:", email);
    setShowSuccess(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: safeAreaTop,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: safeAreaBottom + spacing.xl,
      justifyContent: "flex-start",
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
          <LoginHeader
            title="Forgot Password?"
            subtitle="Enter your email to receive recovery link."
          />

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

            {/* Send Link Button */}
            <LoginButton onPress={handleSendLink} text="Send Recovery Link" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SuccessModal
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
        onContinue={() => {
          setShowSuccess(false);
          router.push({
            pathname: "/(auth)/verify-email",
            params: { email },
          });
        }}
        title="Link Sent!"
        subtitle={`We've sent a password recovery link to:\n${
          email || "your email"
        }`}
        buttonText="Continue"
      />
    </GradientBackground>
  );
}
