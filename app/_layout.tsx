import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    "SFProText-Regular": require("../assets/font/SFProText-Regular.otf"),
    "SFProText-Medium": require("../assets/font/SFProText-Medium.otf"),
    "SFProText-Semibold": require("../assets/font/SFProText-Semibold.otf"),
    "SFProDisplay-Bold": require("../assets/font/SFProDisplay-Bold.otf"),

    "Zain-Bold": require("../assets/font/Zain-Bold.ttf"),
    "Zain-Regular": require("../assets/font/Zain-Regular.ttf"),
  });

  // ⛔️ مهم جدًا
  if (!fontsLoaded) {
    return null; // أو SplashScreen
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="hairstyle" />
        <Stack.Screen name="cloth-swap" />
        <Stack.Screen name="image-result" />
        <Stack.Screen name="video-result" />
        <Stack.Screen name="details/[id]" />
        <Stack.Screen name="[...not-found]" />
        {/* Specific presentation for modals if needed */}
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
