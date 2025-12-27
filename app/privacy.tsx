import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { useResponsive } from "@/hooks/useResponsive";

export default function PrivacyScreen() {
  const { spacing, typography, getResponsiveValue, safeAreaBottom } =
    useResponsive();

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
        getResponsiveValue(80, 100, 100, 120, 140) + safeAreaBottom,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: typography.h3,
      fontWeight: "600",
      color: "#FFFFFF",
      marginBottom: spacing.sm,
    },
    paragraph: {
      fontSize: typography.body,
      color: "#A0A0A0",
      lineHeight: typography.body * 1.6,
      marginBottom: spacing.sm,
    },
    lastUpdated: {
      fontSize: typography.small,
      color: "#666666",
      marginBottom: spacing.lg,
      fontStyle: "italic",
    },
    bulletPoint: {
      fontSize: typography.body,
      color: "#A0A0A0",
      lineHeight: typography.body * 1.6,
      marginLeft: spacing.md,
      marginBottom: spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      <GradientBackground>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <ImageGenHeader title="Privacy Policy" />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.lastUpdated}>
            Last Updated: December 27, 2025
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Information We Collect</Text>
            <Text style={styles.paragraph}>
              We collect information that you provide directly to us, including:
            </Text>
            <Text style={styles.bulletPoint}>
              • Account information (name, email)
            </Text>
            <Text style={styles.bulletPoint}>
              • Images and videos you upload
            </Text>
            <Text style={styles.bulletPoint}>• Usage data and preferences</Text>
            <Text style={styles.bulletPoint}>
              • Device information and analytics
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              2. How We Use Your Information
            </Text>
            <Text style={styles.paragraph}>
              We use the information we collect to:
            </Text>
            <Text style={styles.bulletPoint}>
              • Provide, maintain, and improve our services
            </Text>
            <Text style={styles.bulletPoint}>
              • Process your AI generation requests
            </Text>
            <Text style={styles.bulletPoint}>
              • Send you technical notices and updates
            </Text>
            <Text style={styles.bulletPoint}>
              • Respond to your comments and questions
            </Text>
            <Text style={styles.bulletPoint}>
              • Protect against fraudulent or illegal activity
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Data Storage & Security</Text>
            <Text style={styles.paragraph}>
              We implement appropriate technical and organizational measures to
              protect your personal information. Your uploaded images are
              processed securely and stored with encryption. We retain your data
              only as long as necessary to provide our services.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. AI Processing</Text>
            <Text style={styles.paragraph}>
              Images and videos you upload are processed by our AI systems to
              generate the requested outputs. We do not use your personal images
              to train our AI models without your explicit consent. Generated
              content may be temporarily cached to improve performance.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Third-Party Services</Text>
            <Text style={styles.paragraph}>
              We may use third-party services for analytics, payment processing,
              and cloud storage. These services have their own privacy policies
              and we encourage you to review them. We do not sell your personal
              information to third parties.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Your Rights</Text>
            <Text style={styles.paragraph}>You have the right to:</Text>
            <Text style={styles.bulletPoint}>• Access your personal data</Text>
            <Text style={styles.bulletPoint}>
              • Request data correction or deletion
            </Text>
            <Text style={styles.bulletPoint}>
              • Opt-out of marketing communications
            </Text>
            <Text style={styles.bulletPoint}>• Export your data</Text>
            <Text style={styles.bulletPoint}>• Delete your account</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Children's Privacy</Text>
            <Text style={styles.paragraph}>
              SnackDream is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children under
              13. If you believe we have collected information from a child
              under 13, please contact us immediately.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              8. International Data Transfers
            </Text>
            <Text style={styles.paragraph}>
              Your information may be transferred to and processed in countries
              other than your country of residence. We ensure appropriate
              safeguards are in place to protect your data in accordance with
              this Privacy Policy.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              9. Changes to Privacy Policy
            </Text>
            <Text style={styles.paragraph}>
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new Privacy
              Policy in the app and updating the "Last Updated" date.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. Contact Us</Text>
            <Text style={styles.paragraph}>
              If you have questions about this Privacy Policy or our data
              practices, please contact us through the Contact Us page in the
              app.
            </Text>
          </View>
        </ScrollView>
      </GradientBackground>
    </View>
  );
}
