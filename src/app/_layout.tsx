import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import queryClient from "../common/api/queryClient";
import "../common/localisation/i18n";
import "../global.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLocale } from "@/common/localisation/utils";
import useTheme from "@/common/hooks/useTheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    const setLanguage = async () => {
      const locale = await getLocale();
      i18n.changeLanguage(locale ?? "en");
    };
    setLanguage();
  }, [i18n]);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="patient" options={{ headerShown: false }} />
          <Stack.Screen name="doctor" options={{ headerShown: false }} />
        </Stack>
        <StatusBar
          barStyle={theme.includes("dark") ? "light-content" : "dark-content"}
          animated={true}
        />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
