import EmailIcon from "@/assets/icons/Email.svg";
import { LoginButton } from "@/components/Auth/LoginButton";
import { GradientBackground } from "@/components/GradientBackground";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const { spacing, typography, getResponsiveValue, safeAreaBottom } =
    useResponsive();
  const fonts = useFontFamily();

  const handleVerified = () => {
    router.push("/(auth)/login");
  };

  const handleResend = () => {
    console.log("Resend requested");
  };

  const handleChangeEmail = () => {
    router.back();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.xl,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: getResponsiveValue(60, 80, 100, 120, 140),
    },
    iconContainer: {
      marginBottom: spacing.xl,
    },
    title: {
      fontSize: getResponsiveValue(24, 26, 28, 30, 32),
      fontFamily: fonts.Bold,
      color: "#FFFFFF",
      marginBottom: spacing.sm,
      textAlign: "center",
    },
    subtitle: {
      fontSize: typography.body,
      fontFamily: fonts.Regular,
      color: "rgba(255, 255, 255, 0.6)",
      textAlign: "center",
      lineHeight: typography.body * 1.5,
    },
    emailText: {
      color: "rgba(255, 255, 255, 0.6)",
      fontFamily: fonts.Medium,
    },
    changeEmailContainer: {
      marginTop: spacing.md,
    },
    changeEmailText: {
      fontSize: typography.body,
      fontFamily: fonts.Medium,
      color: "#FFFFFF",
    },
    footer: {
      paddingBottom: safeAreaBottom + spacing.lg,
      width: "100%",
    },
    resendContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: spacing.lg,
    },
    resendText: {
      fontSize: typography.body,
      fontFamily: fonts.Regular,
      color: "rgba(255, 255, 255, 0.6)",
    },
    resendLink: {
      fontFamily: fonts.Bold,
      color: "#FFFFFF",
    },
  });

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <EmailIcon width={80} height={80} color="#FFFFFF" />
          </View>

          <Text style={styles.title}>Verify your email</Text>

          <Text style={styles.subtitle}>
            A verification link has been sent to{"\n"}
            <Text style={styles.emailText}>
              {email || "coozy890@gmail.com"}
            </Text>
          </Text>

          <TouchableOpacity
            style={styles.changeEmailContainer}
            onPress={handleChangeEmail}
            activeOpacity={0.7}
          >
            <Text style={styles.changeEmailText}>Change email ?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <LoginButton onPress={handleVerified} text="I've Verified" />

          <TouchableOpacity
            style={styles.resendContainer}
            onPress={handleResend}
            activeOpacity={0.7}
          >
            <Text style={styles.resendText}>
              Didn't receive the email?{" "}
              <Text style={styles.resendLink}>Resend</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </GradientBackground>
  );
}
