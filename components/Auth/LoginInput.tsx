import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import EmailIcon from "../../assets/icons/Email.svg";
import LockIcon from "../../assets/icons/Lock.svg";

interface LoginInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon: "mail" | "lock";
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
}

export const LoginInput: React.FC<LoginInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry = false,
  keyboardType = "default",
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getResponsiveValue, getBorderRadius } =
    useResponsive();

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
    },
    label: {
      fontSize: typography.body,
      fontFamily: fonts.Medium,
      color: "#FFFFFF",
      marginBottom: spacing.sm,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: getBorderRadius("large") + 8,
      paddingHorizontal: spacing.md + spacing.sm - 4,
      height: getResponsiveValue(50, 52, 54, 56, 58),
    },
    input: {
      flex: 1,
      fontSize: typography.body,
      fontFamily: fonts.Regular,
      color: "#FFFFFF",
      marginLeft: spacing.sm,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon === "mail" ? <EmailIcon /> : <LockIcon />}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#8E8E93"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </View>
  );
};
