import useTheme from "@/common/hooks/useTheme";
import { HeartPulse, Trash2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import type { DoctorSpecialty } from "../../types/specialty";

type Props = {
  specialty: DoctorSpecialty;
  onDelete: (specialty: DoctorSpecialty) => void;
};

const SpecialtyCard = ({ specialty, onDelete }: Props) => {
  const { text } = useTheme();

  return (
    <View className="bg-surface rounded-xl border border-border p-4">
      <View className="flex-row items-center gap-3">
        <HeartPulse color={text.secondary} size={20} />
        <Text className="flex-1 text-md font-medium text-text-primary">
          {specialty.specialization.name}
        </Text>
        <Pressable onPress={() => onDelete(specialty)} hitSlop={8}>
          <Trash2 color={text.secondary} size={20} />
        </Pressable>
      </View>
      {specialty.specialization.description ? (
        <Text numberOfLines={2} className="text-sm text-text-secondary mt-2">
          {specialty.specialization.description}
        </Text>
      ) : null}
    </View>
  );
};

export default SpecialtyCard;