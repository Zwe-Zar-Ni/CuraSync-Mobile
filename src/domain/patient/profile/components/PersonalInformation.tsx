import { View, Text, Pressable } from "react-native";
import { BeanOff, ChevronRight, Tablets, UserPen } from "lucide-react-native";
import useTheme from "@/common/hooks/useTheme";

const PersonalInformation = () => {
  const { colors, text } = useTheme();
  return (
    <View className="mt-8">
      <Text className="text-text-primary text-lg font-medium">
        Personal Information
      </Text>
      <View className="bg-surface p-2 rounded-xl border border-border mt-1">
        <Pressable className="flex-row items-center gap-3 py-3 border-b border-border">
          <UserPen color={colors.secondary} size={22} />
          <Text className="flex-1 text-text-primary">Personal Information</Text>
          <ChevronRight color={text.secondary} size={24} />
        </Pressable>
        <Pressable className="flex-row items-center gap-3 py-3 border-b border-border">
          <BeanOff color={colors.secondary} size={22} />
          <Text className="flex-1 text-text-primary">Allergies</Text>
          <ChevronRight color={text.secondary} size={24} />
        </Pressable>
        <Pressable className="flex-row items-center gap-3 py-3">
          <Tablets color={colors.secondary} size={22} />
          <Text className="flex-1 text-text-primary">Conditions</Text>
          <ChevronRight color={text.secondary} size={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default PersonalInformation;
