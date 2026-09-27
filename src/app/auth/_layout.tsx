import { Stack } from "expo-router";

const OnboardingLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="register-doctor" options={{ headerShown: false }} />
      <Stack.Screen name="doctor-profile" options={{ headerShown: false }} />
      <Stack.Screen name="patient-profile" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OnboardingLayout;
