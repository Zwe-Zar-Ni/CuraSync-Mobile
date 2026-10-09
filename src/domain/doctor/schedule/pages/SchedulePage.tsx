import { FlashList } from "@shopify/flash-list";
import useTheme from "@/common/hooks/useTheme";
import { router } from "expo-router";
import { CalendarOff, CalendarX, ChevronLeft, Plus } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScheduleCard from "../components/ScheduleCard";
import ScheduleDeleteSheet from "../components/ScheduleDeleteSheet";
import ScheduleFormSheet from "../components/ScheduleFormSheet";
import { useGetSchedules } from "../queries/schedule";
import type { Schedule } from "../types";

const DoctorSchedulePage = () => {
  const insets = useSafeAreaInsets();
  const { text } = useTheme();
  const { t } = useTranslation();

  const { data: schedules } = useGetSchedules();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selected, setSelected] = useState<Schedule | null>(null);
  const [removing, setRemoving] = useState<Schedule | null>(null);

  const openCreate = () => {
    setSelected(null);
    setIsFormVisible(true);
  };

  const openEdit = (schedule: Schedule) => {
    setSelected(schedule);
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
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-2xl leading-10 font-medium text-text-primary">
              {t("schedules.title")}
            </Text>
            <Text className="font-medium text-text-secondary">
              {t("schedules.subtitle")}
            </Text>
          </View>
          <Pressable
            className="bg-surface border border-border rounded-full p-2"
            onPress={() => router.push("/doctor/schedule/overrides")}
            hitSlop={8}
          >
            <CalendarOff color={text.secondary} size={20} />
          </Pressable>
        </View>
      </View>
      <FlashList
        data={schedules ?? []}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ScheduleCard
            schedule={item}
            onEdit={openEdit}
            onDelete={setRemoving}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={
          <View className="items-center gap-2 mt-20">
            <CalendarX color={text.secondary} size={40} />
            <Text className="text-md font-medium text-text-primary">
              {t("schedules.empty")}
            </Text>
            <Text className="text-sm text-text-secondary text-center">
              {t("schedules.emptyHint")}
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <Pressable
        className="absolute bottom-12 right-6 bg-primary rounded-full h-14 w-14 items-center justify-center"
        onPress={openCreate}
      >
        <Plus color="white" size={28} />
      </Pressable>
      <ScheduleFormSheet
        isVisible={isFormVisible}
        schedule={selected}
        onClose={() => setIsFormVisible(false)}
      />
      <ScheduleDeleteSheet
        schedule={removing}
        onClose={() => setRemoving(null)}
      />
    </View>
  );
};

export default DoctorSchedulePage;
