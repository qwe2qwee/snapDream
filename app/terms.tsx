import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { useResponsive } from "@/hooks/useResponsive";

export default function TermsScreen() {
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
  });

  return (
    <View style={styles.container}>
      <GradientBackground>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <ImageGenHeader title="Terms & Conditions" />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.lastUpdated}>
            Last Updated: December 27, 2025
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
            <Text style={styles.paragraph}>
              By accessing and using SnackDream, you accept and agree to be
              bound by the terms and provision of this agreement. If you do not
              agree to abide by the above, please do not use this service.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Use License</Text>
            <Text style={styles.paragraph}>
              Permission is granted to temporarily download one copy of the
              materials on SnackDream for personal, non-commercial transitory
              viewing only. This is the grant of a license, not a transfer of
              title.
            </Text>
            <Text style={styles.paragraph}>
              Under this license you may not: modify or copy the materials; use
              the materials for any commercial purpose or for any public
              display; attempt to reverse engineer any software contained in
              SnackDream; remove any copyright or other proprietary notations
              from the materials.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. User Content</Text>
            <Text style={styles.paragraph}>
              You retain all rights to the content you upload to SnackDream. By
              uploading content, you grant us a worldwide, non-exclusive,
              royalty-free license to use, reproduce, and display your content
              solely for the purpose of providing our services.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. AI-Generated Content</Text>
            <Text style={styles.paragraph}>
              All AI-generated images and videos created through SnackDream are
              provided "as is" without warranties. You are responsible for
              ensuring that your use of AI-generated content complies with
              applicable laws and regulations.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Prohibited Uses</Text>
            <Text style={styles.paragraph}>
              You may not use SnackDream to: create harmful, offensive, or
              illegal content; impersonate others; violate intellectual property
              rights; distribute malware or engage in any activity that disrupts
              the service.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Subscription & Payments</Text>
            <Text style={styles.paragraph}>
              Subscription fees are billed in advance on a recurring basis.
              Subscriptions automatically renew unless cancelled before the
              renewal date. Refunds are provided in accordance with our refund
              policy.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Termination</Text>
            <Text style={styles.paragraph}>
              We may terminate or suspend your account and access to the service
              immediately, without prior notice or liability, for any reason,
              including breach of these Terms.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Limitation of Liability</Text>
            <Text style={styles.paragraph}>
              In no event shall SnackDream or its suppliers be liable for any
              damages arising out of the use or inability to use the materials
              on SnackDream, even if SnackDream or an authorized representative
              has been notified of the possibility of such damage.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Changes to Terms</Text>
            <Text style={styles.paragraph}>
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes. Your continued use of
              SnackDream after such modifications constitutes acceptance of the
              updated terms.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. Contact Information</Text>
            <Text style={styles.paragraph}>
              If you have any questions about these Terms, please contact us
              through the Contact Us page in the app.
            </Text>
          </View>
        </ScrollView>
      </GradientBackground>
    </View>
  );
}
