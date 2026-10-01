import dayjs from "dayjs";
import { CalendarDays, Trash2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import useTheme from "@/common/hooks/useTheme";
import type { Condition, ConditionStatus } from "../../types/condition";

type Props = {
  condition: Condition;
  onEdit: (condition: Condition) => void;
  onDelete: (condition: Condition) => void;
};

export const statusVariants = {
  ACTIVE: "border-green-500",
  CONFIRMED: "border-green-500",
  PROVISIONAL: "border-amber-500",
  RECURRENCE: "border-amber-500",
  REMISSION: "border-sky-500",
  RESOLVED: "border-sky-500",
  INACTIVE: "border-border",
  REFUTED: "border-border"
} as const satisfies Record<ConditionStatus, string>;

export const statusLabelVariants = {
  ACTIVE: "text-green-500",
  CONFIRMED: "text-green-500",
  PROVISIONAL: "text-amber-500",
  RECURRENCE: "text-amber-500",
  REMISSION: "text-sky-500",
  RESOLVED: "text-sky-500",
  INACTIVE: "text-text-secondary",
  REFUTED: "text-text-secondary"
} as const satisfies Record<ConditionStatus, string>;

const statusLabels = {
  ACTIVE: "conditions.active",
  CONFIRMED: "conditions.confirmed",
  PROVISIONAL: "conditions.provisional",
  RECURRENCE: "conditions.recurrence",
  REMISSION: "conditions.remission",
  RESOLVED: "conditions.resolved",
  INACTIVE: "conditions.inactive",
  REFUTED: "conditions.refuted"
} as const satisfies Record<ConditionStatus, string>;

const ConditionCard = ({ condition, onEdit, onDelete }: Props) => {
  const { text } = useTheme();
  const { t } = useTranslation();

  return (
    <Pressable
      className="bg-surface rounded-xl border border-border p-4"
      onPress={() => onEdit(condition)}
    >
      <View className="flex-row items-center gap-3">
        <Text className="flex-1 text-md font-medium text-text-primary">
          {condition.name}
        </Text>
        <View
          className={`border rounded-full px-2 py-0.5 ${statusVariants[condition.status]}`}
        >
          <Text
            className={`text-xs font-medium ${statusLabelVariants[condition.status]}`}
          >
            {t(statusLabels[condition.status])}
          </Text>
        </View>
        <Pressable onPress={() => onDelete(condition)} hitSlop={8}>
          <Trash2 color={text.secondary} size={20} />
        </Pressable>
      </View>
      {condition.diagnosis_date ? (
        <View className="flex-row items-center gap-2 mt-1">
          <CalendarDays color={text.secondary} size={16} />
          <Text className="text-sm text-text-secondary">
            {dayjs(condition.diagnosis_date).format("MMM DD, YYYY")}
          </Text>
        </View>
      ) : null}
      {condition.note ? (
        <Text numberOfLines={2} className="text-sm text-text-secondary mt-1">
          {condition.note}
        </Text>
      ) : null}
    </Pressable>
  );
};

export default ConditionCard;
