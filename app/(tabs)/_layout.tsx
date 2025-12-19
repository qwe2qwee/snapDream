import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import {
  TabList,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from "expo-router/ui";
import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

// ------------------------------
// Import your SVG icons
// Make sure the file names match exactly (case-sensitive)
// ------------------------------
import CommunityIcon from "@/assets/icons/community.svg";
import CreateIcon from "@/assets/icons/create.svg";
import CreationsIcon from "@/assets/icons/creations.svg";
import HomeIcon from "@/assets/icons/home.svg";
import ProfileIcon from "@/assets/icons/profile.svg";

type IconName = "home" | "community" | "create" | "creations" | "profile";

interface TabButtonProps extends TabTriggerSlotProps {
  icon: IconName;
  label: string;
  isCenter?: boolean;
  isFocused?: boolean;
}

// ------------------------------
// Map icon name to SVG component
// ------------------------------
const getIcon = (name: IconName, color: string, size: number = 22) => {
  switch (name) {
    case "home":
      return <HomeIcon width={size} height={size} />;
    case "community":
      return <CommunityIcon width={size} height={size} />;
    case "create":
      return <CreateIcon width={26} height={26} fill="#0D0D0F" />;
    case "creations":
      return <CreationsIcon width={size} height={size} />;
    case "profile":
      return <ProfileIcon width={size} height={size} />;
    default:
      return null;
  }
};

// ------------------------------
// Tab button component
// ------------------------------
function TabButton({
  icon,
  label,
  isCenter = false,
  isFocused,
  ...props
}: TabButtonProps) {
  const handlePress = (e: GestureResponderEvent) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    props.onPress?.(e);
  };

  if (isCenter) {
    return (
      <Pressable
        {...props}
        onPress={handlePress}
        style={styles.createButtonContainer}
      >
        <LinearGradient
          colors={["#FFFFFF", "#E8E8E8"]}
          style={styles.createButton}
        >
          {getIcon(icon, "#0D0D0F")}
        </LinearGradient>
      </Pressable>
    );
  }

  const iconColor = isFocused ? "#FFFFFF" : "#6B6B6B";

  return (
    <Pressable
      {...props}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.tabButton,
        pressed && styles.tabButtonPressed,
      ]}
    >
      {getIcon(icon, iconColor)}
      <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

// ------------------------------
// Main TabLayout
// ------------------------------
export default function TabLayout() {
  return (
    <Tabs>
      <TabSlot />
      <TabList style={styles.tabList}>
        <TabTrigger name="index" href="/" asChild>
          <TabButton icon="home" label="Home" />
        </TabTrigger>

        <TabTrigger name="community" href="/community" asChild>
          <TabButton icon="community" label="Community" />
        </TabTrigger>

        <TabTrigger name="create" href="/create" asChild>
          <TabButton icon="create" label="" isCenter />
        </TabTrigger>

        <TabTrigger name="creations" href="/creations" asChild>
          <TabButton icon="creations" label="Creations" />
        </TabTrigger>

        <TabTrigger name="profile" href="/profile" asChild>
          <TabButton icon="profile" label="Profile" />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

// ------------------------------
// Styles
// ------------------------------
const styles = StyleSheet.create({
  tabList: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#141416",
    paddingTop: 12,
    paddingBottom: 28,

    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    minWidth: 60,
    paddingVertical: 4,
  },
  tabButtonPressed: {
    opacity: 0.7,
  },
  tabLabel: {
    color: "#6B6B6B",
    fontSize: 11,
    fontWeight: "500",
  },
  tabLabelActive: {
    color: "#FFFFFF",
  },
  createButtonContainer: {
    marginTop: -30,
  },
  createButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});
