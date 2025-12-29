import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { router } from "expo-router";

export default function ContactScreen() {
  const { spacing, typography, getResponsiveValue, safeAreaBottom } =
    useResponsive();

  const buttonHeight = getResponsiveValue(54, 58, 62, 66, 70);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const { currentLanguage, t } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const fonts = useFontFamily();

  const contactMethods = [
    {
      id: "email",
      label: t("contact.emailUs"),
      value: "support@snackdream.app",
      icon: "📧",
      action: () => Linking.openURL("mailto:support@snackdream.app"),
    },
    {
      id: "twitter",
      label: "Twitter",
      value: "@SnackDreamApp",
      icon: "🐦",
      action: () => Linking.openURL("https://twitter.com/snackdreamapp"),
    },
    {
      id: "instagram",
      label: "Instagram",
      value: "@snackdreamapp",
      icon: "📸",
      action: () => Linking.openURL("https://instagram.com/snackdreamapp"),
    },
  ];

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      Alert.alert(t("contact.requiredFields"), t("contact.fillAllFields"));
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert(t("contact.invalidEmail"), t("contact.invalidEmailDesc"));
      return;
    }

    // In a real app, submit to backend
    Alert.alert(t("contact.messageSent"), t("contact.messageSentDesc"), [
      { text: t("contact.ok"), onPress: () => router.back() },
    ]);
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
      paddingBottom:
        getResponsiveValue(120, 140, 140, 160, 180) + safeAreaBottom,
    },
    description: {
      fontSize: typography.body,
      color: "#A0A0A0",
      lineHeight: typography.body * 1.5,
      marginBottom: spacing.lg,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: typography.h3,
      fontWeight: "600",
      color: "#FFFFFF",
      marginBottom: spacing.md,
    },
    contactMethodsContainer: {
      gap: spacing.sm,
    },
    contactMethod: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: 12,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
      gap: spacing.sm,
    },
    contactMethodIcon: {
      fontSize: typography.h2,
    },
    contactMethodContent: {
      flex: 1,
    },
    contactMethodLabel: {
      fontSize: typography.small,
      color: "#666666",
      marginBottom: 2,
    },
    contactMethodValue: {
      fontSize: typography.body,
      color: "#FFFFFF",
      fontWeight: "500",
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
      minHeight: 50,
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
    divider: {
      height: 1,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      marginVertical: spacing.lg,
    },
  });

  const isFormValid =
    name.trim() && email.trim() && subject.trim() && message.trim();

  return (
    <View style={styles.container}>
      <GradientBackground>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <ImageGenHeader title={t("contact.title")} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text
              style={[
                styles.description,
                isArabic && { fontFamily: fonts.Regular },
              ]}
            >
              {t("contact.desc")}
            </Text>

            {/* Contact Methods */}
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionTitle,
                  isArabic && { fontFamily: fonts.Bold },
                ]}
              >
                {t("contact.getInTouch")}
              </Text>
              <View style={styles.contactMethodsContainer}>
                {contactMethods.map((method) => (
                  <TouchableOpacity
                    key={method.id}
                    style={styles.contactMethod}
                    onPress={method.action}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.contactMethodIcon}>{method.icon}</Text>
                    <View style={styles.contactMethodContent}>
                      <Text
                        style={[
                          styles.contactMethodLabel,
                          isArabic && { fontFamily: fonts.Regular },
                        ]}
                      >
                        {method.label}
                      </Text>
                      <Text
                        style={[
                          styles.contactMethodValue,
                          isArabic && { fontFamily: fonts.Medium },
                        ]}
                      >
                        {method.value}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.divider} />

            {/* Contact Form */}
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionTitle,
                  isArabic && { fontFamily: fonts.Bold },
                ]}
              >
                {t("contact.sendMessage")}
              </Text>

              <View style={styles.formSection}>
                <Text
                  style={[
                    styles.label,
                    isArabic && { fontFamily: fonts.SemiBold },
                  ]}
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

              <View style={styles.formSection}>
                <Text
                  style={[
                    styles.label,
                    isArabic && { fontFamily: fonts.SemiBold },
                  ]}
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
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.formSection}>
                <Text
                  style={[
                    styles.label,
                    isArabic && { fontFamily: fonts.SemiBold },
                  ]}
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

              <View style={styles.formSection}>
                <Text
                  style={[
                    styles.label,
                    isArabic && { fontFamily: fonts.SemiBold },
                  ]}
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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </GradientBackground>
    </View>
  );
}
