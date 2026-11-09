import { QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import queryClient from '../common/api/queryClient';
import '../common/localisation/i18n';
import '../global.css';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocale } from '@/common/localisation/utils';
import useTheme from '@/common/hooks/useTheme';
import RootLayoutStack from '@/shared/layouts/RootComponent';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    const setLanguage = async () => {
      const locale = await getLocale();
      i18n.changeLanguage(locale ?? 'en');
    };
    setLanguage();
  }, [i18n]);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <RootLayoutStack />
        <StatusBar
          barStyle={theme.includes('dark') ? 'light-content' : 'dark-content'}
          animated={true}
        />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
