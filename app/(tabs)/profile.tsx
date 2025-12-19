import { PageHeader } from "@/components/Creations/PageHeader";
import { GradientBackground } from "@/components/GradientBackground";
import { MenuItem } from "@/components/Profile/MenuItem";
import { MenuSection } from "@/components/Profile/MenuSection";
import { SectionTitle } from "@/components/Profile/SectionTitle";
import { UpgradeBanner } from "@/components/Profile/UpgradeBanner";
import { UserProfileCard } from "@/components/Profile/UserProfileCard";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { Alert, ScrollView, StatusBar, StyleSheet, View } from "react-native";

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
      <GradientBackground>
        <StatusBar barStyle="light-content" backgroundColor="#0D0D0F" />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <PageHeader title="Profile" />

          {/* User Info */}
          <UserProfileCard
            name="Coozy"
            email="coozy890@gmail.com"
            avatarUri="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
          />

          {/* Upgrade Banner */}
          <UpgradeBanner
            onPress={() => console.log("Upgrade pressed")}
            isSubscribed={true}
          />

          {/* Security Section */}
          <SectionTitle title="Security" />
          <MenuSection>
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
          </MenuSection>

          {/* Too Precious Section */}
          <SectionTitle title="Too precious!" />
          <MenuSection>
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
          </MenuSection>
        </ScrollView>
      </GradientBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0F",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
});
