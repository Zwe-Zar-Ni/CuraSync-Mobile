import useTheme from "@/common/hooks/useTheme";
import Button from "@/shared/components/Button";
import PasswordField from "@/shared/components/PasswordField";
import TextField from "@/shared/components/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLogin } from "../queries";
import { LoginSchema, LoginValidator } from "../validations/login";

const LoginPage = () => {
  const insets = useSafeAreaInsets();
  const { text } = useTheme();

  const { mutate, isPending } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginValidator),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data: LoginSchema) => {
    mutate(data, {
      onSuccess: (response) => {
        console.log("response - ", response);
      },
      onError: (error) => {
        console.log("error - ", error);
      }
    });
  };

  return (
    <View
      className="flex-1 bg-background px-3"
      style={{ paddingTop: insets.top + 16 }}
    >
      <View className="mb-4">
        {router.canGoBack() ? (
          <Pressable onPress={() => router.back()} className="mb-4">
            <ChevronLeft color={text.secondary} size={24} />
          </Pressable>
        ) : null}
        <Text className="text-3xl font-medium text-text-primary">
          Welcome Back!
        </Text>
        <Text className="font-medium text-text-secondary">
          Welcome back to Cura Sync
        </Text>
      </View>
      <View className="gap-4">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              label="Email"
              placeholder="Enter your email"
              error={errors.email ? errors.email.message : undefined}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordField
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              label="Password"
              placeholder="Enter your password"
              error={errors.password ? errors.password.message : undefined}
              autoCapitalize="none"
            />
          )}
        />

        <Button
          onPress={handleSubmit(onSubmit)}
          text="Login"
          className="mt-4"
          disabled={isSubmitting || isPending}
        />
      </View>
      <View className="flex-row justify-center gap-1 mt-6">
        <Text className="text-text-primary">Doesn't have an account?</Text>
        <Pressable onPress={() => router.push("/auth/register")}>
          <Text className="text-primary underline">Create Account</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginPage;
