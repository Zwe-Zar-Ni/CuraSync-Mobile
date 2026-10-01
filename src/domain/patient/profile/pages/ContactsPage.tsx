import { FlashList } from "@shopify/flash-list";
import useTheme from "@/common/hooks/useTheme";
import { router } from "expo-router";
import { ChevronLeft, ContactRound, Plus } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ContactCard from "../components/contact/ContactCard";
import ContactDeleteSheet from "../components/contact/ContactDeleteSheet";
import ContactFormSheet from "../components/contact/ContactFormSheet";
import { useGetContacts } from "../queries/contact";
import type { Contact } from "../types/contact";

const ContactsPage = () => {
  const insets = useSafeAreaInsets();
  const { text } = useTheme();
  const { t } = useTranslation();

  const { data: contacts } = useGetContacts();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [removing, setRemoving] = useState<Contact | null>(null);

  const openCreate = () => {
    setSelected(null);
    setIsFormVisible(true);
  };

  const openEdit = (contact: Contact) => {
    setSelected(contact);
    setIsFormVisible(true);
  };

  return (
    <View
      className="flex-1 bg-background px-3"
      style={{ paddingTop: insets.top + 16 }}
    >
      <View className="mb-4">
        {router.canGoBack() ? (
          <Pressable onPress={() => router.back()} className="mb-4">
            <ChevronLeft color={text.secondary} size={24} />
          </Pressable>
        ) : null}
        <Text className="text-2xl leading-10 font-medium text-text-primary">
          {t("contacts.title")}
        </Text>
        <Text className="font-medium text-text-secondary">
          {t("contacts.subtitle")}
        </Text>
      </View>
      <FlashList
        data={contacts ?? []}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ContactCard
            contact={item}
            onEdit={openEdit}
            onDelete={setRemoving}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={
          <View className="items-center gap-2 mt-20">
            <ContactRound color={text.secondary} size={40} />
            <Text className="text-md font-medium text-text-primary">
              {t("contacts.empty")}
            </Text>
            <Text className="text-sm text-text-secondary text-center">
              {t("contacts.emptyHint")}
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <Pressable
        className="absolute bottom-6 right-3 bg-primary rounded-full h-14 w-14 items-center justify-center"
        onPress={openCreate}
      >
        <Plus color="white" size={28} />
      </Pressable>
      <ContactFormSheet
        isVisible={isFormVisible}
        contact={selected}
        onClose={() => setIsFormVisible(false)}
      />
      <ContactDeleteSheet
        contact={removing}
        onClose={() => setRemoving(null)}
      />
    </View>
  );
};

export default ContactsPage;
