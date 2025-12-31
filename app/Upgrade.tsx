import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import AdIcon from "@/assets/icons/Ad.svg";
import CustomerIcon from "@/assets/icons/Customer.svg";
import HDIcon from "@/assets/icons/HD.svg";
import LifetimeIcon from "@/assets/icons/Life.svg";
import QuickIcon from "@/assets/icons/Quick.svg";
import SaveIcon from "@/assets/icons/Save.svg";
import { GradientBackground } from "@/components/GradientBackground";
import { PricingHeader } from "@/components/Upgrade/Header";
import { PlanToggle } from "@/components/Upgrade/PlanToggle";
import { PricingButton } from "@/components/Upgrade/PricingButton";
import { PricingCard } from "@/components/Upgrade/PricingCard";
import { PricingFeatures } from "@/components/Upgrade/PricingFeatures";
import { PricingFooter } from "@/components/Upgrade/PricingFooter";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { ImageBackground } from "expo-image";

type PlanType = "basic" | "premium";
type PricingOption = "monthly" | "yearly";

export default function PricingScreen() {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const fonts = useFontFamily();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("basic");
  const [selectedPricing, setSelectedPricing] =
    useState<PricingOption>("yearly");

  const {
    spacing,
    safeAreaTop,
    safeAreaBottom,
    getResponsiveValue,
    isTablet,
    getBorderRadius,
  } = useResponsive();

  const mainHeadingSize = getResponsiveValue(24, 26, 28, 30, 32);
  const horizontalPadding = isTablet ? spacing.xl : spacing.lg;

  /* Features Definitions */
  const premiumFeatures = [
    { icon: QuickIcon, label: t("settings.quickGen") },
    { icon: SaveIcon, label: t("settings.saveCreations") },
    { icon: LifetimeIcon, label: t("settings.lifetimeAccess") },
    { icon: AdIcon, label: t("settings.adFree") },
    { icon: HDIcon, label: t("settings.hdDownloads") },
    { icon: CustomerIcon, label: t("settings.support") },
  ];

  const basicFeatures = [
    {
      icon: QuickIcon,
      label: t("settings.standardGen") || "Standard Generation",
    },
    { icon: SaveIcon, label: t("settings.limitedSaves") || "Limited Saves" },
    { icon: LifetimeIcon, label: t("settings.limitedAccess") },
    { icon: AdIcon, label: t("settings.adsIncluded") },
    { icon: HDIcon, label: t("settings.standardDownloads") },
    {
      icon: CustomerIcon,
      label: t("settings.basicSupport") || "Basic Support",
    },
  ];

  const currentFeatures =
    selectedPlan === "premium" ? premiumFeatures : basicFeatures;

  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingTop: safeAreaTop,
    },
    mainHeading: {
      fontSize: mainHeadingSize,
      fontFamily: isArabic ? "Zain-Bold" : fonts.Bold,
      color: "#FFFFFF",
      textAlign: isArabic ? "right" : "left",
      paddingHorizontal: horizontalPadding,
      marginBottom: spacing.xl,
    },
    cardsContainer: {
      paddingHorizontal: horizontalPadding,
      marginBottom: spacing.xl,
    },
    cardContainer: {
      overflow: "hidden",
      borderRadius: getBorderRadius("large") + 20,
      gap: spacing.xs - 2,
    },
    buttonContainer: {
      paddingHorizontal: horizontalPadding,
      marginBottom: spacing.lg,
    },
  });

  return (
    <GradientBackground>
      <ImageBackground
        source={require("@/assets/images/pricing-bg.jpg")}
        style={styles.backgroundImage}
        blurRadius={0}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            paddingBottom: safeAreaBottom,
            justifyContent: "space-between",
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <PricingHeader title={t("settings.pricing")} />

          <View>
            {/* Main Heading */}
            <Text style={styles.mainHeading}>{t("settings.upgradeTitle")}</Text>

            {/* Plan Toggle */}
            <PlanToggle
              selectedPlan={selectedPlan}
              onSelectPlan={setSelectedPlan}
            />

            {/* Features Grid */}
            <PricingFeatures features={currentFeatures} />

            {/* Pricing Cards */}
            <View style={styles.cardsContainer}>
              <View style={styles.cardContainer}>
                {selectedPlan === "premium" ? (
                  <>
                    <PricingCard
                      type="monthly"
                      price="$49.99"
                      credits="2500 Credits"
                      isSelected={selectedPricing === "monthly"}
                      onPress={() => setSelectedPricing("monthly")}
                    />

                    <PricingCard
                      type="yearly"
                      price="$99.99"
                      credits="5000 Credits"
                      discount="60% off"
                      isSelected={selectedPricing === "yearly"}
                      onPress={() => setSelectedPricing("yearly")}
                    />
                  </>
                ) : (
                  <>
                    <PricingCard
                      type="monthly"
                      price="$10.00"
                      credits="10 Credits/day"
                      isSelected={selectedPricing === "monthly"}
                      onPress={() => setSelectedPricing("monthly")}
                    />
                    <PricingCard
                      type="yearly"
                      price="$100.00"
                      credits="10 Credits/day"
                      isSelected={selectedPricing === "yearly"}
                      onPress={() => setSelectedPricing("yearly")}
                    />
                  </>
                )}
              </View>
            </View>

            {/* CTA Button */}
            <View style={styles.buttonContainer}>
              <PricingButton
                text={t("home.upgradeNow")}
                onPress={() => {
                  console.log(
                    `Upgrade pressed for ${selectedPlan} - ${selectedPricing}`
                  );
                }}
                disabled={false}
              />
            </View>

            {/* Footer Links */}
            <PricingFooter />
          </View>
        </ScrollView>
      </ImageBackground>
    </GradientBackground>
  );
}
