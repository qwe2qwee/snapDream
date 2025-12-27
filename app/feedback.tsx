import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
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
import { useResponsive } from "@/hooks/useResponsive";
import { router } from "expo-router";

export default function FeedbackScreen() {
  const { spacing, typography, getResponsiveValue, safeAreaBottom } =
    useResponsive();

  const buttonHeight = getResponsiveValue(54, 58, 62, 66, 70);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");

  const categories = [
    { id: "bug", label: "Bug Report", emoji: "🐛" },
    { id: "feature", label: "Feature Request", emoji: "✨" },
    { id: "improvement", label: "Improvement", emoji: "🚀" },
    { id: "other", label: "Other", emoji: "💬" },
  ];

  const handleSubmit = () => {
    if (!selectedCategory) {
      Alert.alert("Category Required", "Please select a feedback category");
      return;
    }
    if (!feedback.trim()) {
      Alert.alert("Feedback Required", "Please enter your feedback");
      return;
    }

    // In a real app, submit to backend
    Alert.alert(
      "Thank You!",
      "Your feedback has been submitted successfully. We appreciate your input!",
      [{ text: "OK", onPress: () => router.back() }]
    );
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
  });

  const isFormValid = selectedCategory && feedback.trim();

  return (
    <View style={styles.container}>
      <GradientBackground>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <ImageGenHeader title="Feedback" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.description}>
              We value your feedback! Help us improve SnackDream by sharing your
              thoughts, reporting bugs, or suggesting new features.
            </Text>

            {/* Category Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Category</Text>
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
              <Text style={styles.sectionTitle}>Your Feedback</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Tell us what's on your mind..."
                placeholderTextColor="#666666"
                multiline
                value={feedback}
                onChangeText={setFeedback}
                maxLength={1000}
              />
            </View>

            {/* Email (Optional) */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Email (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                placeholderTextColor="#666666"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
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
              <Text style={styles.submitButtonText}>Submit Feedback</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </GradientBackground>
    </View>
  );
}
