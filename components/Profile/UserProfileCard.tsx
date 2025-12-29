import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface UserProfileCardProps {
  name: string;
  email: string;
  avatarUri: string;
  loginType: string;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  email,
  avatarUri,
  loginType,
}) => {
  const { currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const fonts = useFontFamily();
  const {
    spacing,
    typography,
    getResponsiveValue,
    getBorderRadius,
    getImageSize,
  } = useResponsive();

  const avatarSize = getImageSize("avatar");

  const styles = StyleSheet.create({
    userInfo: {
      flexDirection: isArabic ? "row-reverse" : "row",
      alignItems: "center",
      marginBottom: spacing.md + spacing.xs,
      gap: spacing.sm + spacing.xs / 2,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      padding: spacing.sm + spacing.xs,
      borderRadius: getBorderRadius("large"),
    },
    avatar: {
      width: avatarSize,
      height: avatarSize,
      borderRadius: getBorderRadius("medium") + spacing.xs / 2,
      backgroundColor: "#1A1A1D",
    },
    userDetails: {
      flex: 1,
    },
    loginType: {
      fontSize: typography.caption,
      fontFamily: isArabic ? "Zain-Bold" : fonts.Medium,
      color: "#ffffffff",
    },
    loginTypeContainer: {
      backgroundColor: "#ffffff14",
      paddingVertical: spacing.xs + 3,
      paddingHorizontal: spacing.md,
      borderColor: "#ffffff1d",
      borderWidth: 2,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: getBorderRadius("large") + 7,
    },
    userName: {
      fontSize: typography.h4,
      fontFamily: isArabic ? "Zain-Bold" : fonts.SemiBold,
      color: "#FFFFFF",
      marginBottom: 2,
    },
    userEmail: {
      fontSize: typography.caption,
      color: "#6B6B6B",
    },
  });

  return (
    <View style={styles.userInfo}>
      <Image source={{ uri: avatarUri }} style={styles.avatar} />
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{email}</Text>
      </View>
      <View style={styles.loginTypeContainer}>
        <Text style={styles.loginType}>{loginType}</Text>
      </View>
    </View>
  );
};
