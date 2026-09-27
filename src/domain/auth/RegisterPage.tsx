import Button from "@/shared/components/Button";
import PasswordField from "@/shared/components/PasswordField";
import TextField from "@/shared/components/TextField";
import { Camera } from "lucide-react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterPage = () => {
  return (
    <View className="flex-1 bg-background px-3">
      <SafeAreaView className="flex-1 bg-background">
        <View className="gap-4">
          <TextField label="Name" placeholder="Enter your name" />
          <TextField label="Email" placeholder="Enter your email" />
          <PasswordField label="Password" placeholder="Enter your password" />
          <PasswordField
            label="Confirm Password"
            placeholder="Enter your password"
          />
          <Button
            onPress={() => {}}
            text="Register"
            prefixIcon={<Camera size={21} color={"white"} />}
            className="mt-4"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default RegisterPage;
