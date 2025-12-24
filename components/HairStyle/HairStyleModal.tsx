import {
  ALL_HAIR_COLORS,
  COLOR_CATEGORIES,
  HAIR_STYLES,
  HairColor,
  HairStyle,
  STYLE_CATEGORIES,
} from "@/constants/hairStyleData";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

// ==========================================
// HAIR STYLE SELECTION MODAL
// ==========================================
interface HairStyleModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedStyle?: HairStyle;
  onSelectStyle: (style: HairStyle) => void;
}

export const HairStyleModal: React.FC<HairStyleModalProps> = ({
  isVisible,
  onClose,
  selectedStyle,
  onSelectStyle,
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius, width, safeAreaTop } =
    useResponsive();

  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof STYLE_CATEGORIES>("bangs");

  const filteredStyles = HAIR_STYLES.filter(
    (style) => style.category === selectedCategory
  );

  const handleSelectStyle = (style: HairStyle) => {
    onSelectStyle(style);
    onClose();
  };

  const styles = StyleSheet.create({
    modal: {
      margin: 0,
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: "#1A1A1A",
      borderTopLeftRadius: getBorderRadius("large") + spacing.md,
      borderTopRightRadius: getBorderRadius("large") + spacing.md,
      maxHeight: "85%",
      paddingTop: spacing.lg,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    title: {
      fontSize: typography.h3,
      fontFamily: fonts.Bold,
      color: "#FFFFFF",
    },
    closeButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      justifyContent: "center",
      alignItems: "center",
    },
    categoryContainer: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    categoryScroll: {
      flexDirection: "row",
      gap: spacing.sm,
    },
    categoryButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: getBorderRadius("large"),
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    categoryButtonActive: {
      backgroundColor: "#FFFFFF",
    },
    categoryText: {
      fontSize: typography.caption,
      fontFamily: fonts.Medium,
      color: "#8E8E93",
    },
    categoryTextActive: {
      color: "#000000",
    },
    gridContainer: {
      padding: spacing.lg,
    },
    styleCard: {
      width: (width - spacing.lg * 3 - spacing.md) / 2,
      marginBottom: spacing.md,
      borderRadius: getBorderRadius("medium"),
      overflow: "hidden",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    styleCardSelected: {
      borderWidth: 3,
      borderColor: "#FFFFFF",
    },
    styleImage: {
      width: "100%",
      aspectRatio: 3 / 4,
      backgroundColor: "#2A2A2A",
    },
    styleName: {
      padding: spacing.sm,
      fontSize: typography.caption,
      fontFamily: fonts.Medium,
      color: "#FFFFFF",
      textAlign: "center",
    },
    checkmark: {
      position: "absolute",
      top: spacing.sm,
      right: spacing.sm,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
    },
  });

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
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Select Hair Style</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Category Tabs */}
        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {Object.entries(STYLE_CATEGORIES).map(([key, label]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.categoryButton,
                  selectedCategory === key && styles.categoryButtonActive,
                ]}
                onPress={() =>
                  setSelectedCategory(key as keyof typeof STYLE_CATEGORIES)
                }
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === key && styles.categoryTextActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Styles Grid */}
        <FlatList
          data={filteredStyles}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={{ gap: spacing.md }}
          renderItem={({ item }) => {
            const isSelected = selectedStyle?.id === item.id;
            return (
              <TouchableOpacity
                style={[
                  styles.styleCard,
                  isSelected && styles.styleCardSelected,
                ]}
                onPress={() => handleSelectStyle(item)}
                activeOpacity={0.7}
              >
                <Image source={{ uri: item.image }} style={styles.styleImage} />
                <Text style={styles.styleName}>{item.name}</Text>
                {isSelected && (
                  <View style={styles.checkmark}>
                    <Feather name="check" size={16} color="#000000" />
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Modal>
  );
};

// ==========================================
// HAIR COLOR SELECTION MODAL
// ==========================================
interface HairColorModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedColor?: HairColor;
  onSelectColor: (color: HairColor) => void;
}

export const HairColorModal: React.FC<HairColorModalProps> = ({
  isVisible,
  onClose,
  selectedColor,
  onSelectColor,
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius, width } = useResponsive();

  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof COLOR_CATEGORIES>("natural");

  const filteredColors = ALL_HAIR_COLORS.filter(
    (color) => color.category === selectedCategory
  );

  const handleSelectColor = (color: HairColor) => {
    onSelectColor(color);
    onClose();
  };

  const styles = StyleSheet.create({
    modal: {
      margin: 0,
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: "#1A1A1A",
      borderTopLeftRadius: getBorderRadius("large") + spacing.md,
      borderTopRightRadius: getBorderRadius("large") + spacing.md,
      maxHeight: "85%",
      paddingTop: spacing.lg,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    title: {
      fontSize: typography.h3,
      fontFamily: fonts.Bold,
      color: "#FFFFFF",
    },
    closeButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      justifyContent: "center",
      alignItems: "center",
    },
    categoryContainer: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    categoryScroll: {
      flexDirection: "row",
      gap: spacing.sm,
    },
    categoryButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: getBorderRadius("large"),
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    categoryButtonActive: {
      backgroundColor: "#FFFFFF",
    },
    categoryText: {
      fontSize: typography.caption,
      fontFamily: fonts.Medium,
      color: "#8E8E93",
    },
    categoryTextActive: {
      color: "#000000",
    },
    gridContainer: {
      padding: spacing.lg,
    },
    colorCard: {
      width: (width - spacing.lg * 3 - spacing.md * 2) / 3,
      marginBottom: spacing.md,
      alignItems: "center",
    },
    colorCircle: {
      width: (width - spacing.lg * 3 - spacing.md * 2) / 3 - spacing.sm,
      aspectRatio: 1,
      borderRadius: 1000,
      borderWidth: 3,
      borderColor: "transparent",
      marginBottom: spacing.xs,
    },
    colorCircleSelected: {
      borderColor: "#FFFFFF",
      borderWidth: 4,
    },
    colorName: {
      fontSize: typography.small,
      fontFamily: fonts.Regular,
      color: "#FFFFFF",
      textAlign: "center",
    },
    checkmark: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: [{ translateX: -12 }, { translateY: -28 }],
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
    },
  });

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
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Select Hair Color</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Category Tabs */}
        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {Object.entries(COLOR_CATEGORIES).map(([key, label]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.categoryButton,
                  selectedCategory === key && styles.categoryButtonActive,
                ]}
                onPress={() =>
                  setSelectedCategory(key as keyof typeof COLOR_CATEGORIES)
                }
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === key && styles.categoryTextActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Colors Grid */}
        <FlatList
          data={filteredColors}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={{ gap: spacing.md }}
          renderItem={({ item }) => {
            const isSelected = selectedColor?.id === item.id;
            return (
              <TouchableOpacity
                style={styles.colorCard}
                onPress={() => handleSelectColor(item)}
                activeOpacity={0.7}
              >
                {item.gradient ? (
                  <LinearGradient
                    colors={item.gradient as any}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                      styles.colorCircle,
                      isSelected && styles.colorCircleSelected,
                    ]}
                  />
                ) : (
                  <View
                    style={[
                      styles.colorCircle,
                      { backgroundColor: item.color },
                      isSelected && styles.colorCircleSelected,
                    ]}
                  />
                )}
                <Text style={styles.colorName} numberOfLines={2}>
                  {item.name}
                </Text>
                {isSelected && (
                  <View style={styles.checkmark}>
                    <Feather name="check" size={16} color="#000000" />
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Modal>
  );
};
