import { Trash2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import useTheme from "@/common/hooks/useTheme";
import type { Allergy, AllergySeverity } from "../../types/allergy";

type Props = {
  allergy: Allergy;
  onEdit: (allergy: Allergy) => void;
  onDelete: (allergy: Allergy) => void;
};

export const severityVariants = {
  MILD: "border-green-500",
  MODERATE: "border-amber-500",
  SEVERE: "border-red-500"
} as const;

export const severityLabelVariants = {
  MILD: "text-green-500",
  MODERATE: "text-amber-500",
  SEVERE: "text-red-500"
} as const;

const severityLabels = {
  MILD: "allergies.mild",
  MODERATE: "allergies.moderate",
  SEVERE: "allergies.severe"
} as const satisfies Record<AllergySeverity, string>;

const AllergyCard = ({ allergy, onEdit, onDelete }: Props) => {
  const { text } = useTheme();
  const { t } = useTranslation();

  return (
    <Pressable
      className="bg-surface rounded-xl border border-border p-4"
      onPress={() => onEdit(allergy)}
    >
      <View className="flex-row items-center gap-3">
        <Text className="flex-1 text-md font-medium text-text-primary">
          {allergy.name}
        </Text>
        <View
          className={`border rounded-full px-2 py-0.5 ${severityVariants[allergy.severity]}`}
        >
          <Text
            className={`text-xs font-medium ${severityLabelVariants[allergy.severity]}`}
          >
            {t(severityLabels[allergy.severity])}
          </Text>
        </View>
        <Pressable onPress={() => onDelete(allergy)} hitSlop={8}>
          <Trash2 color={text.secondary} size={20} />
        </Pressable>
      </View>
      {allergy.note ? (
        <Text numberOfLines={2} className="text-sm text-text-secondary mt-2">
          {allergy.note}
        </Text>
      ) : null}
    </Pressable>
  );
};

export default AllergyCard;
