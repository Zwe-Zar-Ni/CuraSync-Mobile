import { Stack } from 'expo-router';

const RootLayoutStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="patient" options={{ headerShown: false }} />
      <Stack.Screen name="doctor" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayoutStack;
