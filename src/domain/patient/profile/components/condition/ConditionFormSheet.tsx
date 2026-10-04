import useTheme from "@/common/hooks/useTheme";
import type { ApiError } from "@/common/types";
import Button from "@/shared/components/Button";
import DatePickerField from "@/shared/components/DatePickerField";
import TextField from "@/shared/components/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react-native";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import {
  useCreateCondition,
  useUpdateCondition
} from "../../queries/condition";
import type { Condition } from "../../types/condition";
import {
  ConditionValidator,
  type ConditionSchema
} from "../../validations/condition";
import StatusField from "./StatusField";

type Props = {
  isVisible: boolean;
  condition?: Condition | null;
  onClose: () => void;
};

const ConditionFormSheet = ({
  isVisible,
  condition = null,
  onClose
}: Props) => {
  const { text } = useTheme();
  const { t } = useTranslation();

  const { mutate: create, isPending: isCreating } = useCreateCondition();
  const { mutate: update, isPending: isUpdating } = useUpdateCondition();

  const isPending = isCreating || isUpdating;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ConditionSchema>({
    resolver: zodResolver(ConditionValidator),
    defaultValues: {
      name: "",
      diagnosis_date: "",
      status: "ACTIVE",
      note: ""
    }
  });

  useEffect(() => {
    if (!isVisible) return;
    reset({
      name: condition?.name ?? "",
      diagnosis_date: condition?.diagnosis_date ?? "",
      status: condition?.status ?? "ACTIVE",
      note: condition?.note ?? ""
    });
  }, [isVisible, condition, reset]);

  const onSubmit = (data: ConditionSchema) => {
    const options = {
      onSuccess: () => onClose(),
      onError: (error: ApiError) => {
        console.log(error);
      }
    };

    if (condition) {
      update({ id: condition.id, ...data }, options);
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
            {condition ? t("conditions.edit") : t("conditions.add")}
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
                  label={t("conditions.conditionName")}
                  placeholder="e.g. Type 2 diabetes"
                  error={errors.name ? errors.name.message : undefined}
                />
              )}
            />

            <Controller
              control={control}
              name="diagnosis_date"
              render={({ field: { onChange, value } }) => (
                <DatePickerField
                  date={value ?? ""}
                  setDate={(e) => onChange(e)}
                  label={t("conditions.diagnosisDate")}
                  placeholder="Select your diagnosis date"
                />
              )}
            />

            <Controller
              control={control}
              name="status"
              render={({ field: { onChange, value } }) => (
                <StatusField
                  value={value}
                  onChange={onChange}
                  error={errors.status ? errors.status.message : undefined}
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
                  label={t("conditions.note")}
                  placeholder="Anything your doctor should know about this condition"
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

export default ConditionFormSheet;
