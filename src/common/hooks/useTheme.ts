import AsyncStorage from "@react-native-async-storage/async-storage";
import { Uniwind, useUniwind } from "uniwind";
import { Moon, Sun, Waves } from "lucide-react-native";
import { useEffect } from "react";

type ColorScheme = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  border: string;
};

const textLight = {
  primary: "#060606",
  secondary: "#484848",
  tertiary: "#808080"
};

const textDark = {
  primary: "#DEDEDE",
  secondary: "#9E9E9E",
  tertiary: "#636363"
};

const light: ColorScheme = {
  primary: "#f97316",
  secondary: "#fdba74",
  background: "#fff7ed",
  surface: "#ffedd5",
  border: "#fed7aa"
};

const dark: ColorScheme = {
  primary: "#f97316",
  secondary: "#fdba74",
  background: "#161218",
  surface: "#2a252e",
  border: "#3d3642"
};

const oceanLight: ColorScheme = {
  primary: "#0ea5e9",
  secondary: "#7dd3fc",
  background: "#f0f9ff",
  surface: "#e0f2fe",
  border: "#bae6fd"
};

const oceanDark: ColorScheme = {
  primary: "#0369a1",
  secondary: "#0c4a6e",
  background: "#030712",
  surface: "#111827",
  border: "#1f2937"
};

const themeMap = {
  light,
  dark,
  "ocean-light": oceanLight,
  "ocean-dark": oceanDark
};

export const themes = [
  { name: "light", label: "Light", icon: Sun },
  { name: "dark", label: "Dark", icon: Moon },
  { name: "ocean-light", label: "Ocean Light", icon: Waves },
  { name: "ocean-dark", label: "Ocean Dark", icon: Waves }
];

const THEME_KEY = "theme";

const useTheme = () => {
  const { theme } = useUniwind();

  const colors = themeMap[theme];

  const changeTheme = async (theme: string) => {
    Uniwind.setTheme(theme as any);
    await AsyncStorage.setItem(THEME_KEY, theme);
  };

  useEffect(() => {
    const setTheme = async () => {
      const theme = await AsyncStorage.getItem(THEME_KEY);
      if (theme) {
        Uniwind.setTheme(theme as any);
      }
    };
    setTheme();
  }, []);

  return {
    theme,
    text: theme.includes("dark") ? textDark : textLight,
    isDark: theme.includes("dark"),
    colors: colors,
    changeTheme
  };
};

export default useTheme;
