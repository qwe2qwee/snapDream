import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface OptionsPickerProps {
  label: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export const OptionsPicker: React.FC<OptionsPickerProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
    },
    label: {
      fontSize: typography.caption,
      fontFamily: fonts.Regular,
      color: "#8E8E93",
      marginBottom: spacing.sm,
    },
    optionsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.sm,
    },
    option: {
      paddingVertical: spacing.sm + spacing.xs,
      paddingHorizontal: spacing.lg,
      borderRadius: getBorderRadius("large"),
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      minWidth: 60,
      alignItems: "center",
    },
    optionSelected: {
      backgroundColor: "#FFFFFF",
    },
    optionText: {
      fontSize: typography.body,
      fontFamily: fonts.Medium,
      color: "#FFFFFF",
    },
    optionTextSelected: {
      color: "#0D0D0F",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsRow}>
        {options.map((option) => {
          const isSelected = option === selectedValue;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => onSelect(option)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
