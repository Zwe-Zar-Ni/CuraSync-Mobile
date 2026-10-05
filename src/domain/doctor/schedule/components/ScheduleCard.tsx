import useTheme from "@/common/hooks/useTheme";
import { Clock, Timer, Trash2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { DAY_KEYS, type Schedule } from "../types";

type Props = {
  schedule: Schedule;
  onEdit: (schedule: Schedule) => void;
  onDelete: (schedule: Schedule) => void;
};

const ScheduleCard = ({ schedule, onEdit, onDelete }: Props) => {
  const { text } = useTheme();
  const { t } = useTranslation();

  return (
    <Pressable
      className="bg-surface rounded-xl border border-border p-4"
      onPress={() => onEdit(schedule)}
    >
      <View className="flex-row items-center gap-3">
        <View className="flex-1">
          <Text className="text-md font-medium text-text-primary">
            {t(DAY_KEYS[schedule.day_of_week])}
          </Text>
          <View className="flex-row items-center gap-2 mt-1">
            <Clock color={text.secondary} size={16} />
            <Text className="text-sm text-text-secondary">
              {schedule.start_time.slice(0, 5)} – {schedule.end_time.slice(0, 5)}
            </Text>
          </View>
        </View>
        <Pressable onPress={() => onDelete(schedule)} hitSlop={8}>
          <Trash2 color={text.secondary} size={20} />
        </Pressable>
      </View>
      <View className="flex-row items-center gap-2 mt-3">
        <View className="flex-row items-center gap-1 border border-border rounded-full px-2 py-0.5">
          <Timer color={text.secondary} size={14} />
          <Text className="text-xs text-text-secondary">
            {t("schedules.minutesValue", {
              value: schedule.slot_duration_minutes
            })}
          </Text>
        </View>
        <View className="border border-border rounded-full px-2 py-0.5">
          <Text className="text-xs text-text-secondary">
            {schedule.is_active
              ? t("schedules.active")
              : t("schedules.inactive")}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ScheduleCard;