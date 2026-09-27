import { useUniwind } from "uniwind";

const light = {
  primary: "#060606",
  secondary: "#484848",
  tertiary: "#808080"
};

const dark = {
  primary: "#DEDEDE",
  secondary: "#9E9E9E",
  tertiary: "#636363"
};

const useTheme = () => {
  const { theme } = useUniwind();
  return {
    theme,
    text: theme.includes("dark") ? dark : light
  };
};

export default useTheme;
