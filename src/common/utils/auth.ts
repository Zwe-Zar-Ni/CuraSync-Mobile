import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

export const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.error('Error saving token:', error);
    return false;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    return true;
  } catch (error) {
    console.error('Error removing token:', error);
    return false;
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const setRefreshToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(REFRESH_KEY, token);
    return true;
  } catch (error) {
    console.error('Error saving refresh token:', error);
    return false;
  }
};

export const removeRefreshToken = async () => {
  try {
    await AsyncStorage.removeItem(REFRESH_KEY);
    return true;
  } catch (error) {
    console.error('Error removing refresh token:', error);
    return false;
  }
};

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(REFRESH_KEY);
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
};
