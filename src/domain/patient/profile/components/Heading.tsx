import { Patient } from "@/common/types";
import { Image, View, Text } from "react-native";
import UserProfile from "@/assets/images/user-profile.png";
import Button from "@/shared/components/Button";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

type Props = {
  profile: Patient | undefined;
  isAuthenticated: boolean;
};

const Heading = ({ profile, isAuthenticated }: Props) => {
  const { t } = useTranslation();
  return (
    <View className="flex-col items-center justify-center">
      {profile?.user.profile_url && profile?.user.profile_url !== "" ? (
        <Image
          src={profile?.user.profile_url}
          className="w-25 h-25 rounded-full border border-border"
          resizeMode="cover"
          width={100}
          height={100}
        />
      ) : (
        <Image
          source={UserProfile}
          className="w-25 h-25 rounded-full border border-border"
          resizeMode="cover"
          width={100}
          height={100}
        />
      )}
      <Text className="text-2xl font-semibold text-text-primary mt-2">
        {profile?.user.name ?? "Login to your account"}
      </Text>
      {!isAuthenticated ? (
        <Button
          text={t("actions.createAccount")}
          onPress={() => router.push("/auth/register")}
          className="w-full mt-4"
        />
      ) : null}
    </View>
  );
};

export default Heading;
