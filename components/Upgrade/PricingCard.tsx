import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type PricingOption = "monthly" | "yearly";

interface PricingCardProps {
  type: PricingOption;
  price: string;
  credits: string;
  discount?: string;
  isSelected: boolean;
  onPress: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  type,
  price,
  credits,
  discount,
  isSelected,
  onPress,
}) => {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const fonts = useFontFamily();
  const { spacing, getResponsiveValue, getBorderRadius } = useResponsive();

  const priceSize = getResponsiveValue(15, 18, 20, 22, 24);
  const subTextSize = getResponsiveValue(10, 12, 14, 16, 18);
  const creditsSize = getResponsiveValue(10, 12, 14, 16, 18);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",

      padding: spacing.md,
    },
    cardContent: {
      flexDirection: isArabic ? "row-reverse" : "row",
      alignItems: "center",
      gap: spacing.md,
    },
    radioButton: {
      width: getResponsiveValue(23, 26, 29, 32, 35),
      height: getResponsiveValue(23, 26, 29, 32, 35),
      borderRadius: getResponsiveValue(16, 18, 20, 22, 24),
      borderWidth: 2,
      borderColor: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.3)",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isSelected ? "#FFFFFF" : "transparent",
    },
    leftSection: {
      flex: 1,
      alignItems: isArabic ? "flex-end" : "flex-start",
    },
    price: {
      fontSize: priceSize,
      fontFamily: isArabic ? "Zain-Bold" : fonts.Medium,
      color: "#FFFFFF",
      lineHeight: priceSize + 4,
      marginBottom: spacing.xs / 2,
    },
    type: {
      fontSize: subTextSize + 2,
      fontFamily: isArabic ? "Zain-Regular" : fonts.Regular,
      color: "#8E8E93",
    },
    rightSection: {
      alignItems: isArabic ? "flex-start" : "flex-end",
      gap: spacing.sm,
    },
    badge: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: getBorderRadius("large"),
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
    },
    badgeText: {
      fontSize: subTextSize - 3,
      fontFamily: isArabic ? "Zain-Bold" : fonts.SemiBold,
      color: "#FFFFFF",
    },
    credits: {
      fontSize: creditsSize,
      fontFamily: isArabic ? "Zain-Regular" : fonts.Regular,
      color: "#FFFFFF",
    },
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cardContent}>
        {/* Radio Button - Left */}
        <View style={styles.radioButton}>
          {isSelected && (
            <Feather
              name="check"
              size={getResponsiveValue(18, 20, 22, 24, 26)}
              color="#0D0D0F"
            />
          )}
        </View>

        {/* Price & Type - Center */}
        <View style={styles.leftSection}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.type}>
            {type === "monthly" ? t("settings.monthly") : t("settings.yearly")}
          </Text>
        </View>

        {/* Badge & Credits - Right */}
        <View style={styles.rightSection}>
          {discount && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {discount.replace("off", t("settings.off"))}
              </Text>
            </View>
          )}
          <Text style={styles.credits}>
            {credits
              .replace("Credits", t("common.credits"))
              .replace("day", t("common.day"))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
