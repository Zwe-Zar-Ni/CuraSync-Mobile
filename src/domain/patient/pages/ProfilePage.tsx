import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Uniwind, useUniwind } from "uniwind";

const themes = [
  { name: "light", label: "Light", icon: "☀️" },
  { name: "dark", label: "Dark", icon: "🌙" },
  { name: "ocean-light", label: "Ocean Light", icon: "🌊" },
  { name: "ocean-dark", label: "Ocean Dark", icon: "🌊" }
] as const;

const ProfilePage = () => {
  const { theme, hasAdaptiveThemes } = useUniwind();
  const activeTheme = hasAdaptiveThemes ? "system" : theme;
  return (
    <SafeAreaView className=" h-screen bg-background">
      <View className="flex-row gap-2">
        {themes.map((t) => (
          <Pressable
            key={t.name}
            onPress={() => Uniwind.setTheme(t.name)}
            className={`
                        px-4 py-3 rounded-lg h-24 items-center
                        ${activeTheme === t.name ? "bg-primary" : "bg-secondary border border-border"}
                      `}
          >
            <Text
              className={`text-2xl ${activeTheme === t.name ? "text-text-primary" : "text-text-secondary"}`}
            >
              {t.icon}
            </Text>
            <Text
              className={`text-xs mt-1 ${activeTheme === t.name ? "text-text-primary" : "text-text-secondary"}`}
            >
              {t.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <View className="mt-4">
        <View className="w-full h-40 bg-surface rounded-lg border-2 border-border p-4">
          <Text className="text-text-primary text-xl font-bold">
            Hello world sdfasdfsdf
          </Text>
          <Text className="text-text-secondary text-xl font-bold">
            Hello world sdfasdfsdf
          </Text>
          <Text className="text-text-tertiary text-xl font-bold">
            Hello world sdfasdfsdf
          </Text>
        </View>
        <View className="gap-y-2 mt-4">
          <Text className="text-xl font-bold text-text-primary">
            Text Primary
          </Text>
          <Text className="text-xl font-bold text-text-secondary">
            Text secondary
          </Text>
          <Text className="text-xl font-bold text-text-tertiary">
            Text tertiary
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
