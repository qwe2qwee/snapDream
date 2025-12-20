import { useFontFamily } from "@/hooks/useFontFamily";
import { StyleSheet, Text, View } from "react-native";

export default function Create() {
  const fonts = useFontFamily();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontFamily: fonts.SemiBold }]}>Create</Text>
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
