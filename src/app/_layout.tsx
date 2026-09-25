import * as SplashScreen from "expo-splash-screen";
import "../global.css";

import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  return (
    <View>
      <Text className="text-3xl">Hello world</Text>
    </View>
  );
}
