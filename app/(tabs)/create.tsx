import { useFontFamily } from "@/hooks/useFontFamily";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Create() {
  const fonts = useFontFamily();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontFamily: fonts.SemiBold }]}>Create</Text>
      <TouchableOpacity
        onPress={() => router.push("/(auth)/login")}
        style={styles.button}
      >
        <Text style={[styles.text, { fontFamily: fonts.SemiBold }]}>Login</Text>
      </TouchableOpacity>
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
    color: "#ffffffff",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#000000",
    borderRadius: 5,
  },
});
