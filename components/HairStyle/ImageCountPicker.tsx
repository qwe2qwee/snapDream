import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Modal from "react-native-modal";

interface ImageCountPickerProps {
  selectedCount: number;
  onSelectCount: (count: number) => void;
  maxCount?: number;
}

export const ImageCountPicker: React.FC<ImageCountPickerProps> = ({
  selectedCount,
  onSelectCount,
  maxCount = 4,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonLayout, setButtonLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const buttonRef = React.useRef<View>(null);
  const fonts = useFontFamily();
  const { spacing, getResponsiveValue, safeAreaBottom } = useResponsive();

  const buttonHeight = getResponsiveValue(54, 58, 62, 66, 70);
  const itemHeight = getResponsiveValue(44, 46, 48, 50, 52);

  const counts = Array.from({ length: maxCount }, (_, i) => i + 1);

  const handlePress = () => {
    buttonRef.current?.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        setButtonLayout({ x: pageX, y: pageY, width, height });
        setIsOpen(true);
      }
    );
  };

  const handleSelect = (count: number) => {
    onSelectCount(count);
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <View
        ref={buttonRef}
        collapsable={false} // Ensure view doesn't get optimized away
      >
        <TouchableOpacity
          style={[
            styles.countButton,
            {
              height: buttonHeight,
              paddingHorizontal: spacing.md,
              borderRadius: getResponsiveValue(16, 20, 24, 26, 30),
            },
          ]}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.countText,
              {
                fontSize: getResponsiveValue(14, 15, 16, 17, 18),
                fontFamily: fonts.Medium,
              },
            ]}
          >
            {selectedCount} Img
          </Text>
          <Feather
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      {/* Dropdown Modal */}
      <Modal
        isVisible={isOpen}
        onBackdropPress={() => setIsOpen(false)}
        backdropTransitionOutTiming={0}
        backdropTransitionInTiming={0}
        animationIn="fadeIn"
        backdropOpacity={0}
        animationOut="fadeOut"
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.dropdown,
                  {
                    left: buttonLayout.x,
                    bottom: safeAreaBottom + buttonLayout.height + spacing.md,
                    width: buttonLayout.width,
                    borderRadius: getResponsiveValue(12, 14, 16, 18, 20),
                    padding: spacing.xs,
                  },
                ]}
              >
                {counts.map((count) => (
                  <TouchableOpacity
                    key={count}
                    style={[
                      styles.dropdownItem,
                      {
                        height: itemHeight,
                        borderRadius: getResponsiveValue(8, 10, 12, 14, 16),
                        paddingHorizontal: spacing.sm,
                      },
                      selectedCount === count && styles.dropdownItemSelected,
                    ]}
                    onPress={() => handleSelect(count)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        {
                          fontSize: getResponsiveValue(14, 15, 16, 17, 18),
                          fontFamily: fonts.Medium,
                        },
                        selectedCount === count && styles.dropdownTextSelected,
                      ]}
                    >
                      {count} Img
                    </Text>
                    {selectedCount === count && (
                      <Feather name="check" size={18} color="#FFFFFF" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  countButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: 100,
  },
  countText: {
    color: "#FFFFFF",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#1F1F24",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownItemSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  dropdownText: {
    color: "#8E8E93",
  },
  dropdownTextSelected: {
    color: "#FFFFFF",
  },
});
