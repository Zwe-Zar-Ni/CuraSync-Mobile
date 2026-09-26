import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Uniwind, useUniwind } from "uniwind";

const themes = [
  { name: "light", label: "Light", icon: "☀️" },
  { name: "dark", label: "Dark", icon: "🌙" },
  { name: "ocean-light", label: "Ocean Light", icon: "🌊" },
  { name: "ocean-dark", label: "Ocean Dark", icon: "🌊" }
];
const ProfilePage = () => {
  const { theme, hasAdaptiveThemes } = useUniwind();
  const activeTheme = hasAdaptiveThemes ? "system" : theme;
  return (
    <SafeAreaView className=" h-screen bg-background">
      <View className="flex-row gap-2">
        {themes.map((t) => (
          <Pressable
            key={t.name}
            onPress={() => Uniwind.setTheme(t.name as any)}
            className={`
                        px-4 py-3 rounded-lg h-24 items-center
                        ${activeTheme === t.name ? "bg-primary" : "bg-secondary border border-border"}
                      `}
          >
            <Text
              className={`text-2xl ${activeTheme === t.name ? "text-white" : "text-foreground"}`}
            >
              {t.icon}
            </Text>
            <Text
              className={`text-xs mt-1 ${activeTheme === t.name ? "text-white" : "text-foreground"}`}
            >
              {t.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <View className="mt-4">
        <View className="w-full h-40 bg-surface rounded-lg border-2 border-border p-4">
          <Text className="text-foreground text-xl font-bold">
            Hello world sdfasdfsdf
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
