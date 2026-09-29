import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLocale = async () => {
  const locale = await AsyncStorage.getItem("locale");
  return locale;
};

export const setLocale = async (locale: string) => {
  await AsyncStorage.setItem("locale", locale);
};
