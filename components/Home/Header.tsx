import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  credits?: number;
  onProPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  credits = 5000,
  onProPress,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>SnapDream</Text>
      <View style={styles.headerRight}>
        <View style={styles.creditsContainer}>
          <MaterialCommunityIcons
            name="circle-multiple"
            size={16}
            color="#ffffffff"
          />
          <Text style={styles.creditsText}>{credits}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={onProPress}>
          <LinearGradient
            colors={["#f5550b", "#ffa47add"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.proButton}
          >
            <Text style={styles.proButtonText}>Go Pro</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
  },
  logo: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  creditsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252530ff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 6,
  },
  creditsText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  proButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  proButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
