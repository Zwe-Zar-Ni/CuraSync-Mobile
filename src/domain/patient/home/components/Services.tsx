import { View, Text, Image } from "react-native";

const img =
  "https://static.vecteezy.com/system/resources/previews/005/495/317/non_2x/dental-clinic-logo-template-dental-care-logo-designs-tooth-teeth-smile-dentist-logo-vector.jpg";

const services = [
  {
    id: 1,
    name: "General Checkup"
  },
  {
    id: 2,
    name: "Child Care"
  },
  {
    id: 3,
    name: "Prenatal Care"
  },
  {
    id: 4,
    name: "Physical Therapy"
  }
];

const Services = () => {
  return (
    <View className="mt-8 bg-surface p-3 flex-row items-center justify-around rounded-2xl">
      {services.map((item) => (
        <View key={item.id} className="items-center h-full gap-2 w-1/4">
          <Image
            src={img}
            width={48}
            height={48}
            resizeMode="cover"
            className="w-12 h-12 rounded-full"
          />
          <Text className="text-text-primary text-center font-medium text-xs">
            {item.name}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Services;
