import Close from "@/assets/icons/Close.svg";
import * as Clipboard from "expo-clipboard";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";

// Import your social media icons
import FacebookIcon from "@/assets/icons/Facebook.svg";
import InstagramIcon from "@/assets/icons/Instagram.svg";
import RedditIcon from "@/assets/icons/Reddit.svg";
import TelegramIcon from "@/assets/icons/Telegram.svg";
import TwitterIcon from "@/assets/icons/Twitter.svg";
import WhatsAppIcon from "@/assets/icons/WhatsApp.svg";

interface SharePlatform {
  name: string;
  icon: React.ReactNode;
  color: string;
  url: (shareUrl: string, text: string) => string;
}

interface ShareModalProps {
  isVisible: boolean;
  onClose: () => void;
  shareUrl: string;
  shareText?: string;
  title?: string;
  showPlatforms?: string[]; // Optional: filter which platforms to show
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isVisible,
  onClose,
  shareUrl,
  shareText = "Check this out!",
  title,
  showPlatforms,
}) => {
  const { t, currentLanguage } = useLanguageStore();
  const isArabic = currentLanguage === "ar";
  const displayTitle = title || t("common.share");
  const { spacing, getResponsiveValue, getBorderRadius, isTablet, width } =
    useResponsive();

  const fonts = useFontFamily();
  const [copied, setCopied] = useState(false);

  // Responsive values
  const responsiveValues = useMemo(
    () => ({
      // Modal width
      modalWidth: isTablet ? width * 0.5 : width * 0.85,

      // Title font size
      titleSize: getResponsiveValue(18, 19, 20, 21, 22),

      // Close button size
      closeButtonSize: getResponsiveValue(28, 30, 32, 34, 36),

      // Social icon size
      socialIconSize: getResponsiveValue(48, 52, 56, 60, 64),

      // Social icon inner size
      socialIconInnerSize: getResponsiveValue(28, 32, 36, 40, 44),

      // URL text size
      urlTextSize: getResponsiveValue(13, 14, 15, 16, 17),

      // Copy button text size
      copyButtonTextSize: getResponsiveValue(13, 14, 15, 16, 17),

      // Border radius
      modalBorderRadius: getBorderRadius("large"),
      socialIconBorderRadius: getResponsiveValue(24, 26, 28, 30, 32),
      urlContainerBorderRadius: getResponsiveValue(12, 14, 16, 18, 20),
      copyButtonBorderRadius: getResponsiveValue(10, 12, 14, 16, 18),
    }),
    [width, getResponsiveValue, getBorderRadius, isTablet]
  );

  // Define social media platforms
  const platforms: SharePlatform[] = [
    {
      name: "facebook",
      icon: (
        <FacebookIcon
          width={responsiveValues.socialIconInnerSize}
          height={responsiveValues.socialIconInnerSize}
        />
      ),
      color: "#1877F2",
      url: (url, text) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
    },
    {
      name: "instagram",
      icon: (
        <InstagramIcon
          width={responsiveValues.socialIconInnerSize}
          height={responsiveValues.socialIconInnerSize}
        />
      ),
      color: "#E4405F",
      url: (url, text) => `instagram://`, // Instagram doesn't support web sharing
    },
    {
      name: "twitter",
      icon: (
        <TwitterIcon
          width={responsiveValues.socialIconInnerSize}
          height={responsiveValues.socialIconInnerSize}
        />
      ),
      color: "#000000",
      url: (url, text) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(text)}`,
    },
    {
      name: "whatsapp",
      icon: (
        <WhatsAppIcon
          width={responsiveValues.socialIconInnerSize}
          height={responsiveValues.socialIconInnerSize}
        />
      ),
      color: "#25D366",
      url: (url, text) =>
        `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    },
    {
      name: "telegram",
      icon: (
        <TelegramIcon
          width={responsiveValues.socialIconInnerSize}
          height={responsiveValues.socialIconInnerSize}
        />
      ),
      color: "#0088CC",
      url: (url, text) =>
        `https://t.me/share/url?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(text)}`,
    },
    {
      name: "reddit",
      icon: (
        <RedditIcon
          width={responsiveValues.socialIconInnerSize}
          height={responsiveValues.socialIconInnerSize}
        />
      ),
      color: "#FF4500",
      url: (url, text) =>
        `https://reddit.com/submit?url=${encodeURIComponent(
          url
        )}&title=${encodeURIComponent(text)}`,
    },
  ];

  // Filter platforms if specified
  const visiblePlatforms = showPlatforms
    ? platforms.filter((p) => showPlatforms.includes(p.name))
    : platforms;

  const handleShare = async (platform: SharePlatform) => {
    try {
      const shareLink = platform.url(shareUrl, shareText);
      const canOpen = await Linking.canOpenURL(shareLink);

      if (canOpen) {
        await Linking.openURL(shareLink);
        onClose();
      } else {
        Alert.alert("Error", `Cannot open ${platform.name}`);
      }
    } catch (error) {
      Alert.alert("Error", `Failed to share on ${platform.name}`);
    }
  };

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      Alert.alert("Error", "Failed to copy link");
    }
  };

  // Truncate URL for display
  const displayUrl =
    shareUrl.length > 30 ? `${shareUrl.substring(0, 30)}...` : shareUrl;

  // Dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      modalContent: {
        width: responsiveValues.modalWidth,
        paddingTop: spacing.lg,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
        borderRadius: responsiveValues.modalBorderRadius,
      },
      closeButton: {
        width: responsiveValues.closeButtonSize,
        height: responsiveValues.closeButtonSize,
        position: "absolute" as const,
        top: 16,
        right: isArabic ? undefined : 16,
        left: isArabic ? 16 : undefined,
      },
      title: {
        fontSize: responsiveValues.titleSize,
        fontFamily: isArabic ? "Zain-Bold" : fonts.Bold,
        marginBottom: spacing.lg,
      },
      socialIconsContainer: {
        gap: spacing.sm,
        marginBottom: spacing.md,
        paddingBottom: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e539",
      },
      socialIcon: {
        width: responsiveValues.socialIconSize,
        height: responsiveValues.socialIconSize,
        borderRadius: responsiveValues.socialIconBorderRadius,
      },
      urlContainer: {
        padding: spacing.md,
        borderRadius: responsiveValues.urlContainerBorderRadius,
        gap: spacing.md,
      },
      urlText: {
        fontSize: responsiveValues.urlTextSize,
        fontFamily: isArabic ? "Zain-Regular" : fonts.Regular,
      },
      copyButton: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm + 2,
        borderRadius: responsiveValues.copyButtonBorderRadius,
      },
      copyButtonText: {
        fontSize: responsiveValues.copyButtonTextSize,
        fontFamily: isArabic ? "Zain-Bold" : fonts.SemiBold,
      },
    }),
    [spacing, fonts, responsiveValues]
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.7}
      backdropColor="#000000"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
      hideModalContentWhileAnimating
      style={styles.modal}
    >
      <View style={[styles.modalContent, dynamicStyles.modalContent]}>
        {/* Close Button */}
        <TouchableOpacity
          style={[styles.closeButton, dynamicStyles.closeButton]}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <Close
            width={responsiveValues.closeButtonSize}
            height={responsiveValues.closeButtonSize}
            color="#8E8E93"
          />
        </TouchableOpacity>

        {/* Title */}
        <Text style={[styles.title, dynamicStyles.title]}>{displayTitle}</Text>

        {/* Social Media Icons */}
        <View
          style={[
            styles.socialIconsContainer,
            dynamicStyles.socialIconsContainer,
          ]}
        >
          {visiblePlatforms.map((platform) => (
            <TouchableOpacity
              key={platform.name}
              style={[styles.socialIcon]}
              onPress={() => handleShare(platform)}
              activeOpacity={0.8}
            >
              {platform.icon}
            </TouchableOpacity>
          ))}
        </View>

        {/* URL Display with Copy Button */}
        <View style={[styles.urlContainer, dynamicStyles.urlContainer]}>
          <Text
            style={[styles.urlText, dynamicStyles.urlText]}
            numberOfLines={1}
          >
            {displayUrl}
          </Text>

          <TouchableOpacity
            style={[styles.copyButton, dynamicStyles.copyButton]}
            onPress={handleCopy}
            activeOpacity={0.8}
          >
            <Text style={[styles.copyButtonText, dynamicStyles.copyButtonText]}>
              {copied
                ? t("common.copied") || "Copied!"
                : t("common.copy") || "Copy"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Static base styles
const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#2C2C2E",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: "relative",
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  socialIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  urlContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  urlText: {
    color: "#FFFFFF",
    flex: 1,
  },
  copyButton: {
    backgroundColor: "#FFFFFF",
  },
  copyButtonText: {
    color: "#0D0D0F",
  },
});
