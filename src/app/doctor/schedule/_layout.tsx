import { Stack } from "expo-router";

const DoctorScheduleLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="overrides" options={{ headerShown: false }} />
    </Stack>
  );
};

export default DoctorScheduleLayout;
