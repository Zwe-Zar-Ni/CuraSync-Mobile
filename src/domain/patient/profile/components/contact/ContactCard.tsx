import { Mail, MapPin, Phone, Trash2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import useTheme from "@/common/hooks/useTheme";
import type { Contact } from "../../types/contact";

type Props = {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
};

const ContactCard = ({ contact, onEdit, onDelete }: Props) => {
  const { text } = useTheme();

  return (
    <Pressable
      className="bg-surface rounded-xl border border-border p-4"
      onPress={() => onEdit(contact)}
    >
      <View className="flex-row items-center gap-3">
        <Text className="flex-1 text-md font-medium text-text-primary">
          {contact.name}
        </Text>
        <Pressable onPress={() => onDelete(contact)} hitSlop={8}>
          <Trash2 color={text.secondary} size={20} />
        </Pressable>
      </View>
      <View className="gap-2 mt-2">
        <View className="flex-row items-center gap-2">
          <Phone color={text.secondary} size={16} />
          <Text className="text-sm text-text-secondary flex-1">
            {contact.phone_number}
          </Text>
        </View>
        {contact.email ? (
          <View className="flex-row items-center gap-2">
            <Mail color={text.secondary} size={16} />
            <Text className="text-sm text-text-secondary flex-1">
              {contact.email}
            </Text>
          </View>
        ) : null}
        {contact.address ? (
          <View className="flex-row items-center gap-2">
            <MapPin color={text.secondary} size={16} />
            <Text numberOfLines={2} className="text-sm text-text-secondary flex-1">
              {contact.address}
            </Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

export default ContactCard;
