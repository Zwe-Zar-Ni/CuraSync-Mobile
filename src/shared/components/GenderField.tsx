import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type Gender = "M" | "F";

type Props = {
  value: Gender | null;
  onChange: (value: Gender) => void;
  error?: string;
};

const GENDERS = [
  { value: "M", label: "options.male" },
  { value: "F", label: "options.female" }
] as const;

const GenderField = ({ value, onChange, error }: Props) => {
  const { t } = useTranslation();

  return (
    <View>
      <Text className="text-sm font-medium text-text-tertiary mb-1">
        {t("labels.gender")}
      </Text>
      <View className="flex-row gap-2">
        {GENDERS.map((gender) => (
          <Pressable
            key={gender.value}
            className={`flex-1 justify-center items-center h-12 border rounded-xl ${value === gender.value ? "border-secondary" : "border-surface"}`}
            onPress={() => onChange(gender.value)}
          >
            <Text
              className={`${value === gender.value ? "text-secondary" : "text-text-primary"}`}
            >
              {t(gender.label)}
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

export default GenderField;
