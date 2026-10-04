import useTheme from "@/common/hooks/useTheme";
import BloodTypeField from "@/shared/components/BloodTypeField";
import Button from "@/shared/components/Button";
import DatePickerField from "@/shared/components/DatePickerField";
import GenderField from "@/shared/components/GenderField";
import TextField from "@/shared/components/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { ChevronLeft, User } from "lucide-react-native";
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
import { Patient } from "@/common/types";

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
      profile_url: "",
      date_of_birth: "",
      gender: null,
      blood_type: ""
    }
  });

  useEffect(() => {
    if (!user) return;
    reset({
      name: user.user.name ?? "",
      phone_number: user.user.phone_number ?? "",
      profile_url: user.user.profile_url ?? "",
      date_of_birth: (user as Patient).profile.date_of_birth ?? "",
      gender: (user as Patient).profile.gender,
      blood_type: (user as Patient).profile.blood_type ?? ""
    });
  }, [user, reset]);

  const onSubmit = (data: EditProfileSchema) => {
    router.back();
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
          {/* <Controller
            control={control}
            name="profile_url"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                value={value ?? ""}
                onBlur={onBlur}
                onChangeText={onChange}
                label={t("labels.profileUrl")}
                placeholder="Enter your profile image url"
                autoCapitalize="none"
                error={
                  errors.profile_url ? errors.profile_url.message : undefined
                }
              />
            )}
          /> */}

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
            name="gender"
            render={({ field: { onChange, value } }) => (
              <GenderField
                value={value ?? null}
                onChange={onChange}
                error={errors.gender ? errors.gender.message : undefined}
              />
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
                placeholder="Select your date of birth"
              />
            )}
          />

          <Controller
            control={control}
            name="blood_type"
            render={({ field: { onChange, onBlur, value } }) => (
              <BloodTypeField
                onChange={(e) => onChange(e)}
                value={value ?? ""}
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
