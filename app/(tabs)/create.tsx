import { useFontFamily } from "@/hooks/useFontFamily";
import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Create() {
  const fonts = useFontFamily();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontFamily: fonts.SemiBold }]}>Create</Text>
      <Button title="Open Modal" onPress={() => router.push("/(auth)/login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
  },
});
