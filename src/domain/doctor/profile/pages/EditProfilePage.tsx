import useTheme from "@/common/hooks/useTheme";
import Button from "@/shared/components/Button";
import TextField from "@/shared/components/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUpdateProfile } from "../queries";
import {
  EditProfileSchema,
  EditProfileValidator
} from "../validations/edit-profile";
import useAuth from "@/common/hooks/useAuth";
import { Doctor } from "@/common/types";

const EditProfilePage = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { text } = useTheme();

  const { user } = useAuth();
  const { mutate, isPending } = useUpdateProfile();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(EditProfileValidator),
    defaultValues: {
      name: "",
      phone_number: "",
      license_number: "",
      standard_consultation_fee: "",
      bio: ""
    }
  });

  useEffect(() => {
    if (!user) return;
    reset({
      name: user.user.name ?? "",
      phone_number: user.user.phone_number ?? "",
      license_number: (user as Doctor).profile.license_number ?? "",
      standard_consultation_fee:
        (user as Doctor).profile.standard_consultation_fee === null
          ? ""
          : String((user as Doctor).profile.standard_consultation_fee),
      bio: (user as Doctor).profile.bio ?? ""
    });
  }, [user, reset]);

  const onSubmit = (data: EditProfileSchema) => {
    mutate(data, {
      onSuccess: () => {
        router.back();
      },
      onError: (error) => {
        console.log(error);
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
        <Text className="text-2xl leading-10 font-medium text-text-primary">
          {t("profile.editPersonalInformation")}
        </Text>
        <Text className="font-medium text-text-secondary">
          {t("profile.updatePersonalDetails")}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-4 pb-8">
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
                placeholder="Enter your standard consultation fee"
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
                placeholder="Enter your Bio"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                error={errors.bio ? errors.bio.message : undefined}
              />
            )}
          />

          <Button
            onPress={handleSubmit(onSubmit)}
            text={t("actions.save")}
            className="mt-4"
            disabled={isSubmitting || isPending}
          />
          <Button
            onPress={() => router.back()}
            text={t("actions.cancel")}
            variant="outline"
            disabled={isSubmitting || isPending}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfilePage;
