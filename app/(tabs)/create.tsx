import { useFontFamily } from "@/hooks/useFontFamily";
import useLanguageStore from "@/store/useLanguageStore";
import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Create() {
  const fonts = useFontFamily();
  const { toggleLanguage } = useLanguageStore();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontFamily: fonts.SemiBold }]}>Create</Text>
      <Button title="Open Modal" onPress={() => router.push("/(auth)/login")} />
      <Button title="Toggle Language" onPress={toggleLanguage} />
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
