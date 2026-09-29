import { Image, View, Text } from "react-native";

const Heading = () => {
  return (
    <View className="flex-col items-center justify-center">
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT12Y4yRJOMGIw__Zmc5zT16Ci_9w3_EMoH2FGP20yHew&s=10"
        className="w-25 h-25 rounded-full border border-border"
        resizeMode="cover"
        width={100}
        height={100}
      />
      <Text className="text-2xl font-semibold text-text-primary mt-2">
        Ada Wong
      </Text>
    </View>
  );
};

export default Heading;
