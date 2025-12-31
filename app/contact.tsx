import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { SuccessModal } from "@/components/Modals/AproveModal";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import * as Linking from "expo-linking";
import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function ContactScreen() {
  const { spacing, typography, getResponsiveValue, safeAreaBottom } =
    useResponsive();
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const fonts = useFontFamily();

  const buttonHeight = getResponsiveValue(54, 58, 62, 66, 70);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // Email validation regex
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    isValidEmail(email) &&
    subject.trim().length > 0 &&
    message.trim().length > 0;

  const handleSubmit = () => {
    if (!isFormValid) return;

    // Simulate API call
    setSuccessModalVisible(true);
  };

  const handleSuccessClose = () => {
    setSuccessModalVisible(false);
    // Reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0D0D0F",
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: spacing.md,
      flexGrow: 1,
    },
    formSection: {
      marginBottom: spacing.lg,
    },
    label: {
      fontSize: typography.small,
      fontWeight: "600",
      color: "#FFFFFF",
      marginBottom: spacing.xs,
    },
    input: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: 12,
      padding: spacing.md,
      fontSize: typography.body,
      color: "#FFFFFF",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    textArea: {
      minHeight: 150,
      textAlignVertical: "top",
    },
    submitButton: {
      backgroundColor: "#FFFFFF",
      height: buttonHeight,
      borderRadius: buttonHeight / 2,
      alignItems: "center",
      justifyContent: "center",
      marginTop: spacing.md,
    },
    submitButtonDisabled: {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
    submitButtonText: {
      fontSize: typography.body,
      fontWeight: "700",
      color: "#0D0D0F",
    },
    supportEmailContainer: {
      marginTop: spacing.xl,
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    supportEmailLabel: {
      fontSize: typography.body,
      color: "#A0A0A0",
      marginBottom: spacing.xs,
      fontFamily: fonts.Regular,
    },
    supportEmail: {
      fontSize: typography.body,
      color: "#FFFFFF",
      fontFamily: fonts.Bold,
      textDecorationLine: "underline",
    },
  });

  return (
    <View style={styles.container}>
      <GradientBackground>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <ImageGenHeader title={t("contact.title")} />

        <KeyboardAwareScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: spacing.xl * 2 + safeAreaBottom + 80,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          bottomOffset={Platform.OS === "ios" ? 40 : 0}
        >
          {/* Name Input */}
          <View style={styles.formSection}>
            <Text
              style={[styles.label, isArabic && { fontFamily: fonts.SemiBold }]}
            >
              {t("contact.name")}
            </Text>
            <TextInput
              style={[
                styles.input,
                isArabic && {
                  fontFamily: fonts.Regular,
                  textAlign: "right",
                },
              ]}
              placeholder={t("contact.namePlaceholder")}
              placeholderTextColor="#666666"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email Input */}
          <View style={styles.formSection}>
            <Text
              style={[styles.label, isArabic && { fontFamily: fonts.SemiBold }]}
            >
              {t("contact.email")}
            </Text>
            <TextInput
              style={[
                styles.input,
                isArabic && {
                  fontFamily: fonts.Regular,
                  textAlign: "right",
                },
              ]}
              placeholder={t("contact.emailPlaceholder")}
              placeholderTextColor="#666666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Subject Input */}
          <View style={styles.formSection}>
            <Text
              style={[styles.label, isArabic && { fontFamily: fonts.SemiBold }]}
            >
              {t("contact.subject")}
            </Text>
            <TextInput
              style={[
                styles.input,
                isArabic && {
                  fontFamily: fonts.Regular,
                  textAlign: "right",
                },
              ]}
              placeholder={t("contact.subjectPlaceholder")}
              placeholderTextColor="#666666"
              value={subject}
              onChangeText={setSubject}
            />
          </View>

          {/* Message Input */}
          <View style={styles.formSection}>
            <Text
              style={[styles.label, isArabic && { fontFamily: fonts.SemiBold }]}
            >
              {t("contact.message")}
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                isArabic && {
                  fontFamily: fonts.Regular,
                  textAlign: "right",
                },
              ]}
              placeholder={t("contact.messagePlaceholder")}
              placeholderTextColor="#666666"
              multiline
              value={message}
              onChangeText={setMessage}
              maxLength={1000}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              !isFormValid && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!isFormValid}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.submitButtonText,
                isArabic && { fontFamily: fonts.Bold },
              ]}
            >
              {t("contact.send")}
            </Text>
          </TouchableOpacity>

          {/* Support Email Link */}
          <View style={styles.supportEmailContainer}>
            <Text style={styles.supportEmailLabel}>{t("contact.emailUs")}</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("mailto:support@snackdream.app")}
            >
              <Text style={styles.supportEmail}>support@snackdream.app</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

        <SuccessModal
          isVisible={successModalVisible}
          onClose={handleSuccessClose}
          title={t("contact.successTitle")}
          subtitle={t("contact.successMessage")}
          buttonText={t("common.ok")}
          onContinue={handleSuccessClose}
        />
      </GradientBackground>
    </View>
  );
}
