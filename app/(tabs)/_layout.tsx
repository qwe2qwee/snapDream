import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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

type IconName = "home" | "community" | "create" | "creations" | "profile";

interface TabButtonProps extends TabTriggerSlotProps {
  icon: IconName;
  label: string;
  isCenter?: boolean;
}

const getIcon = (name: IconName, color: string, size: number = 22) => {
  switch (name) {
    case "home":
      return <Ionicons name="home" size={size} color={color} />;
    case "community":
      return <Ionicons name="people-outline" size={size} color={color} />;
    case "create":
      return (
        <MaterialCommunityIcons name="creation" size={26} color="#0D0D0F" />
      );
    case "creations":
      return (
        <MaterialCommunityIcons name="grid-large" size={size} color={color} />
      );
    case "profile":
      return <Feather name="user" size={size} color={color} />;
    default:
      return null;
  }
};

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

const styles = StyleSheet.create({
  tabList: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#141416",
    paddingTop: 12,
    paddingBottom: 28,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
