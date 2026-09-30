import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import type { ConditionStatus } from "../../types/condition";

type Status = ConditionStatus;

type Props = {
  value: Status;
  onChange: (value: Status) => void;
  error?: string;
};

const STATUSES = [
  { value: "ACTIVE", label: "conditions.active" },
  { value: "CONFIRMED", label: "conditions.confirmed" },
  { value: "PROVISIONAL", label: "conditions.provisional" },
  { value: "RECURRENCE", label: "conditions.recurrence" },
  { value: "REMISSION", label: "conditions.remission" },
  { value: "RESOLVED", label: "conditions.resolved" },
  { value: "INACTIVE", label: "conditions.inactive" },
  { value: "REFUTED", label: "conditions.refuted" }
] as const;

const StatusField = ({ value, onChange, error }: Props) => {
  const { t } = useTranslation();

  return (
    <View>
      <Text className="text-sm font-medium text-text-tertiary mb-1">
        {t("conditions.status")}
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {STATUSES.map((status) => (
          <Pressable
            key={status.value}
            className={`border rounded-full px-3 py-2 ${value === status.value ? "border-secondary" : "border-border"}`}
            onPress={() => onChange(status.value)}
          >
            <Text
              className={`text-sm ${value === status.value ? "text-secondary" : "text-text-primary"}`}
            >
              {t(status.label)}
            </Text>
          </Pressable>
        ))}
      </View>
      {error ? (
        <Text className="text-xs text-red-500 font-medium mt-1">{error}</Text>
      ) : null}
    </View>
  );
};

export default StatusField;