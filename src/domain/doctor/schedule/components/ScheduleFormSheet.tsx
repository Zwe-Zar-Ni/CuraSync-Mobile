import useTheme from "@/common/hooks/useTheme";
import type { ApiError } from "@/common/types";
import Button from "@/shared/components/Button";
import TimePickerField from "@/shared/components/TimePickerField";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react-native";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import {
  useCreateSchedule,
  useUpdateSchedule
} from "../queries/schedule";
import type { Schedule } from "../types";
import {
  ScheduleValidator,
  type ScheduleSchema
} from "../validations/schedule";
import DayField from "./DayField";
import SlotDurationField from "./SlotDurationField";

type Props = {
  isVisible: boolean;
  schedule?: Schedule | null;
  onClose: () => void;
};

const defaults: ScheduleSchema = {
  day_of_week: 1,
  start_time: "09:00:00",
  end_time: "13:00:00",
  slot_duration_minutes: 15
};

const ScheduleFormSheet = ({
  isVisible,
  schedule = null,
  onClose
}: Props) => {
  const { text } = useTheme();
  const { t } = useTranslation();

  const { mutate: create, isPending: isCreating } = useCreateSchedule();
  const { mutate: update, isPending: isUpdating } = useUpdateSchedule();

  const isPending = isCreating || isUpdating;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ScheduleSchema>({
    resolver: zodResolver(ScheduleValidator),
    defaultValues: defaults
  });

  useEffect(() => {
    if (!isVisible) return;
    reset({
      day_of_week: schedule?.day_of_week ?? defaults.day_of_week,
      start_time: schedule?.start_time ?? defaults.start_time,
      end_time: schedule?.end_time ?? defaults.end_time,
      slot_duration_minutes:
        schedule?.slot_duration_minutes ?? defaults.slot_duration_minutes
    });
  }, [isVisible, schedule, reset]);

  const onSubmit = (data: ScheduleSchema) => {
    const options = {
      onSuccess: () => onClose(),
      onError: (error: ApiError) => {
        console.log(error);
      }
    };

    if (schedule) {
      update({ id: schedule.id, ...data }, options);
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
            {schedule ? t("schedules.edit") : t("schedules.add")}
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
        >
          <View className="gap-4">
            <Controller
              control={control}
              name="day_of_week"
              render={({ field: { onChange, value } }) => (
                <DayField
                  value={value}
                  onChange={onChange}
                  error={
                    errors.day_of_week ? errors.day_of_week.message : undefined
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="start_time"
              render={({ field: { onChange, value } }) => (
                <View>
                  <TimePickerField
                    //? Re-seeds the picker's internal state when the sheet switches between two schedules
                    key={`start-${schedule?.id ?? "new"}`}
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
                    key={`end-${schedule?.id ?? "new"}`}
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

export default ScheduleFormSheet;