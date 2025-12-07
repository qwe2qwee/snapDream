import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  isDestructive?: boolean;
}

const MenuItem = ({
  icon,
  label,
  onPress,
  isDestructive = false,
}: MenuItemProps) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuIconContainer}>{icon}</View>
    <Text style={[styles.menuLabel, isDestructive && styles.destructiveText]}>
      {label}
    </Text>
    <Feather name="chevron-right" size={20} color="#4A4A4A" />
  </TouchableOpacity>
);

const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: () => {} },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {} },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1E2D43", "#272A2A", "#121212", "#0C0C0C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* User Info */}
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
              }}
              style={styles.avatar}
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Coozy</Text>
              <Text style={styles.userEmail}>coozy890@gmail.com</Text>
            </View>
          </View>

          {/* Upgrade Banner */}
          <TouchableOpacity style={styles.upgradeBanner} activeOpacity={0.9}>
            <LinearGradient
              colors={["#1a2a3a", "#0d1a2a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bannerGradient}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
                }}
                style={styles.bannerImage}
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
                style={styles.bannerOverlay}
              />
              <View style={styles.bannerContent}>
                <Text style={styles.bannerText}>Upgrade Now to Level Up</Text>
                <Feather name="arrow-up-right" size={20} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Security Section */}
          <SectionTitle title="Security" />
          <View style={styles.menuSection}>
            <MenuItem
              icon={
                <MaterialIcons name="description" size={20} color="#FFFFFF" />
              }
              label="Terms & Condition"
            />
            <MenuItem
              icon={
                <MaterialCommunityIcons
                  name="shield-check"
                  size={20}
                  color="#FFFFFF"
                />
              }
              label="Privacy Policy"
            />
            <MenuItem
              icon={<Ionicons name="star" size={20} color="#FFFFFF" />}
              label="Rate App"
            />
          </View>

          {/* Too Precious Section */}
          <SectionTitle title="Too precious!" />
          <View style={styles.menuSection}>
            <MenuItem
              icon={
                <MaterialIcons
                  name="chat-bubble-outline"
                  size={20}
                  color="#FFFFFF"
                />
              }
              label="Feedback"
            />
            <MenuItem
              icon={<Feather name="phone" size={20} color="#FFFFFF" />}
              label="Contact Us"
            />
            <MenuItem
              icon={<MaterialIcons name="logout" size={20} color="#E85454" />}
              label="Log Out"
              onPress={handleLogout}
              isDestructive
            />
            <MenuItem
              icon={<Feather name="trash-2" size={20} color="#E85454" />}
              label="Delete Account"
              onPress={handleDeleteAccount}
              isDestructive
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0F",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1A1A1D",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: "#6B6B6B",
  },
  upgradeBanner: {
    height: 140,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
  },
  bannerGradient: {
    flex: 1,
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  bannerContent: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B6B6B",
    marginBottom: 12,
    marginTop: 8,
  },
  menuSection: {
    backgroundColor: "#141416",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 14,
  },
  menuIconContainer: {
    width: 24,
    alignItems: "center",
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "400",
  },
  destructiveText: {
    color: "#E85454",
  },
});
