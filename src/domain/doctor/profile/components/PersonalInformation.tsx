import { View, Text, Pressable } from "react-native";
import {
  ChevronRight,
  GraduationCap,
  HeartPulse,
  UserPen
} from "lucide-react-native";
import useTheme from "@/common/hooks/useTheme";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

type Props = {
  isAuthenticated: boolean;
};

const PersonalInformation = ({ isAuthenticated }: Props) => {
  const { colors, text } = useTheme();
  const { t } = useTranslation();
  return (
    <View className={`mt-8 ${isAuthenticated ? "opacity-100" : "opacity-40"}`}>
      <Text className="text-text-primary text-lg font-medium">
        {t("profile.personalInformation")}
      </Text>
      <View className="bg-surface p-2 rounded-xl border border-border mt-1">
        <Pressable
          className="flex-row items-center gap-3 py-3 border-b border-border"
          onPress={() => router.push("/doctor/profile/edit")}
          disabled={!isAuthenticated}
        >
          <UserPen color={colors.secondary} size={22} />
          <Text className="flex-1 text-text-primary">
            {t("profile.personalInformation")}
          </Text>
          <ChevronRight color={text.secondary} size={24} />
        </Pressable>
        <Pressable
          className="flex-row items-center gap-3 py-3 border-b border-border"
          onPress={() => router.push("/doctor/profile/qualifications")}
          disabled={!isAuthenticated}
        >
          <GraduationCap color={colors.secondary} size={22} />
          <Text className="flex-1 text-text-primary">
            {t("profile.qualifications")}
          </Text>
          <ChevronRight color={text.secondary} size={24} />
        </Pressable>
        <Pressable
          className="flex-row items-center gap-3 py-3"
          onPress={() => router.push("/doctor/profile/specialty")}
          disabled={!isAuthenticated}
        >
          <HeartPulse color={colors.secondary} size={22} />
          <Text className="flex-1 text-text-primary">
            {t("profile.specializations")}
          </Text>
          <ChevronRight color={text.secondary} size={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default PersonalInformation;
