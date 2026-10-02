import { View, Text, Pressable } from "react-native";
import useTheme, { themes } from "@/common/hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, Circle, CircleCheck } from "lucide-react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

const ThemePage = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { changeTheme, theme, colors, text } = useTheme();

  return (
    <View
      className="flex-1 bg-background px-3"
      style={{ paddingTop: insets.top + 8 }}
    >
      <View className="flex-row gap-2 items-center mb-2">
        <Pressable onPress={() => router.back()} className="p-2 pl-0">
          <ChevronLeft color={text.secondary} size={24} />
        </Pressable>
        <Text className="text-text-primary font-semibold text-xl">
          {t("profile.theme")}
        </Text>
      </View>
      {themes.map((t) => (
        <Pressable
          key={t.name}
          onPress={() => changeTheme(t.name)}
          className="flex-row items-center gap-4 py-3 border-b border-border"
        >
          <t.icon
            color={theme === t.name ? colors.secondary : text.primary}
            size={24}
          />
          <Text
            className={`flex-1 text-lg ${theme === t.name ? "text-secondary" : "text-text-secondary"}`}
          >
            {t.label}
          </Text>
          {theme === t.name ? (
            <CircleCheck color={colors.secondary} />
          ) : (
            <Circle color={text.primary} />
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default ThemePage;
