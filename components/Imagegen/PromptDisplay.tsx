import { SuccessModal } from "@/components/Modals/AproveModal";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PromptDisplayProps {
  prompt: string;
}

export const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius } = useResponsive();
  const { t } = useLanguageStore();
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(prompt);
    setSuccessModalVisible(true);
    // Auto close after 1.5 seconds
    setTimeout(() => {
      setSuccessModalVisible(false);
    }, 1500);
  };

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: spacing.sm,
    },
    label: {
      fontSize: typography.body,
      fontFamily: fonts.SemiBold,
      color: "#FFFFFF",
    },
    promptBox: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: getBorderRadius("medium"),
      padding: spacing.md,
    },
    promptText: {
      fontSize: typography.caption,
      fontFamily: fonts.Regular,
      color: "#AEAEB2",
      lineHeight: typography.caption * 1.5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{t("features.prompt") || "Prompt"}</Text>
        <TouchableOpacity onPress={handleCopy} activeOpacity={0.7}>
          <Feather name="copy" size={18} color="#8E8E93" />
        </TouchableOpacity>
      </View>
      <View style={styles.promptBox}>
        <Text style={styles.promptText}>{prompt}</Text>
      </View>

      <SuccessModal
        isVisible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
        title={t("common.copied")}
        subtitle={t("common.copiedDesc") || ""}
        buttonText={t("common.ok")}
        showCloseButton={false}
        // If ApproveModal/SuccessModal doesn't strictly support single button without redirect, passing empty onContinue might be needed if it requires it, but usually it's optional or handled.
        // Assuming SuccessModal from previous context works as a simple info modal too if configured.
        onContinue={() => setSuccessModalVisible(false)}
      />
    </View>
  );
};
