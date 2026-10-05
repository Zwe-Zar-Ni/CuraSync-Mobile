import useTheme from "@/common/hooks/useTheme";
import dayjs from "dayjs";
import { CalendarOff, Clock, Timer, Trash2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { ScheduleOverride } from "../../types/override";

type Props = {
  override: ScheduleOverride;
  onEdit: (override: ScheduleOverride) => void;
  onDelete: (override: ScheduleOverride) => void;
};

const OverrideCard = ({ override, onEdit, onDelete }: Props) => {
  const { text } = useTheme();
  const { t } = useTranslation();

  const isCustomHours = override.type === "CUSTOM_HOURS";

  return (
    <Pressable
      className="bg-surface rounded-xl border border-border p-4"
      onPress={() => onEdit(override)}
    >
      <View className="flex-row items-center gap-3">
        <View className="flex-1">
          <Text className="text-md font-medium text-text-primary">
            {dayjs(override.date).format("MMM DD, YYYY")}
          </Text>
          <Text className="text-sm text-text-secondary mt-1">
            {isCustomHours ? t("overrides.customHours") : t("overrides.unavailable")}
          </Text>
        </View>
        <Pressable onPress={() => onDelete(override)} hitSlop={8}>
          <Trash2 color={text.secondary} size={20} />
        </Pressable>
      </View>
      <View className="flex-row items-center gap-2 mt-3">
        {isCustomHours && override.start_time && override.end_time ? (
          <View className="flex-row items-center gap-1 border border-border rounded-full px-2 py-0.5">
            <Clock color={text.secondary} size={14} />
            <Text className="text-xs text-text-secondary">
              {override.start_time.slice(0, 5)} – {override.end_time.slice(0, 5)}
            </Text>
          </View>
        ) : (
          <View className="flex-row items-center gap-1 border border-border rounded-full px-2 py-0.5">
            <CalendarOff color={text.secondary} size={14} />
            <Text className="text-xs text-text-secondary">
              {t("overrides.noClinic")}
            </Text>
          </View>
        )}
        {isCustomHours ? (
          <View className="flex-row items-center gap-1 border border-border rounded-full px-2 py-0.5">
            <Timer color={text.secondary} size={14} />
            <Text className="text-xs text-text-secondary">
              {t("schedules.minutesValue", {
                value: override.slot_duration_minutes
              })}
            </Text>
          </View>
        ) : null}
      </View>
      {override.reason ? (
        <Text
          numberOfLines={2}
          className="text-sm text-text-secondary mt-3 border-l-2 border-border pl-3"
        >
          {override.reason}
        </Text>
      ) : null}
    </Pressable>
  );
};

export default OverrideCard;