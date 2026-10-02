import { Stack } from "expo-router";

const PatientHomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PatientHomeLayout;
