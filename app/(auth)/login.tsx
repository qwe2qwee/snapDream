import { ForgotPasswordLink } from "@/components/Auth/ForgotPasswordLink";
import { LoginButton } from "@/components/Auth/LoginButton";
import { LoginHeader } from "@/components/Auth/LoginHeader";
import { LoginInput } from "@/components/Auth/LoginInput";
import { OrDivider } from "@/components/Auth/OrDivider";
import { SignUpLink } from "@/components/Auth/SignUpLink";
import { SocialLoginButtons } from "@/components/Auth/SocialLoginButtons";
import { GradientBackground } from "@/components/GradientBackground";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { router } from "expo-router";
import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function LoginScreen() {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const { spacing, safeAreaTop, safeAreaBottom } = useResponsive();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login pressed");
  };

  const handleForgotPassword = () => {
    router.push("/(auth)/forgot-password");
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
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={Platform.OS === "ios" ? 40 : 0}
      >
        {/* Header */}
        <LoginHeader />

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <LoginInput
            label={t("auth.email")}
            placeholder={t("auth.email")}
            value={email}
            onChangeText={setEmail}
            icon="mail"
            keyboardType="email-address"
          />

          {/* Password Input */}
          <LoginInput
            label={t("auth.password")}
            placeholder={t("auth.password")}
            value={password}
            onChangeText={setPassword}
            icon="lock"
            secureTextEntry
          />

          {/* Forgot Password */}
          <ForgotPasswordLink onPress={handleForgotPassword} />

          {/* Login Button */}
          <LoginButton onPress={handleLogin} text={t("auth.login")} />

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
      </KeyboardAwareScrollView>
    </GradientBackground>
  );
}
