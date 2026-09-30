import { View, Text, Pressable } from "react-native";
import { NutOff, ChevronRight, Tablets, UserPen } from "lucide-react-native";
import useTheme from "@/common/hooks/useTheme";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

const PersonalInformation = () => {
  const { colors, text } = useTheme();
  const { t } = useTranslation();
  return (
    <View className="mt-8">
      <Text className="text-text-primary text-lg font-medium">
        {t("profile.personalInformation")}
      </Text>
      <View className="bg-surface p-2 rounded-xl border border-border mt-1">
        <Pressable
          className="flex-row items-center gap-3 py-3 border-b border-border"
          onPress={() => router.push("/patient/profile/edit")}
        >
          <UserPen color={colors.secondary} size={22} />
          <Text className="flex-1 text-text-primary">
            {t("profile.personalInformation")}
          </Text>
          <ChevronRight color={text.secondary} size={24} />
        </Pressable>
        <Pressable className="flex-row items-center gap-3 py-3 border-b border-border">
          <NutOff color={colors.secondary} size={22} />
          <Text className="flex-1 text-text-primary">{t("profile.allergies")}</Text>
          <ChevronRight color={text.secondary} size={24} />
        </Pressable>
        <Pressable className="flex-row items-center gap-3 py-3">
          <Tablets color={colors.secondary} size={22} />
          <Text className="flex-1 text-text-primary">
            {t("profile.conditions")}
          </Text>
          <ChevronRight color={text.secondary} size={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default PersonalInformation;
