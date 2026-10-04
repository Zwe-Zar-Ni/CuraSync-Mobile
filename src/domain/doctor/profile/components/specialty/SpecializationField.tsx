import useTheme from "@/common/hooks/useTheme";
import type { Specialization } from "@/common/types";
import { Check } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import Pulse from "@/assets/images/pulse.png";

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
        <ScrollView className="max-h-120" showsVerticalScrollIndicator={false}>
          {options.map((option) => (
            <Pressable
              key={option.id}
              onPress={() => onChange(option.id)}
              className={`bg-surface rounded-xl mb-2 border p-3 flex-row ${option.id === value ? "border-secondary" : "border-border"}`}
            >
              <View className="flex-1">
                <View className="flex-row items-center">
                  {option.icon_url ? (
                    <Image
                      src={option.icon_url}
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  ) : (
                    <Image
                      source={Pulse}
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  )}
                  <Text className="text-md font-medium text-text-primary">
                    {option.name}
                  </Text>
                </View>
                {option.description ? (
                  <Text className="text-[10px] text-text-secondary ml-8">
                    {option.description}
                  </Text>
                ) : null}
              </View>
              {option.id === value ? (
                <Check color={colors.secondary} size={20} />
              ) : null}
            </Pressable>
          ))}
        </ScrollView>
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
