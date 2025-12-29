import { LoginButton } from "@/components/Auth/LoginButton";
import { LoginHeader } from "@/components/Auth/LoginHeader";
import { LoginInput } from "@/components/Auth/LoginInput";
import { GradientBackground } from "@/components/GradientBackground";
import { SuccessModal } from "@/components/Modals/AproveModal";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function ForgotPasswordScreen() {
  const { t } = useLanguageStore();
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
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={Platform.OS === "ios" ? 40 : 0}
      >
        {/* Header */}
        <LoginHeader
          title={t("auth.forgotPasswordtitle")}
          subtitle={t("auth.forgotPasswordDesc")}
        />

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

          {/* Send Link Button */}
          <LoginButton onPress={handleSendLink} text={t("auth.sendLink")} />
        </View>
      </KeyboardAwareScrollView>

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
        title={t("auth.linkSent")}
        subtitle={`${t("auth.recoveryEmailSent")}${
          email || t("auth.email").toLowerCase()
        }`}
        buttonText={t("common.continue")}
      />
    </GradientBackground>
  );
}
