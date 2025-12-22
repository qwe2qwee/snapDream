import React, { useState } from "react";
import { Alert, ScrollView, StatusBar, StyleSheet, View } from "react-native";

import Contact from "@/assets/icons/Contact.svg";
import Delete2 from "@/assets/icons/Dele.svg";
import Delete from "@/assets/icons/Delete.svg";
import FeedBack from "@/assets/icons/Feedback.svg";
import Logout from "@/assets/icons/Logout.svg";
import Logout2 from "@/assets/icons/Logout2.svg";
import Privacy from "@/assets/icons/Privacy.svg";
import Rate from "@/assets/icons/Rate.svg";
import Terms from "@/assets/icons/Terms.svg";

import { PageHeader } from "@/components/Creations/PageHeader";
import { GradientBackground } from "@/components/GradientBackground";
import { ConfirmModal } from "@/components/Modals/modal";
import { MenuItem } from "@/components/Profile/MenuItem";
import { MenuSection } from "@/components/Profile/MenuSection";
import { SectionTitle } from "@/components/Profile/SectionTitle";
import { UpgradeBanner } from "@/components/Profile/UpgradeBanner";
import { UserProfileCard } from "@/components/Profile/UserProfileCard";
import { useResponsive } from "@/hooks/useResponsive";

export default function ProfileScreen() {
  const { spacing, getResponsiveValue, safeAreaBottom, getIconSize } =
    useResponsive();
  const iconSize = getIconSize("medium");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Modal states
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleLogout = () => {
    // Show logout modal instead of Alert
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    // Perform logout action
    setIsLoggedIn(false);
    Alert.alert("Logged Out", "You have been successfully logged out");
  };

  const handleDeleteAccount = () => {
    // Show delete modal instead of Alert
    setDeleteModalVisible(true);
  };

  const confirmDeleteAccount = async () => {
    // In a real app, call your delete account API here
    try {
      // await deleteAccountAPI();
      Alert.alert(
        "Account Deleted",
        "Your account has been permanently deleted"
      );
      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert("Error", "Failed to delete account");
    }
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
          <PageHeader
            title="Profile"
            onPress={() => setIsLoggedIn(true)}
            isLoggedIn={isLoggedIn}
          />

          {/* User Info */}
          {isLoggedIn && (
            <UserProfileCard
              name="Coozy"
              email="coozy890@gmail.com"
              avatarUri="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
              loginType="Google"
            />
          )}

          {/* Upgrade Banner */}
          <UpgradeBanner
            onPress={() => console.log("Upgrade pressed")}
            isSubscribed={true}
            isLoggedIn={isLoggedIn}
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

        {/* Logout Confirmation Modal */}
        <ConfirmModal
          isVisible={logoutModalVisible}
          onClose={() => setLogoutModalVisible(false)}
          onConfirm={confirmLogout}
          iconName="log-out"
          icon={<Logout2 width={iconSize} height={iconSize} />}
          title="Log Out"
          subtitle="Do you really want to log out?"
          confirmText="Log Out"
          showCloseButton={true}
        />

        {/* Delete Account Confirmation Modal */}
        <ConfirmModal
          isVisible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={confirmDeleteAccount}
          icon={<Delete2 width={iconSize} height={iconSize} />}
          iconName="trash-2"
          title="Delete Account"
          subtitle="Permanently delete account?  Everything will be lost."
          confirmText="Delete"
          showCloseButton={true}
        />
      </GradientBackground>
    </View>
  );
}
