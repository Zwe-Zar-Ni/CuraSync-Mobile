import useTheme from "@/common/hooks/useTheme";
import { languages } from "@/common/localisation/i18n";
import { setLocale } from "@/common/localisation/utils";
import { router } from "expo-router";
import { ChevronLeft, Circle, CircleCheck } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LanguagePage = () => {
  const { i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const { colors, text } = useTheme();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLocale(language);
  };

  return (
    <View
      className="flex-1 bg-background px-3"
      style={{ paddingTop: insets.top + 8 }}
    >
      <View className="flex-row gap-2 items-center mb-2">
        <Pressable onPress={() => router.back()} className="p-2 pl-0">
          <ChevronLeft color={text.secondary} size={24} />
        </Pressable>
        <Text className="text-text-primary font-semibold text-xl">
          Language
        </Text>
      </View>
      <View className="gap-2 p-2">
        {languages.map((language) => (
          <Pressable
            key={language.id}
            onPress={() => changeLanguage(language.id)}
            className="flex-row items-center gap-2 border-b p-4 border-border"
          >
            <View className="flex-1 flex-row items-center gap-2">
              <Text>{language.flag}</Text>
              <Text
                className={`font-medium ${i18n.language === language.id ? "text-primary" : "text-text-primary"}`}
              >
                {language.name}
              </Text>
            </View>
            {i18n.language === language.id ? (
              <CircleCheck color={text.primary} size={24} />
            ) : (
              <Circle color={text.primary} size={24} />
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default LanguagePage;
