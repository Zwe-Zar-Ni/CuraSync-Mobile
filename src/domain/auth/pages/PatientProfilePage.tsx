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
import { useUpdatePatientProfile } from "../queries";
import {
  PatientProfileSchema,
  PatientProfileValidator
} from "../validations/patient-profile";

const PatientProfilePage = () => {
  const insets = useSafeAreaInsets();
  const { text } = useTheme();

  const { mutate, isPending } = useUpdatePatientProfile();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PatientProfileSchema>({
    resolver: zodResolver(PatientProfileValidator),
    defaultValues: {
      name: ""
    }
  });

  const onSubmit = (data: PatientProfileSchema) => {
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
          Set up your profile
        </Text>
        <Text className="font-medium text-text-secondary">
          Let us know a little about you
        </Text>
      </View>
      <View className="gap-4">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value ?? ""}
              onBlur={onBlur}
              onChangeText={onChange}
              label="Name"
              placeholder="Enter your name"
              error={errors.name ? errors.name.message : undefined}
            />
          )}
        />

        <Controller
          control={control}
          name="phone_number"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value ?? ""}
              onBlur={onBlur}
              onChangeText={onChange}
              label="Phone Number"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              error={errors.name ? errors.name.message : undefined}
            />
          )}
        />

        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <View>
              <Text className="text-sm font-medium text-text-tertiary mb-1">
                Gender
              </Text>
              <View className="flex-row gap-2">
                <Pressable
                  className={`flex-1 justify-center items-center h-12 border ${value === "M" ? "border-secondary" : "border-surface"} rounded-xl`}
                  onPress={() => onChange("M")}
                >
                  <Text
                    className={`${value === "M" ? "text-secondary" : "text-text-primary"}`}
                  >
                    Male
                  </Text>
                </Pressable>
                <Pressable
                  className={`flex-1 justify-center items-center h-12 border ${value === "F" ? "border-secondary" : "border-surface"} rounded-xl`}
                  onPress={() => onChange("F")}
                >
                  <Text
                    className={`${value === "F" ? "text-secondary" : "text-text-primary"}`}
                  >
                    Female
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        />

        <Button
          onPress={handleSubmit(onSubmit)}
          text="Continue"
          className="mt-4"
          disabled={isSubmitting || isPending}
        />
        <Button
          onPress={() => router.push("/patient/profile")}
          text="Maybe Later"
          variant="outline"
          disabled={isSubmitting || isPending}
        />
      </View>
    </View>
  );
};

export default PatientProfilePage;
