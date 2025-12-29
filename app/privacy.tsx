import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";

export default function PrivacyScreen() {
  const { spacing, typography, getResponsiveValue, safeAreaBottom } =
    useResponsive();
  const { currentLanguage, t } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const fonts = useFontFamily();

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
      fontFamily: fonts.Bold,
      color: "#FFFFFF",
      marginBottom: spacing.sm,
      textAlign: isArabic ? "right" : "left",
    },
    paragraph: {
      fontSize: typography.body,
      fontFamily: fonts.Regular,
      color: "#A0A0A0",
      lineHeight: typography.body * 1.6,
      marginBottom: spacing.sm,
      textAlign: isArabic ? "right" : "left",
    },
    lastUpdated: {
      fontSize: typography.small,
      fontFamily: fonts.Regular,
      color: "#666666",
      marginBottom: spacing.lg,
      fontStyle: "italic",
      textAlign: isArabic ? "right" : "left",
    },
    bulletPoint: {
      fontSize: typography.body,
      fontFamily: fonts.Regular,
      color: "#A0A0A0",
      lineHeight: typography.body * 1.6,
      marginLeft: isArabic ? 0 : spacing.md,
      marginRight: isArabic ? spacing.md : 0,
      marginBottom: spacing.xs,
      textAlign: isArabic ? "right" : "left",
    },
  });

  return (
    <View style={styles.container}>
      <GradientBackground>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <ImageGenHeader title={t("legal.privacyTitle")} />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.lastUpdated}>{t("legal.lastUpdated")}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("legal.privacySec1Title")}
            </Text>
            <Text style={styles.paragraph}>{t("legal.privacySec1Desc")}</Text>
            <Text style={styles.bulletPoint}>
              • {t("legal.privacySec1Bullet1")}
            </Text>
            <Text style={styles.bulletPoint}>
              • {t("legal.privacySec1Bullet2")}
            </Text>
            <Text style={styles.bulletPoint}>
              • {t("legal.privacySec1Bullet3")}
            </Text>
            <Text style={styles.bulletPoint}>
              • {t("legal.privacySec1Bullet4")}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("legal.privacySec2Title")}
            </Text>
            <Text style={styles.paragraph}>{t("legal.privacySec2Desc")}</Text>
            <Text style={styles.bulletPoint}>
              • {t("legal.privacySec2Bullet1")}
            </Text>
            <Text style={styles.bulletPoint}>
              • {t("legal.privacySec2Bullet2")}
            </Text>
            <Text style={styles.bulletPoint}>
              • {t("legal.privacySec2Bullet3")}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("legal.privacySec3Title")}
            </Text>
            <Text style={styles.paragraph}>{t("legal.privacySec3Desc")}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("legal.privacySec4Title")}
            </Text>
            <Text style={styles.paragraph}>{t("legal.privacySec4Desc")}</Text>
          </View>
        </ScrollView>
      </GradientBackground>
    </View>
  );
}
