import { FlashList } from "@shopify/flash-list";
import useTheme from "@/common/hooks/useTheme";
import { router } from "expo-router";
import { ChevronLeft, NutOff, Plus } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AllergyCard from "../components/allergy/AllergyCard";
import AllergyDeleteSheet from "../components/allergy/AllergyDeleteSheet";
import AllergyFormSheet from "../components/allergy/AllergyFormSheet";
import { useGetAllergies } from "../queries/allergy";
import type { Allergy } from "../types/allergy";

const AllergiesPage = () => {
  const insets = useSafeAreaInsets();
  const { text } = useTheme();
  const { t } = useTranslation();

  const { data: allergies } = useGetAllergies();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selected, setSelected] = useState<Allergy | null>(null);
  const [removing, setRemoving] = useState<Allergy | null>(null);

  const openCreate = () => {
    setSelected(null);
    setIsFormVisible(true);
  };

  const openEdit = (allergy: Allergy) => {
    setSelected(allergy);
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
          {t("allergies.title")}
        </Text>
        <Text className="font-medium text-text-secondary">
          {t("allergies.subtitle")}
        </Text>
      </View>
      <FlashList
        data={allergies ?? []}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <AllergyCard
            allergy={item}
            onEdit={openEdit}
            onDelete={setRemoving}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={
          <View className="items-center gap-2 mt-20">
            <NutOff color={text.secondary} size={40} />
            <Text className="text-md font-medium text-text-primary">
              {t("allergies.empty")}
            </Text>
            <Text className="text-sm text-text-secondary text-center">
              {t("allergies.emptyHint")}
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
      <AllergyFormSheet
        isVisible={isFormVisible}
        allergy={selected}
        onClose={() => setIsFormVisible(false)}
      />
      <AllergyDeleteSheet
        allergy={removing}
        onClose={() => setRemoving(null)}
      />
    </View>
  );
};

export default AllergiesPage;
