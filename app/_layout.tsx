import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    "SFProText-Regular": require("../assets/font/SFProText-Regular.otf"),
    "SFProText-Medium": require("../assets/font/SFProText-Medium.otf"),
    "SFProText-Semibold": require("../assets/font/SFProText-Semibold.otf"),
    "SFProDisplay-Bold": require("../assets/font/SFProDisplay-Bold.otf"),
  });

  // ⛔️ مهم جدًا
  if (!fontsLoaded) {
    return null; // أو SplashScreen
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="effects/video" options={{ headerShown: false }} />
        <Stack.Screen name="effects/image" options={{ headerShown: false }} />
        <Stack.Screen name="Upgrade" options={{ headerShown: false }} />
        <Stack.Screen name="image-result" options={{ headerShown: false }} />
        <Stack.Screen name="video-result" options={{ headerShown: false }} />
        <Stack.Screen name="cloth-swap" options={{ headerShown: false }} />
        <Stack.Screen name="hairstyle/index" options={{ headerShown: false }} />
        <Stack.Screen
          name="hairstyle/result"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="video-generation"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="image-generation"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="details/community/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="details/creations/[id]"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="effects/hairstyle"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="effects/tryon" options={{ headerShown: false }} />

        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/forgot-password"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)/verify-email"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
