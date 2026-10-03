import { Stack } from "expo-router";

const DoctorProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="edit" options={{ headerShown: false }} />
      <Stack.Screen name="qualifications" options={{ headerShown: false }} />
      <Stack.Screen name="language" options={{ headerShown: false }} />
      <Stack.Screen name="theme" options={{ headerShown: false }} />
    </Stack>
  );
};

export default DoctorProfileLayout;
