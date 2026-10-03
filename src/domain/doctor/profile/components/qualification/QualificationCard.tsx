import useTheme from "@/common/hooks/useTheme";
import { Building2, CalendarDays, Link2, Trash2 } from "lucide-react-native";
import { Linking, Pressable, Text, View } from "react-native";
import type { Qualification } from "../../types/qualification";

type Props = {
  qualification: Qualification;
  onEdit: (qualification: Qualification) => void;
  onDelete: (qualification: Qualification) => void;
};

const QualificationCard = ({ qualification, onEdit, onDelete }: Props) => {
  const { text } = useTheme();

  return (
    <Pressable
      className="bg-surface rounded-xl border border-border p-4"
      onPress={() => onEdit(qualification)}
    >
      <View className="flex-row items-center gap-3">
        <View className="flex-1">
          <Text className="text-md font-medium text-text-primary">
            {qualification.name}
          </Text>
          <View className="flex-row items-center gap-2 mt-1">
            <Building2 color={text.secondary} size={16} />
            <Text
              numberOfLines={1}
              className="flex-1 text-sm text-text-secondary"
            >
              {qualification.institution}
            </Text>
          </View>
        </View>
        <Pressable onPress={() => onDelete(qualification)} hitSlop={8}>
          <Trash2 color={text.secondary} size={20} />
        </Pressable>
      </View>
      <View className="flex-row items-center gap-3 mt-3">
        <View className="flex-row items-center gap-1 border border-border rounded-full px-2 py-0.5">
          <CalendarDays color={text.secondary} size={14} />
          <Text className="text-xs text-text-secondary">
            {qualification.year}
          </Text>
        </View>
        {qualification.certificate_url ? (
          <Pressable
            className="flex-1 flex-row items-center gap-1"
            onPress={() => Linking.openURL(qualification.certificate_url ?? "")}
          >
            <Link2 color={text.secondary} size={14} />
            <Text
              numberOfLines={1}
              className="flex-1 text-xs text-text-secondary"
            >
              {qualification.certificate_url}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
};

export default QualificationCard;
