import TextField from "@/shared/components/TextField";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type Props = {
  value: number | null;
  onChange: (value: number) => void;
  error?: string;
};

//? Presets inside the backend `min:5`/`max:120` bound; any other value still validates in the schema
const DURATIONS = [10, 15, 20, 30, 45, 60, 90, 120] as const;

const SlotDurationField = ({ value, onChange, error }: Props) => {
  const { t } = useTranslation();

  return (
    <View>
      <Text className="text-sm font-medium text-text-tertiary mb-1">
        {t("schedules.slotDuration")}
      </Text>
      <TextField
        value={value ? value.toString() : ""}
        onChangeText={(e) => onChange(parseInt(e))}
        keyboardType="numeric"
        maxLength={3}
        placeholder={t("schedules.minutesValue", { value: DURATIONS[0] })}
      />
      <View className="flex-row flex-wrap gap-2 mt-2">
        {DURATIONS.map((duration) => (
          <Pressable
            key={duration}
            className={`border rounded-full px-3 py-1 ${value === duration ? "border-secondary" : "border-border"}`}
            onPress={() => onChange(duration)}
          >
            <Text
              className={`text-xs leading-8 ${value === duration ? "text-secondary" : "text-text-primary"}`}
            >
              {t("schedules.minutesValue", { value: duration })}
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

export default SlotDurationField;
