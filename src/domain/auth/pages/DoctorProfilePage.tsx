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
import { useUpdateDoctorProfile } from "../queries";
import {
  DoctorProfileSchema,
  DoctorProfileValidator
} from "../validations/doctor-profile";

const DoctorProfilePage = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { text } = useTheme();

  const { mutate, isPending } = useUpdateDoctorProfile();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<DoctorProfileSchema>({
    resolver: zodResolver(DoctorProfileValidator),
    defaultValues: {}
  });

  const onSubmit = (data: DoctorProfileSchema) => {
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
              error={
                errors.phone_number ? errors.phone_number.message : undefined
              }
            />
          )}
        />
        <Controller
          control={control}
          name="license_number"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value ?? ""}
              onBlur={onBlur}
              onChangeText={onChange}
              label={t("labels.licenseNumber")}
              placeholder="Enter your license number"
              error={
                errors.license_number
                  ? errors.license_number.message
                  : undefined
              }
            />
          )}
        />
        <Controller
          control={control}
          name="standard_consultation_fee"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value ?? ""}
              onBlur={onBlur}
              onChangeText={onChange}
              label={t("labels.standardConsultationFee")}
              placeholder={t("labels.standardConsultationFee")}
              keyboardType="numeric"
              error={
                errors.standard_consultation_fee
                  ? errors.standard_consultation_fee.message
                  : undefined
              }
            />
          )}
        />
        <Controller
          control={control}
          name="bio"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value ?? ""}
              onBlur={onBlur}
              onChangeText={onChange}
              label={t("labels.bio")}
              placeholder="Enter your bio"
              error={errors.bio ? errors.bio.message : undefined}
            />
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

export default DoctorProfilePage;
