import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useUniwind } from "uniwind";
import "../common/localisation/i18n";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { theme } = useUniwind();
  console.log(theme);
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: true }} />
        <Stack.Screen name="patient" options={{ headerShown: false }} />
      </Stack>
      <StatusBar
        barStyle={theme.includes("dark") ? "light-content" : "dark-content"}
        animated={true}
      />
    </SafeAreaProvider>
  );
}
