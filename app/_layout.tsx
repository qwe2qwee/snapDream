import useLanguageStore from "@/store/useLanguageStore";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export const unstable_settings = {
  initialRouteName: "onboarding",
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "SFProText-Regular": require("../assets/font/SFProText-Regular.otf"),
    "SFProText-Medium": require("../assets/font/SFProText-Medium.otf"),
    "SFProText-Semibold": require("../assets/font/SFProText-Semibold.otf"),
    "SFProDisplay-Bold": require("../assets/font/SFProDisplay-Bold.otf"),
    "Zain-Bold": require("../assets/font/Zain-Bold.ttf"),
    "Zain-Regular": require("../assets/font/Zain-Regular.ttf"),
  });

  const { isHydrated } = useLanguageStore();

  if (!fontsLoaded || !isHydrated) {
    return null;
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
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
