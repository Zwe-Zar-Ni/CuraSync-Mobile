import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import Button from "@/shared/components/Button";
import WelcomeImage from "../assets/images/welcome.png";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "@/shared/components/LanguageSwitch";

const index = () => {
  const { t } = useTranslation();
  return (
    <View className="flex-1 h-screen bg-background justify-center items-center px-3">
      <View className="flex-row justify-end w-full">
        <LanguageSwitch />
      </View>
      <Image
        source={WelcomeImage}
        width={300}
        height={300}
        resizeMode="contain"
        className="w-75 h-75 mt-8"
      />
      <View className="my-12">
        <Text className="text-3xl  leading-12  font-bold text-text-primary text-center mb-2">
          {t("index.title")}
        </Text>
        <Text className="text-md font-medium text-text-primary text-center">
          {t("index.subtitle")}
        </Text>
        <Button
          onPress={() => router.push("/auth/register")}
          text={t("index.createAccount")}
          className="mt-8"
        />
        <Button
          onPress={() => router.push("/auth/login")}
          text={t("index.login")}
          variant="outline"
          className="mt-2"
        />
      </View>
      <View className="flex-row justify-center gap-1">
        <Text className="text-text-primary">{t("index.doctor")}</Text>
        <Pressable onPress={() => router.push("/auth/register-doctor")}>
          <Text className="text-primary underline">
            {t("index.doctorRegister")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default index;
