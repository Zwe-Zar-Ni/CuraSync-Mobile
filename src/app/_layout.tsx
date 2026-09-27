import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useUniwind } from "uniwind";
import queryClient from "../common/api/queryClient";
import "../common/localisation/i18n";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { theme } = useUniwind();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="patient" options={{ headerShown: false }} />
        </Stack>
        <StatusBar
          barStyle={theme.includes("dark") ? "light-content" : "dark-content"}
          animated={true}
        />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
