import React, { useState } from "react";
import {
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { default as Rate2, default as Star } from "@/assets/icons/Rate.svg";
import { GradientBackground } from "@/components/GradientBackground";
import { ImageGenHeader } from "@/components/Imagegen/ImageGenHeader";
import { ConfirmModal } from "@/components/Modals/modal";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { router } from "expo-router";

export default function RateAppScreen() {
  const { spacing, typography, getResponsiveValue, safeAreaBottom } =
    useResponsive();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const { currentLanguage, t } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const fonts = useFontFamily();

  // Modal states
  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return t("rateApp.rating1");
      case 2:
        return t("rateApp.rating2");
      case 3:
        return t("rateApp.rating3");
      case 4:
        return t("rateApp.rating4");
      case 5:
        return t("rateApp.rating5");
      default:
        return "";
    }
  };

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating >= 4) {
      setRateModalVisible(true);
    } else {
      setFeedbackModalVisible(true);
    }
  };

  const handleRateNow = () => {
    Linking.openURL("https://apps.apple.com/app/snackdream");
    setRateModalVisible(false);
  };

  const handleGiveFeedback = () => {
    setFeedbackModalVisible(false);
    router.push("/feedback");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0D0D0F",
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.xl,
      paddingBottom: safeAreaBottom + spacing.xl,
    },
    iconContainer: {
      width: 120, // Replaced getIconSize call from previous version
      height: 120,
      borderRadius: 60,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    title: {
      fontSize: typography.h2,
      fontFamily: fonts.Bold,
      color: "#FFFFFF",
      textAlign: "center",
      marginBottom: spacing.sm,
    },
    subtitle: {
      fontSize: typography.body,
      fontFamily: fonts.Regular,
      color: "#A0A0A0",
      textAlign: "center",
      marginBottom: spacing.xl * 1.5,
    },
    ratingContainer: {
      width: "100%",
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    starsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: spacing.lg,
    },
    starButton: {
      padding: spacing.xs,
    },
    ratingText: {
      marginTop: spacing.lg,
      fontSize: typography.h3,
      fontFamily: fonts.SemiBold,
      color: "#FFFFFF",
      textAlign: "center",
    },
    submitButton: {
      width: "100%",
      height: getResponsiveValue(54, 58, 62, 66, 70),
      backgroundColor: "#FFFFFF",
      borderRadius: getResponsiveValue(27, 29, 31, 33, 35),
      justifyContent: "center",
      alignItems: "center",
      marginTop: spacing.xl,
    },
    submitButtonDisabled: {
      opacity: 0.5,
    },
    submitButtonText: {
      fontSize: typography.body,
      fontFamily: fonts.Bold,
      color: "#000000",
    },
  });

  return (
    <View style={styles.container}>
      <GradientBackground>
        <StatusBar barStyle="light-content" />
        <ImageGenHeader />

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Star width={60} height={60} color="#FFFFFF" />
          </View>

          <Text style={styles.title}>{t("rateApp.title")}</Text>
          <Text style={styles.subtitle}>{t("rateApp.subtitle")}</Text>

          <View style={styles.ratingContainer}>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.starButton}
                  onPress={() => handleRating(index)}
                  onPressIn={() => setHoveredRating(index)}
                  onPressOut={() => setHoveredRating(0)}
                  activeOpacity={0.7}
                >
                  <Star
                    width={32}
                    height={32}
                    color={
                      index <= (hoveredRating || rating)
                        ? "#FFFFFF"
                        : "rgba(255, 255, 255, 0.2)"
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
            {rating > 0 && (
              <Text style={styles.ratingText}>{getRatingText(rating)}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              rating === 0 && styles.submitButtonDisabled,
            ]}
            disabled={rating === 0}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>{t("rateApp.submit")}</Text>
          </TouchableOpacity>
        </View>

        {/* Rate on Store Modal */}
        <ConfirmModal
          isVisible={rateModalVisible}
          onClose={() => setRateModalVisible(false)}
          onConfirm={handleRateNow}
          iconName="star"
          icon={<Rate2 width={40} height={40} />}
          title={t("rateApp.thankYou")}
          subtitle={t("rateApp.storeRedirectDesc")}
          confirmText={t("rateApp.rateNow")}
          cancelText={t("common.cancel")}
          showCloseButton={true}
        />

        {/* Feedback Modal */}
        <ConfirmModal
          isVisible={feedbackModalVisible}
          onClose={() => setFeedbackModalVisible(false)}
          onConfirm={handleGiveFeedback}
          iconName="message-square"
          icon={<Rate2 width={40} height={40} />}
          title={t("rateApp.thankYou")}
          subtitle={t("rateApp.improveDesc")}
          confirmText={t("rateApp.giveFeedback")}
          cancelText={t("common.cancel")}
          showCloseButton={true}
        />
      </GradientBackground>
    </View>
  );
}
