import { View, Text, Pressable } from "react-native";
import { ChevronRight, Languages, Palette } from "lucide-react-native";
import useTheme from "@/common/hooks/useTheme";
import { router } from "expo-router";

const Settings = () => {
  const { colors, text } = useTheme();
  return (
    <View className="mt-8">
      <Text className="text-text-primary text-lg font-medium">Settings</Text>
      <View className="bg-surface p-2 rounded-xl border border-border mt-1">
        <Pressable
          className="flex-row items-center gap-3 py-3 border-b border-border"
          onPress={() => router.push("/patient/profile/language")}
        >
          <Languages color={colors.secondary} size={22} />
          <Text className="flex-1 text-text-primary">Language</Text>
          <ChevronRight color={text.secondary} size={24} />
        </Pressable>
        <Pressable
          className="flex-row items-center gap-3 py-3"
          onPress={() => router.push("/patient/profile/theme")}
        >
          <Palette color={colors.secondary} size={22} />
          <Text className="flex-1 text-text-primary">Theme</Text>
          <ChevronRight color={text.secondary} size={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default Settings;
