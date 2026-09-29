import useTheme from "@/common/hooks/useTheme";
import { languages } from "@/common/localisation/i18n";
import { setLocale } from "@/common/localisation/utils";
import { Circle, CircleCheck, X } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View, Text } from "react-native";
import Modal from "react-native-modal";

const LanguageSwitch = () => {
  const { text } = useTheme();
  const { i18n } = useTranslation();

  const [visibility, setVisibility] = useState(false);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLocale(language);
    setVisibility(false);
  };

  return (
    <View>
      <Pressable
        className={`w-full flex-row items-center gap-2 bg-surface rounded-lg p-3 border border-border`}
        onPress={() => setVisibility(true)}
      >
        <Text className="text-xl    ">
          {languages.find((language) => language.id === i18n.language)?.flag}
        </Text>
      </Pressable>
      <Modal
        style={{ justifyContent: "flex-end", margin: 0 }}
        backdropColor={"#0C0C0C"}
        onBackButtonPress={() => setVisibility(false)}
        onBackdropPress={() => setVisibility(false)}
        isVisible={visibility}
      >
        <View className="bg-background pb-8">
          <View className="relative bg-surface py-3 px-2 items-center">
            <Text className="text-md text-text-primary font-medium">
              Choose Language
            </Text>
            <View className="absolute top-3 right-4">
              <Pressable onPress={() => setVisibility(false)}>
                <X color={text.secondary} />
              </Pressable>
            </View>
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
      </Modal>
    </View>
  );
};

export default LanguageSwitch;
