import useTheme from "@/common/hooks/useTheme";
import type { ApiError } from "@/common/types";
import Button from "@/shared/components/Button";
import DatePickerField from "@/shared/components/DatePickerField";
import TextField from "@/shared/components/TextField";
import TimePickerField from "@/shared/components/TimePickerField";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { X } from "lucide-react-native";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import { useCreateOverride, useUpdateOverride } from "../../queries/override";
import type { ScheduleOverride } from "../../types/override";
import {
  OverrideValidator,
  type OverrideSchema
} from "../../validations/override";
import SlotDurationField from "../SlotDurationField";
import OverrideTypeField from "./OverrideTypeField";

type Props = {
  isVisible: boolean;
  override?: ScheduleOverride | null;
  onClose: () => void;
};

const defaults: OverrideSchema = {
  date: dayjs().add(7, "day").format("YYYY-MM-DD"),
  type: "UNAVAILABLE",
  start_time: null,
  end_time: null,
  slot_duration_minutes: null,
  reason: null
};

const OverrideFormSheet = ({
  isVisible,
  override = null,
  onClose
}: Props) => {
  const { text } = useTheme();
  const { t } = useTranslation();

  const { mutate: create, isPending: isCreating } = useCreateOverride();
  const { mutate: update, isPending: isUpdating } = useUpdateOverride();

  const isPending = isCreating || isUpdating;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<OverrideSchema>({
    resolver: zodResolver(OverrideValidator),
    defaultValues: defaults
  });

  useEffect(() => {
    if (!isVisible) return;
    reset({
      date: override?.date ?? defaults.date,
      type: override?.type ?? defaults.type,
      start_time: override?.start_time ?? null,
      end_time: override?.end_time ?? null,
      slot_duration_minutes: override?.slot_duration_minutes ?? null,
      reason: override?.reason ?? null
    });
  }, [isVisible, override, reset]);

  const onSubmit = (data: OverrideSchema) => {
    //? An UNAVAILABLE override carries no hours, so the optional time columns stay null
    const payload =
      data.type === "CUSTOM_HOURS"
        ? data
        : {
            ...data,
            start_time: null,
            end_time: null,
            slot_duration_minutes: null
          };

    const options = {
      onSuccess: () => onClose(),
      onError: (error: ApiError) => {
        console.log(error);
      }
    };

    if (override) {
      update({ id: override.id, ...payload }, options);
      return;
    }

    create(payload, options);
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
            {override ? t("overrides.edit") : t("overrides.add")}
          </Text>
          <View className="absolute top-3 right-4">
            <Pressable onPress={onClose}>
              <X color={text.secondary} />
            </Pressable>
          </View>
        </View>
        <ScrollView
          className="max-h-[70vh]"
          contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="gap-4">
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <View>
                  <DatePickerField
                    //? Re-seeds the picker's internal state when the sheet switches between two overrides
                    key={`date-${override?.id ?? "new"}`}
                    date={value ?? ""}
                    setDate={onChange}
                    label={t("overrides.date")}
                    placeholder="E.g. Medical conference"
                    minDate={
                      override ? undefined : dayjs().add(4, "day").format("YYYY-MM-DD")
                    }
                  />
                  {errors.date ? (
                    <Text className="text-xs text-red-500 font-medium mt-1">
                      {t(errors.date.message ?? "")}
                    </Text>
                  ) : null}
                </View>
              )}
            />

            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <>
                  <OverrideTypeField
                    value={value}
                    onChange={onChange}
                    error={errors.type ? errors.type.message : undefined}
                  />

                  {value === "CUSTOM_HOURS" ? (
                    <>
                      <Controller
                        control={control}
                        name="start_time"
                        render={({ field: { onChange, value } }) => (
                          <View>
                            <TimePickerField
                              key={`start-${override?.id ?? "new"}`}
                              time={value ?? ""}
                              setTime={onChange}
                              label={t("schedules.startTime")}
                            />
                            {errors.start_time ? (
                              <Text className="text-xs text-red-500 font-medium mt-1">
                                {t(errors.start_time.message ?? "")}
                              </Text>
                            ) : null}
                          </View>
                        )}
                      />

                      <Controller
                        control={control}
                        name="end_time"
                        render={({ field: { onChange, value } }) => (
                          <View>
                            <TimePickerField
                              key={`end-${override?.id ?? "new"}`}
                              time={value ?? ""}
                              setTime={onChange}
                              label={t("schedules.endTime")}
                            />
                            {errors.end_time ? (
                              <Text className="text-xs text-red-500 font-medium mt-1">
                                {t(errors.end_time.message ?? "")}
                              </Text>
                            ) : null}
                          </View>
                        )}
                      />

                      <Controller
                        control={control}
                        name="slot_duration_minutes"
                        render={({ field: { onChange, value } }) => (
                          <SlotDurationField
                            value={value ?? null}
                            onChange={onChange}
                            error={
                              errors.slot_duration_minutes
                                ? errors.slot_duration_minutes.message
                                : undefined
                            }
                          />
                        )}
                      />
                    </>
                  ) : null}
                </>
              )}
            />

            <Controller
              control={control}
              name="reason"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  value={value ?? ""}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  label={t("overrides.reason")}
                  placeholder="Anything patients should know about this date"
                  multiline
                  numberOfLines={3}
                  maxLength={1000}
                  textAlignVertical="top"
                  error={errors.reason ? errors.reason.message : undefined}
                />
              )}
            />
          </View>
        </ScrollView>
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

export default OverrideFormSheet;