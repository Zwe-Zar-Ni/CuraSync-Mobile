import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import type { ScheduleOverrideType } from "../../types/override";

type Props = {
  value: ScheduleOverrideType;
  onChange: (value: ScheduleOverrideType) => void;
  error?: string;
};

const TYPES = [
  { value: "UNAVAILABLE", label: "overrides.unavailable" },
  { value: "CUSTOM_HOURS", label: "overrides.customHours" }
] as const;

const OverrideTypeField = ({ value, onChange, error }: Props) => {
  const { t } = useTranslation();

  return (
    <View>
      <Text className="text-sm font-medium text-text-tertiary mb-1">
        {t("overrides.type")}
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {TYPES.map((type) => (
          <Pressable
            key={type.value}
            className={`border rounded-full px-3 py-1 ${value === type.value ? "border-secondary" : "border-border"}`}
            onPress={() => onChange(type.value)}
          >
            <Text
              className={`text-sm leading-8 ${value === type.value ? "text-secondary" : "text-text-primary"}`}
            >
              {t(type.label)}
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

export default OverrideTypeField;