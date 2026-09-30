import { Stack } from "expo-router";

const PatientProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="edit" options={{ headerShown: false }} />
      <Stack.Screen name="language" options={{ headerShown: false }} />
      <Stack.Screen name="theme" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PatientProfileLayout;
