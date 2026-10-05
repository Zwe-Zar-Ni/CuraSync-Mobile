import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { DAY_KEYS } from "../types";

type Props = {
  value: number;
  onChange: (value: number) => void;
  error?: string;
};

const DayField = ({ value, onChange, error }: Props) => {
  const { t } = useTranslation();

  return (
    <View>
      <Text className="text-sm font-medium text-text-tertiary mb-1">
        {t("schedules.dayOfWeek")}
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {DAY_KEYS.map((label, day) => (
          <Pressable
            key={day}
            className={`border rounded-full px-3 py-1 ${value === day ? "border-secondary" : "border-border"}`}
            onPress={() => onChange(day)}
          >
            <Text
              className={`text-sm leading-8 ${value === day ? "text-secondary" : "text-text-primary"}`}
            >
              {t(label)}
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

export default DayField;