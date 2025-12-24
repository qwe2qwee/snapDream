import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import { Image, ImageSource } from "expo-image";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

interface EffectItem {
  id: number;
  title: string;
  image: ImageSource | string | number;
}

interface EffectsModalProps {
  isVisible: boolean;
  onClose: () => void;
  effects: EffectItem[];
  onSelectEffect: (id: number) => void;
  currentEffectId: number;
}

export const EffectsModal: React.FC<EffectsModalProps> = ({
  isVisible,
  onClose,
  effects,
  onSelectEffect,
  currentEffectId,
}) => {
  const fonts = useFontFamily();
  const { spacing, typography, getBorderRadius, getResponsiveValue, width } =
    useResponsive();

  const numColumns = 3;
  const gap = spacing.md;
  const padding = spacing.lg;
  const availableWidth = width - padding * 2 - gap * (numColumns - 1);
  const itemWidth = availableWidth / numColumns;

  const styles = StyleSheet.create({
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalContent: {
      backgroundColor: "#1C1C1E",
      borderTopLeftRadius: getBorderRadius("large"),
      borderTopRightRadius: getBorderRadius("large"),
      height: "70%",
      paddingTop: spacing.md,
    },
    handle: {
      width: 40,
      height: 4,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 2,
      alignSelf: "center",
      marginBottom: spacing.lg,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: typography.h4,
      fontFamily: fonts.Bold,
      color: "#FFFFFF",
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      justifyContent: "center",
      alignItems: "center",
    },
    gridContainer: {
      paddingHorizontal: spacing.lg,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: gap,
      paddingBottom: spacing.xl,
    },
    itemContainer: {
      width: itemWidth,
      marginBottom: spacing.md,
    },
    imageContainer: {
      width: itemWidth,
      height: itemWidth,
      borderRadius: getBorderRadius("medium"),
      overflow: "hidden",
      marginBottom: spacing.xs,
      position: "relative",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    selectedBorder: {
      borderWidth: 2,
      borderColor: "#FFFFFF",
    },
    itemTitle: {
      fontSize: typography.caption,
      fontFamily: fonts.Medium,
      color: "#FFFFFF",
      textAlign: "center",
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      backdropOpacity={0.7}
      propagateSwipe={true}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View style={styles.modalContent}>
        <View style={styles.handle} />

        <View style={styles.header}>
          <Text style={styles.title}>Effects</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {effects.map((effect) => {
              const isSelected = effect.id === currentEffectId;

              return (
                <TouchableOpacity
                  key={effect.id}
                  style={styles.itemContainer}
                  onPress={() => {
                    if (!isSelected) {
                      onSelectEffect(effect.id);
                      onClose();
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.imageContainer,
                      isSelected && styles.selectedBorder,
                    ]}
                  >
                    <Image
                      source={effect.image}
                      style={styles.image}
                      contentFit="cover"
                    />
                  </View>
                  <Text style={styles.itemTitle} numberOfLines={2}>
                    {effect.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
