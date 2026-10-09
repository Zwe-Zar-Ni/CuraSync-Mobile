import { FlashList } from "@shopify/flash-list";
import useTheme from "@/common/hooks/useTheme";
import { router } from "expo-router";
import { ChevronLeft, GraduationCap, Plus } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import QualificationCard from "../components/qualification/QualificationCard";
import QualificationDeleteSheet from "../components/qualification/QualificationDeleteSheet";
import QualificationFormSheet from "../components/qualification/QualificationFormSheet";
import { useGetQualifications } from "../queries/qualification";
import type { Qualification } from "../types/qualification";

const QualificationsPage = () => {
  const insets = useSafeAreaInsets();
  const { text } = useTheme();
  const { t } = useTranslation();

  const { data: qualifications } = useGetQualifications();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selected, setSelected] = useState<Qualification | null>(null);
  const [removing, setRemoving] = useState<Qualification | null>(null);

  const openCreate = () => {
    setSelected(null);
    setIsFormVisible(true);
  };

  const openEdit = (qualification: Qualification) => {
    setSelected(qualification);
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
          {t("qualifications.title")}
        </Text>
        <Text className="font-medium text-text-secondary">
          {t("qualifications.subtitle")}
        </Text>
      </View>
      <FlashList
        data={qualifications ?? []}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <QualificationCard
            qualification={item}
            onEdit={openEdit}
            onDelete={setRemoving}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={
          <View className="items-center gap-2 mt-20">
            <GraduationCap color={text.secondary} size={40} />
            <Text className="text-md font-medium text-text-primary">
              {t("qualifications.empty")}
            </Text>
            <Text className="text-sm text-text-secondary text-center">
              {t("qualifications.emptyHint")}
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
      <QualificationFormSheet
        isVisible={isFormVisible}
        qualification={selected}
        onClose={() => setIsFormVisible(false)}
      />
      <QualificationDeleteSheet
        qualification={removing}
        onClose={() => setRemoving(null)}
      />
    </View>
  );
};

export default QualificationsPage;
