import * as SplashScreen from "expo-splash-screen";
import { useTranslation } from "react-i18next";

import "../common/localisation/i18n";
import "../global.css";

import { Camera } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const { t, i18n } = useTranslation();
  const changeLanguage = () => {
    console.log(i18n.language);
    i18n.changeLanguage(i18n.language === "en" ? "mm" : "en");
  };

  return (
    <View>
      <Text className="text-3xl">{t("welcome")}</Text>
      <TouchableOpacity onPress={changeLanguage}>
        <Camera />
        <Text>Change</Text>
      </TouchableOpacity>
    </View>
  );
}
