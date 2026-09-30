import { FlashList } from "@shopify/flash-list";
import useTheme from "@/common/hooks/useTheme";
import { router } from "expo-router";
import { ChevronLeft, Plus, Stethoscope } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ConditionCard from "../components/condition/ConditionCard";
import ConditionDeleteSheet from "../components/condition/ConditionDeleteSheet";
import ConditionFormSheet from "../components/condition/ConditionFormSheet";
import { useGetConditions } from "../queries/condition";
import type { Condition } from "../types/condition";

const ConditionsPage = () => {
  const insets = useSafeAreaInsets();
  const { text } = useTheme();
  const { t } = useTranslation();

  const { data: conditions } = useGetConditions();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selected, setSelected] = useState<Condition | null>(null);
  const [removing, setRemoving] = useState<Condition | null>(null);

  const openCreate = () => {
    setSelected(null);
    setIsFormVisible(true);
  };

  const openEdit = (condition: Condition) => {
    setSelected(condition);
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
        <Text className="text-3xl leading-12 font-medium text-text-primary">
          {t("conditions.title")}
        </Text>
        <Text className="font-medium text-text-secondary">
          {t("conditions.subtitle")}
        </Text>
      </View>
      <FlashList
        data={conditions ?? []}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ConditionCard
            condition={item}
            onEdit={openEdit}
            onDelete={setRemoving}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={
          <View className="items-center gap-2 mt-20">
            <Stethoscope color={text.secondary} size={40} />
            <Text className="text-md font-medium text-text-primary">
              {t("conditions.empty")}
            </Text>
            <Text className="text-sm text-text-secondary text-center">
              {t("conditions.emptyHint")}
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
      <ConditionFormSheet
        isVisible={isFormVisible}
        condition={selected}
        onClose={() => setIsFormVisible(false)}
      />
      <ConditionDeleteSheet
        condition={removing}
        onClose={() => setRemoving(null)}
      />
    </View>
  );
};

export default ConditionsPage;