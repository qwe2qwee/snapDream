import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PromptDisplayProps {
  prompt: string;
}

export const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius } = useResponsive();

  const handleCopy = async () => {
    await Clipboard.setStringAsync(prompt);
    Alert.alert("Copied!", "Prompt copied to clipboard");
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
        <Text style={styles.label}>Prompt</Text>
        <TouchableOpacity onPress={handleCopy} activeOpacity={0.7}>
          <Feather name="copy" size={18} color="#8E8E93" />
        </TouchableOpacity>
      </View>
      <View style={styles.promptBox}>
        <Text style={styles.promptText}>{prompt}</Text>
      </View>
    </View>
  );
};
