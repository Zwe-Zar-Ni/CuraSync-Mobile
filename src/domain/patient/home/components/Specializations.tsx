import { View, Text, Image } from "react-native";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { useGetSpecializations } from "../queries";
import { FlashList } from "@shopify/flash-list";
import Pulse from "@/assets/images/pulse.png";

const Specializations = () => {
  const { t } = useTranslation();
  const { data } = useGetSpecializations();

  return (
    <View className="mt-8 mb-4">
      <View className="flex-row justify-between items-center gap-4 mb-2">
        <Text className="text-text-primary text-xl font-semibold">
          {t("home.doctors")}
        </Text>
        <Link href="/patient/profile">
          <Text className="text-primary font-medium">{t("home.seeAll")}</Text>
        </Link>
      </View>
      <FlashList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="px-2 py-1 mr-2 gap-2 flex-row items-center rounded-full border border-border bg-surface/50">
            {item.icon_url && item.icon_url !== "" ? (
              <Image
                src={item.icon_url}
                width={24}
                height={24}
                resizeMode="cover"
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <Image
                source={Pulse}
                width={24}
                height={24}
                resizeMode="cover"
                className="w-8 h-8 rounded-full"
              />
            )}
            <Text className="text-text-primary font-medium">{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Specializations;
