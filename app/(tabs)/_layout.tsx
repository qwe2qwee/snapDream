import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import {
  TabList,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from "expo-router/ui";
import React, { useMemo } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

// Import your custom hooks
import { useFontFamily } from "@/hooks/useFontFamily";

// Import your SVG icons
import CommunityIconActive from "@/assets/icons/community-active.svg";
import CommunityIcon from "@/assets/icons/community.svg";
import CreateIcon from "@/assets/icons/create.svg";
import CreationsIconActive from "@/assets/icons/creations-active.svg";
import CreationsIcon from "@/assets/icons/creations.svg";
import HomeIconActive from "@/assets/icons/home-active.svg";
import HomeIcon from "@/assets/icons/home.svg";
import ProfileIconActive from "@/assets/icons/profile-active.svg";
import ProfileIcon from "@/assets/icons/profile.svg";
import { useResponsive } from "@/hooks/useResponsive";

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
const getIcon = (
  name: IconName,
  color: string,
  size: number = 22,
  isFocused?: boolean
) => {
  switch (name) {
    case "home":
      return isFocused ? (
        <HomeIconActive width={size} height={size} />
      ) : (
        <HomeIcon width={size} height={size} />
      );
    case "community":
      return isFocused ? (
        <CommunityIconActive width={size} height={size} />
      ) : (
        <CommunityIcon width={size} height={size} />
      );
    case "create":
      return <CreateIcon width={size} height={size} fill="#0D0D0F" />;
    case "creations":
      return isFocused ? (
        <CreationsIconActive width={size} height={size} />
      ) : (
        <CreationsIcon width={size} height={size} />
      );
    case "profile":
      return isFocused ? (
        <ProfileIconActive width={size} height={size} />
      ) : (
        <ProfileIcon width={size} height={size} />
      );
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
  const {
    spacing,
    getIconSize,
    isVerySmallScreen,
    isSmallScreen,
    getResponsiveValue,
  } = useResponsive();
  const fonts = useFontFamily();

  // Responsive sizes
  const iconSize = useMemo(() => {
    return getResponsiveValue(20, 22, 24, 26, 28);
  }, [getResponsiveValue]);

  const createButtonSize = useMemo(() => {
    return getResponsiveValue(52, 56, 58, 60, 62);
  }, [getResponsiveValue]);

  const createIconSize = useMemo(() => {
    return getResponsiveValue(24, 26, 28, 30, 32);
  }, [getResponsiveValue]);

  const elevation = useMemo(() => {
    return getResponsiveValue(-28, -30, -32, -34, -36);
  }, [getResponsiveValue]);

  const handlePress = (e: GestureResponderEvent) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    props.onPress?.(e);
  };

  // Center "Create" button
  if (isCenter) {
    return (
      <Pressable
        {...props}
        onPress={handlePress}
        style={[styles.createButtonContainer, { marginTop: elevation }]}
      >
        <LinearGradient
          colors={["#FFFFFF", "#E8E8E8"]}
          style={[
            styles.createButton,
            {
              width: createButtonSize,
              height: createButtonSize,
              borderRadius: createButtonSize / 2,
            },
          ]}
        >
          {getIcon(icon, "#0D0D0F", createIconSize)}
        </LinearGradient>
      </Pressable>
    );
  }

  // Regular tab buttons
  const iconColor = isFocused ? "#FFFFFF" : "#6B6B6B";

  // Responsive label font size
  const labelFontSize = isVerySmallScreen ? 10 : isSmallScreen ? 10.5 : 11;

  return (
    <Pressable
      {...props}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.tabButton,
        { gap: spacing.xs * 0.5 },
        pressed && styles.tabButtonPressed,
      ]}
    >
      {getIcon(icon, iconColor, iconSize, isFocused)}
      <Text
        style={[
          styles.tabLabel,
          {
            fontSize: labelFontSize,
            fontFamily: fonts.Medium,
          },
          isFocused && styles.tabLabelActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

// ------------------------------
// Main TabLayout
// ------------------------------
export default function TabLayout() {
  const {
    safeAreaBottom,
    safeAreaLeft,
    safeAreaRight,
    spacing,
    isVerySmallScreen,
    getResponsiveValue,
  } = useResponsive();

  // Responsive dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      tabList: {
        paddingTop: getResponsiveValue(10, 12, 12, 14, 14),
        paddingBottom: Math.max(safeAreaBottom, 8) + spacing.sm,
        paddingLeft: safeAreaLeft || spacing.xs,
        paddingRight: safeAreaRight || spacing.xs,
      },
    }),
    [safeAreaBottom, safeAreaLeft, safeAreaRight, spacing, getResponsiveValue]
  );

  return (
    <Tabs>
      <TabSlot />
      <TabList style={[styles.tabList, dynamicStyles.tabList]}>
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
// Static Styles (non-responsive base styles)
// ------------------------------
const styles = StyleSheet.create({
  tabList: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#141416",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
    paddingVertical: 4,
  },
  tabButtonPressed: {
    opacity: 0.7,
  },
  tabLabel: {
    color: "#6B6B6B",
  },
  tabLabelActive: {
    color: "#FFFFFF",
  },
  createButtonContainer: {
    // marginTop is now dynamic
  },
  createButton: {
    justifyContent: "center",
    alignItems: "center",
    // width, height, borderRadius are now dynamic
  },
});
