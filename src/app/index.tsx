import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import Button from "@/shared/components/Button";
import WelcomeImage from "../assets/images/welcome.png";

const index = () => {
  return (
    <View className="flex-1 h-screen bg-background justify-center items-center px-3">
      <Image
        source={WelcomeImage}
        width={300}
        height={300}
        resizeMode="contain"
        className="w-75 h-75"
      />
      <View className="my-12">
        <Text className="text-3xl font-bold text-text-primary text-center mb-2">
          Welcome to Cura Sync
        </Text>
        <Text className="text-md font-medium text-text-primary text-center">
          Choose from a wide range of specialists and book appointments with
          ease. Personalized care is just a click away.
        </Text>
        <Button
          onPress={() => router.push("/auth/doctor-profile")}
          text="Create an account"
          className="mt-8"
        />
        <Button
          onPress={() => router.push("/auth/patient-profile")}
          text="Login"
          variant="outline"
          className="mt-2"
        />
      </View>
      <View className="flex-row justify-center gap-1">
        <Text className="text-text-primary">Are you a doctor?</Text>
        <Pressable onPress={() => router.push("/auth/register-doctor")}>
          <Text className="text-primary underline">Register Here!</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default index;
