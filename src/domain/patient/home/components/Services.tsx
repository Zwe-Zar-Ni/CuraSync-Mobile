import { View, Text, Image } from "react-native";
import Pulse from "@/assets/images/pulse.png";

const services = [
  {
    id: 1,
    name: "General Checkup",
    icon_url: null
  },
  {
    id: 2,
    name: "Child Care",
    icon_url: null
  },
  {
    id: 3,
    name: "Prenatal Care",
    icon_url: null
  },
  {
    id: 4,
    name: "Physical Therapy",
    icon_url: null
  }
];

const Services = () => {
  return (
    <View className="mt-8 bg-surface p-3 flex-row items-center justify-around rounded-2xl">
      {services.map((item) => (
        <View key={item.id} className="items-center h-full gap-2 w-1/4">
          {item.icon_url && item.icon_url !== "" ? (
            <Image
              src={item.icon_url}
              width={48}
              height={48}
              resizeMode="cover"
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <Image
              source={Pulse}
              width={48}
              height={48}
              resizeMode="cover"
              className="w-12 h-12 rounded-full"
            />
          )}
          <Text className="text-text-primary text-center font-medium text-sm">
            {item.name}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Services;
