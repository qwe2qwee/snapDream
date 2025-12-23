import MagicPen from "@/assets/icons/Magicpen.svg";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface PromptInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onAIGenerate?: () => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChangeText,
  onAIGenerate,
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius, getResponsiveValue } =
    useResponsive();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    label: {
      fontSize: typography.caption,
      fontFamily: fonts.Regular,
      color: "#FFFFFF",
      marginBottom: spacing.sm,
    },
    inputWrapper: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: getBorderRadius("large"),
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
      padding: spacing.md,
      minHeight: getResponsiveValue(200, 200, 200, 200, 200),
      position: "relative",
    },
    input: {
      fontSize: typography.body,
      fontFamily: fonts.Regular,
      color: "#FFFFFF",
      flex: 1,
    },
    aiButton: {
      position: "absolute",
      bottom: spacing.md,
      right: spacing.md,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Prompt</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter prompt or Generate prompt with Image"
          placeholderTextColor="#8E8E93"
          value={value}
          onChangeText={onChangeText}
          multiline
          textAlignVertical="top"
        />
        {onAIGenerate && (
          <TouchableOpacity
            style={styles.aiButton}
            onPress={onAIGenerate}
            activeOpacity={0.7}
          >
            <MagicPen />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
