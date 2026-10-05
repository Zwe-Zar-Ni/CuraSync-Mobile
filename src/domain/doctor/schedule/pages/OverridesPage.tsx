import { FlashList } from "@shopify/flash-list";
import useTheme from "@/common/hooks/useTheme";
import { router } from "expo-router";
import { CalendarOff, ChevronLeft, Plus } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OverrideCard from "../components/override/OverrideCard";
import OverrideDeleteSheet from "../components/override/OverrideDeleteSheet";
import OverrideFormSheet from "../components/override/OverrideFormSheet";
import { useGetOverrides } from "../queries/override";
import type { ScheduleOverride } from "../types/override";

const OverridesPage = () => {
  const insets = useSafeAreaInsets();
  const { text } = useTheme();
  const { t } = useTranslation();

  const { data: overrides } = useGetOverrides();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selected, setSelected] = useState<ScheduleOverride | null>(null);
  const [removing, setRemoving] = useState<ScheduleOverride | null>(null);

  const openCreate = () => {
    setSelected(null);
    setIsFormVisible(true);
  };

  const openEdit = (override: ScheduleOverride) => {
    setSelected(override);
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
          {t("overrides.title")}
        </Text>
        <Text className="font-medium text-text-secondary">
          {t("overrides.subtitle")}
        </Text>
      </View>
      <FlashList
        data={overrides ?? []}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <OverrideCard
            override={item}
            onEdit={openEdit}
            onDelete={setRemoving}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={
          <View className="items-center gap-2 mt-20">
            <CalendarOff color={text.secondary} size={40} />
            <Text className="text-md font-medium text-text-primary">
              {t("overrides.empty")}
            </Text>
            <Text className="text-sm text-text-secondary text-center">
              {t("overrides.emptyHint")}
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
      <OverrideFormSheet
        isVisible={isFormVisible}
        override={selected}
        onClose={() => setIsFormVisible(false)}
      />
      <OverrideDeleteSheet
        override={removing}
        onClose={() => setRemoving(null)}
      />
    </View>
  );
};

export default OverridesPage;