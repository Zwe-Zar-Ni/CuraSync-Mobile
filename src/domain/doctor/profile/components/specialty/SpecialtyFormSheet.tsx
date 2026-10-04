import useTheme from "@/common/hooks/useTheme";
import { useGetSpecializations } from "@/common/queries";
import type { ApiError } from "@/common/types";
import Button from "@/shared/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react-native";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import { useCreateSpecialty, useGetSpecialties } from "../../queries/specialty";
import {
  SpecialtyValidator,
  type SpecialtySchema
} from "../../validations/specialty";
import SpecializationField from "./SpecializationField";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const SpecialtyFormSheet = ({ isVisible, onClose }: Props) => {
  const { text } = useTheme();
  const { t } = useTranslation();

  const { data: specializations } = useGetSpecializations();
  const { data: specialties } = useGetSpecialties();

  const { mutate: create, isPending } = useCreateSpecialty();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<SpecialtySchema>({
    resolver: zodResolver(SpecialtyValidator),
    defaultValues: {
      specialization_id: 0
    }
  });

  useEffect(() => {
    if (!isVisible) return;
    reset({ specialization_id: 0 });
  }, [isVisible, reset]);

  const onSubmit = (data: SpecialtySchema) => {
    create(data, {
      onSuccess: () => onClose(),
      onError: (error: ApiError) => {
        console.log(error);
      }
    });
  };

  const options = (specializations ?? []).filter(
    (specialization) =>
      !(specialties ?? []).some(
        (specialty) => specialty.specialization_id === specialization.id
      )
  );

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
            {t("specialties.add")}
          </Text>
          <View className="absolute top-3 right-4">
            <Pressable onPress={onClose}>
              <X color={text.secondary} />
            </Pressable>
          </View>
        </View>
        <View className="p-4">
          <Controller
            control={control}
            name="specialization_id"
            render={({ field: { onChange, value } }) => (
              <SpecializationField
                options={options}
                value={value || null}
                onChange={onChange}
                error={
                  errors.specialization_id
                    ? errors.specialization_id.message
                    : undefined
                }
              />
            )}
          />
        </View>
        <View className="px-4 pb-6 gap-3 flex-row">
          <Button
            text={t("actions.cancel")}
            variant="outline"
            onPress={onClose}
            disabled={isSubmitting || isPending}
            className="flex-1"
          />
          <Button
            text={t("actions.save")}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || isPending}
            className="flex-1"
          />
        </View>
      </View>
    </Modal>
  );
};

export default SpecialtyFormSheet;
