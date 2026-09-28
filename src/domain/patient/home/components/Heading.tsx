import useTheme from "@/common/hooks/useTheme";
import { Bell, Search } from "lucide-react-native";
import { View, Text, Pressable } from "react-native";

const Heading = () => {
  const { text } = useTheme();
  return (
    <View>
      <View className="flex-row justify-between items-center gap-4">
        <Text className="text-text-primary font-medium text-2xl">
          Hello, Leon Kennedy
        </Text>
        <Pressable className="rounded-full bg-surface p-2">
          <Bell color={text.primary} size={21} />
        </Pressable>
      </View>
      <Pressable className="rounded-full bg-surface p-3 flex-row items-center gap-2 mt-4">
        <Search color={text.secondary} size={20} />
        <Text className="text-text-secondary font-medium text-sm">Search</Text>
      </Pressable>
    </View>
  );
};

export default Heading;
