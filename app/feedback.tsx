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

import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { SuccessModal } from "@/components/Modals/AproveModal";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { router } from "expo-router";

export default function FeedbackScreen() {
  const { spacing, typography, getResponsiveValue, safeAreaBottom } =
    useResponsive();

  const buttonHeight = getResponsiveValue(54, 58, 62, 66, 70);

  const { currentLanguage, t } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const fonts = useFontFamily();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const categories = [
    { id: "bug", label: t("feedback.bug"), emoji: "🐛" },
    { id: "feature", label: t("feedback.feature"), emoji: "✨" },
    { id: "improvement", label: t("feedback.improvement"), emoji: "🚀" },
    { id: "other", label: t("feedback.other"), emoji: "💬" },
  ];

  const handleSubmit = () => {
    // Validation is handled by button disable state, but good to be safe
    if (!selectedCategory || !feedback.trim()) {
      return;
    }

    // In a real app, submit to backend
    setSuccessModalVisible(true);
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
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: typography.body,
      fontWeight: "600",
      color: "#FFFFFF",
      marginBottom: spacing.sm,
    },
    categoriesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.sm,
    },
    categoryButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
      gap: spacing.xs,
    },
    categoryButtonSelected: {
      backgroundColor: "rgba(138, 43, 226, 0.2)",
      borderColor: "#8A2BE2",
    },
    categoryEmoji: {
      fontSize: typography.body,
    },
    categoryLabel: {
      fontSize: typography.small,
      color: "#A0A0A0",
      fontWeight: "500",
    },
    categoryLabelSelected: {
      color: "#FFFFFF",
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
    description: {
      fontSize: typography.small,
      color: "#666666",
      lineHeight: typography.small * 1.5,
      marginBottom: spacing.lg,
    },
    buttonContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "transparent",
      paddingHorizontal: spacing.md,
      paddingBottom: safeAreaBottom + spacing.md,
    },
  });

  const isFormValid = selectedCategory && feedback.trim();

  return (
    <View style={styles.container}>
      <GradientBackground>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <ImageGenHeader title={t("feedback.title")} />

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
          <Text
            style={[
              styles.description,
              isArabic && { fontFamily: fonts.Regular },
            ]}
          >
            {t("feedback.desc")}
          </Text>

          {/* Category Selection */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                isArabic && { fontFamily: fonts.SemiBold },
              ]}
            >
              {t("feedback.category")}
            </Text>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id &&
                      styles.categoryButtonSelected,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                  <Text
                    style={[
                      styles.categoryLabel,
                      selectedCategory === category.id &&
                        styles.categoryLabelSelected,
                      isArabic && { fontFamily: fonts.Medium },
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Feedback Text */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                isArabic && { fontFamily: fonts.SemiBold },
              ]}
            >
              {t("feedback.yourFeedback")}
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                isArabic && { fontFamily: fonts.Regular, textAlign: "right" },
              ]}
              placeholder={t("feedback.feedbackPlaceholder")}
              placeholderTextColor="#666666"
              multiline
              value={feedback}
              onChangeText={setFeedback}
              maxLength={1000}
            />
          </View>

          {/* Email (Optional) */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                isArabic && { fontFamily: fonts.SemiBold },
              ]}
            >
              {t("feedback.emailOptional")}
            </Text>
            <TextInput
              style={[
                styles.input,
                isArabic && { fontFamily: fonts.Regular, textAlign: "right" },
              ]}
              placeholder={t("feedback.emailPlaceholder")}
              placeholderTextColor="#666666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </KeyboardAwareScrollView>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
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
              {t("feedback.submit")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Success Modal */}
        <SuccessModal
          isVisible={successModalVisible}
          onClose={() => setSuccessModalVisible(false)}
          onContinue={() => {
            setSuccessModalVisible(false);
            router.back();
          }}
          title={t("feedback.thankYou")}
          subtitle={t("feedback.feedbackSentDesc")}
          buttonText={t("feedback.ok")}
          showCloseButton={false}
        />
      </GradientBackground>
    </View>
  );
}
