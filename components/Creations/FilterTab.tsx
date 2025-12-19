import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface FilterTabProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export const FilterTab = ({ label, isActive, onPress }: FilterTabProps) => (
  <TouchableOpacity
    style={[styles.filterTab, isActive && styles.filterTabActive]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text
      style={[styles.filterTabText, isActive && styles.filterTabTextActive]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  filterTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#1A1A1D",
  },
  filterTabActive: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  filterTabTextActive: {
    color: "#FFFFFF",
  },
});
