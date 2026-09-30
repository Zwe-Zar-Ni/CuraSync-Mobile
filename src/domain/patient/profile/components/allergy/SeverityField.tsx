import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import type { AllergySeverity } from "../../types/allergy";

type Severity = AllergySeverity;

type Props = {
  value: Severity;
  onChange: (value: Severity) => void;
  error?: string;
};

const SEVERITIES = [
  { value: "MILD", label: "allergies.mild" },
  { value: "MODERATE", label: "allergies.moderate" },
  { value: "SEVERE", label: "allergies.severe" }
] as const;

const SeverityField = ({ value, onChange, error }: Props) => {
  const { t } = useTranslation();

  return (
    <View>
      <Text className="text-sm font-medium text-text-tertiary mb-1">
        {t("allergies.severity")}
      </Text>
      <View className="flex-row gap-2">
        {SEVERITIES.map((severity) => (
          <Pressable
            key={severity.value}
            className={`flex-1 justify-center items-center h-12 border rounded-xl ${value === severity.value ? "border-secondary" : "border-surface"}`}
            onPress={() => onChange(severity.value)}
          >
            <Text
              className={`text-sm ${value === severity.value ? "text-secondary" : "text-text-primary"}`}
            >
              {t(severity.label)}
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

export default SeverityField;
