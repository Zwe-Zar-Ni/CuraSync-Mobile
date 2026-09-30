import useTheme from "@/common/hooks/useTheme";
import type { ApiError } from "@/common/types";
import Button from "@/shared/components/Button";
import TextField from "@/shared/components/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react-native";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import { useCreateAllergy, useUpdateAllergy } from "../../queries/allergy";
import type { Allergy } from "../../types/allergy";
import { AllergyValidator, type AllergySchema } from "../../validations/allergy";
import SeverityField from "./SeverityField";

type Props = {
  isVisible: boolean;
  allergy?: Allergy | null;
  onClose: () => void;
};

const AllergyFormSheet = ({ isVisible, allergy = null, onClose }: Props) => {
  const { text } = useTheme();
  const { t } = useTranslation();

  const { mutate: create, isPending: isCreating } = useCreateAllergy();
  const { mutate: update, isPending: isUpdating } = useUpdateAllergy();

  const isPending = isCreating || isUpdating;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<AllergySchema>({
    resolver: zodResolver(AllergyValidator),
    defaultValues: {
      name: "",
      severity: "MILD",
      note: ""
    }
  });

  useEffect(() => {
    if (!isVisible) return;
    reset({
      name: allergy?.name ?? "",
      severity: allergy?.severity ?? "MILD",
      note: allergy?.note ?? ""
    });
  }, [isVisible, allergy, reset]);

  const onSubmit = (data: AllergySchema) => {
    const options = {
      onSuccess: () => onClose(),
      onError: (error: ApiError) => {
        console.log(error);
      }
    };

    if (allergy) {
      update({ id: allergy.id, ...data }, options);
      return;
    }

    create(data, options);
  };

  return (
    <Modal
      style={{ justifyContent: "flex-end", margin: 0 }}
      backdropColor={"#0C0C0C"}
      avoidKeyboard
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      isVisible={isVisible}
    >
      <View className="bg-background">
        <View className="relative bg-surface py-3 px-2 items-center">
          <Text className="text-md text-text-primary font-medium">
            {allergy ? t("allergies.edit") : t("allergies.add")}
          </Text>
          <View className="absolute top-3 right-4">
            <Pressable onPress={onClose}>
              <X color={text.secondary} />
            </Pressable>
          </View>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          className="px-4"
        >
          <View className="gap-4 py-6">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  value={value ?? ""}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  label={t("allergies.allergyName")}
                  placeholder={t("allergies.allergyNamePlaceholder")}
                  error={errors.name ? errors.name.message : undefined}
                />
              )}
            />

            <Controller
              control={control}
              name="severity"
              render={({ field: { onChange, value } }) => (
                <SeverityField
                  value={value}
                  onChange={onChange}
                  error={errors.severity ? errors.severity.message : undefined}
                />
              )}
            />

            <Controller
              control={control}
              name="note"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  value={value ?? ""}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  label={t("allergies.note")}
                  placeholder={t("allergies.notePlaceholder")}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  error={errors.note ? errors.note.message : undefined}
                />
              )}
            />
          </View>
        </ScrollView>
        <View className="px-4 pb-6 gap-3">
          <Button
            text={t("actions.save")}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || isPending}
          />
          <Button
            text={t("actions.cancel")}
            variant="outline"
            onPress={onClose}
            disabled={isSubmitting || isPending}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AllergyFormSheet;
