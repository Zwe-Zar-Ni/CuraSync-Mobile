import { View, Text, Image } from "react-native";
import { Link } from "expo-router";
import { useGetSpecializations } from "../queries";
import useTheme from "@/common/hooks/useTheme";
import { FlashList } from "@shopify/flash-list";

const img =
  "https://static.vecteezy.com/system/resources/previews/005/495/317/non_2x/dental-clinic-logo-template-dental-care-logo-designs-tooth-teeth-smile-dentist-logo-vector.jpg";

const Specializations = () => {
  const { text } = useTheme();
  const { data, isPending } = useGetSpecializations();

  return (
    <View className="mt-8 mb-4">
      <View className="flex-row justify-between items-center gap-4 mb-2">
        <Text className="text-text-primary text-xl font-semibold">Doctors</Text>
        <Link href="/patient/profile">
          <Text className="text-primary font-medium">See All</Text>
        </Link>
      </View>
      <FlashList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="p-2 mr-2 flex-row items-center rounded-full border border-border bg-surface">
            <Image
              src={img}
              width={24}
              height={24}
              resizeMode="cover"
              className="w-6 h-6 rounded-full"
            />
            <Text className="text-text-primary font-medium ml-2">
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Specializations;
