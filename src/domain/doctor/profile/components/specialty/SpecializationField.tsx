import useTheme from "@/common/hooks/useTheme";
import type { Specialization } from "@/common/types";
import { Check } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type Props = {
  options: Specialization[];
  value: number | null;
  onChange: (value: number) => void;
  error?: string;
};

const SpecializationField = ({ options, value, onChange, error }: Props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View>
      <Text className="text-sm font-medium text-text-tertiary mb-1">
        {t("specialties.specialization")}
      </Text>
      {options.length ? (
        <View className="gap-2">
          {options.map((option) => {
            const isSelected = option.id === value;

            return (
              <Pressable
                key={option.id}
                onPress={() => onChange(option.id)}
                className={`flex-row items-start gap-3 bg-surface rounded-xl border p-3 ${isSelected ? "border-secondary" : "border-border"}`}
              >
                <View className="flex-1">
                  <Text className="text-md font-medium text-text-primary">
                    {option.name}
                  </Text>
                  {option.description ? (
                    <Text
                      numberOfLines={2}
                      className="text-sm text-text-secondary mt-1"
                    >
                      {option.description}
                    </Text>
                  ) : null}
                </View>
                {isSelected ? <Check color={colors.secondary} size={20} /> : null}
              </Pressable>
            );
          })}
        </View>
      ) : (
        <Text className="text-sm text-text-secondary">
          {t("specialties.allAdded")}
        </Text>
      )}
      {error ? (
        <Text className="text-xs text-red-500 font-medium mt-1">{error}</Text>
      ) : null}
    </View>
  );
};

export default SpecializationField;