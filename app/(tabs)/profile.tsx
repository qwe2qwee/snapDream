import Contact from "@/assets/icons/Contact.svg";
import Delete from "@/assets/icons/Delete.svg";
import FeedBack from "@/assets/icons/Feedback.svg";
import Logout from "@/assets/icons/Logout.svg";
import Privacy from "@/assets/icons/Privacy.svg";
import Rate from "@/assets/icons/Rate.svg";
import Terms from "@/assets/icons/Terms.svg";

import { PageHeader } from "@/components/Creations/PageHeader";
import { GradientBackground } from "@/components/GradientBackground";
import { MenuItem } from "@/components/Profile/MenuItem";
import { MenuSection } from "@/components/Profile/MenuSection";
import { SectionTitle } from "@/components/Profile/SectionTitle";
import { UpgradeBanner } from "@/components/Profile/UpgradeBanner";
import { UserProfileCard } from "@/components/Profile/UserProfileCard";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { Alert, ScrollView, StatusBar, StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  const { spacing, getResponsiveValue, safeAreaBottom, getIconSize } =
    useResponsive();
  const iconSize = getIconSize("medium");

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0D0D0F",
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: spacing.md,
      paddingBottom:
        getResponsiveValue(100, 120, 120, 140, 160) + safeAreaBottom,
    },
  });

  return (
    <View style={styles.container}>
      <GradientBackground>
        <StatusBar barStyle="light-content" />

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
            loginType="Google"
          />
          {/* google, facebook, email*/}

          {/* Upgrade Banner */}
          <UpgradeBanner
            onPress={() => console.log("Upgrade pressed")}
            isSubscribed={true}
          />

          {/* Too Precious Section */}
          <SectionTitle title="Too precious!" />
          <MenuSection>
            <MenuItem
              icon={<Terms width={iconSize} height={iconSize} />}
              label="Terms and Conditions"
            />
            <MenuItem
              icon={<Privacy width={iconSize} height={iconSize} />}
              isMiddleItem
              label="Privacy Policy"
            />
            <MenuItem
              icon={<Rate width={iconSize} height={iconSize} />}
              label="Rate App"
            />
          </MenuSection>

          {/* Security Section */}
          <SectionTitle title="Security" />
          <MenuSection>
            <MenuItem
              icon={<FeedBack width={iconSize} height={iconSize} />}
              label="Feedback"
            />
            <MenuItem
              icon={<Contact width={iconSize} height={iconSize} />}
              isMiddleItem
              label="Contact Us"
            />
            <MenuItem
              icon={<Logout width={iconSize} height={iconSize} />}
              label="Log Out"
              isLastItem
              onPress={handleLogout}
              isDestructive
            />
            <MenuItem
              icon={<Delete width={iconSize} height={iconSize} />}
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
