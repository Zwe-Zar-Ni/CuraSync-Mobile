import useTheme from "@/common/hooks/useTheme";
import Button from "@/shared/components/Button";
import TextField from "@/shared/components/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUpdatePatientProfile } from "../queries";
import {
  PatientProfileSchema,
  PatientProfileValidator
} from "../validations/patient-profile";
import DatePickerField from "@/shared/components/DatePickerField";
import BloodTypeField from "@/shared/components/BloodTypeField";

const PatientProfilePage = () => {
  const { t } = useTranslation();
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
      name: null,
      phone_number: null,
      profile_url: null,
      date_of_birth: null,
      gender: null,
      blood_type: null
    }
  });

  const onSubmit = (data: PatientProfileSchema) => {
    router.push("/patient/home");
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
        <Text className="text-3xl  leading-12  font-medium text-text-primary">
          {t("auth.setUpYourProfile")}
        </Text>
        <Text className="font-medium text-text-secondary">
          {t("auth.tellUsAboutYourself")}
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
              label={t("labels.name")}
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
              label={t("labels.phoneNumber")}
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
                {t("labels.gender")}
              </Text>
              <View className="flex-row gap-2">
                <Pressable
                  className={`flex-1 justify-center items-center h-12 border ${value === "M" ? "border-secondary" : "border-surface"} rounded-xl`}
                  onPress={() => onChange("M")}
                >
                  <Text
                    className={`${value === "M" ? "text-secondary" : "text-text-primary"}`}
                  >
                    {t("options.male")}
                  </Text>
                </Pressable>
                <Pressable
                  className={`flex-1 justify-center items-center h-12 border ${value === "F" ? "border-secondary" : "border-surface"} rounded-xl`}
                  onPress={() => onChange("F")}
                >
                  <Text
                    className={`${value === "F" ? "text-secondary" : "text-text-primary"}`}
                  >
                    {t("options.female")}
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        />

        <Controller
          control={control}
          name="date_of_birth"
          render={({ field: { onChange, onBlur, value } }) => (
            <DatePickerField
              setDate={(e) => onChange(e)}
              date={value ?? ""}
              label={t("labels.dateOfBirth")}
              placeholder="Enter your date of birth"
            />
          )}
        />

        <Controller
          control={control}
          name="blood_type"
          render={({ field: { onChange, onBlur, value } }) => (
            <BloodTypeField onChange={(e) => onChange(e)} value={value ?? ""} />
          )}
        />

        <Button
          onPress={handleSubmit(onSubmit)}
          text={t("actions.continue")}
          className="mt-4"
          disabled={isSubmitting || isPending}
        />
        <Button
          onPress={() => router.push("/patient/profile")}
          text={t("actions.maybeLater")}
          variant="outline"
          disabled={isSubmitting || isPending}
        />
      </View>
    </View>
  );
};

export default PatientProfilePage;
