import useLanguageStore from "@/store/useLanguageStore";
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  const { t } = useLanguageStore();
  return (
    <>
      <Stack.Screen options={{ title: t("common.oops"), headerShown: true }} />
      <View style={styles.container}>
        <Text style={styles.title}>{t("common.notExist")}</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>{t("common.goHome")}</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#0D0D0F",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#8A2BE2",
  },
});
