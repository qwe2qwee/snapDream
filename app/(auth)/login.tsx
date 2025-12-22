import { ForgotPasswordLink } from "@/components/Auth/ForgotPasswordLink";
import { LoginButton } from "@/components/Auth/LoginButton";
import { LoginHeader } from "@/components/Auth/LoginHeader";
import { LoginInput } from "@/components/Auth/LoginInput";
import { OrDivider } from "@/components/Auth/OrDivider";
import { SignUpLink } from "@/components/Auth/SignUpLink";
import { SocialLoginButtons } from "@/components/Auth/SocialLoginButtons";
import { GradientBackground } from "@/components/GradientBackground";
import { useResponsive } from "@/hooks/useResponsive";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function LoginScreen() {
  const { spacing, safeAreaTop, safeAreaBottom } = useResponsive();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login pressed");
  };

  const handleForgotPassword = () => {
    console.log("Forgot password");
  };

  const handleSignUp = () => {
    console.log("Sign up pressed");
    router.push("/(auth)/register");
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
  };

  const handleAppleLogin = () => {
    console.log("Apple login");
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
          <LoginHeader />

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

            {/* Forgot Password */}
            <ForgotPasswordLink onPress={handleForgotPassword} />

            {/* Login Button */}
            <LoginButton onPress={handleLogin} text="Login" />

            {/* Sign Up Link */}
            <SignUpLink onPress={handleSignUp} />

            {/* Divider */}
            <OrDivider />

            {/* Social Login Buttons */}
            <SocialLoginButtons
              onGooglePress={handleGoogleLogin}
              onApplePress={handleAppleLogin}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}
