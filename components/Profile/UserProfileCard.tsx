import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface UserProfileCardProps {
  name: string;
  email: string;
  avatarUri: string;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  email,
  avatarUri,
}) => {
  return (
    <View style={styles.userInfo}>
      <Image source={{ uri: avatarUri }} style={styles.avatar} />
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 14,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 15,
    borderRadius: 27,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 22,
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
});
