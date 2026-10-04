import { FlashList } from "@shopify/flash-list";
import useTheme from "@/common/hooks/useTheme";
import { router } from "expo-router";
import { ChevronLeft, Plus, Stethoscope } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SpecialtyCard from "../components/specialty/SpecialtyCard";
import SpecialtyDeleteSheet from "../components/specialty/SpecialtyDeleteSheet";
import SpecialtyFormSheet from "../components/specialty/SpecialtyFormSheet";
import { useGetSpecialties } from "../queries/specialty";
import type { DoctorSpecialty } from "../types/specialty";

const SpecialtyPage = () => {
  const insets = useSafeAreaInsets();
  const { text } = useTheme();
  const { t } = useTranslation();

  const { data: specialties } = useGetSpecialties();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [removing, setRemoving] = useState<DoctorSpecialty | null>(null);

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
          {t("specialties.title")}
        </Text>
        <Text className="font-medium text-text-secondary">
          {t("specialties.subtitle")}
        </Text>
      </View>
      <FlashList
        data={specialties ?? []}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SpecialtyCard specialty={item} onDelete={setRemoving} />
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={
          <View className="items-center gap-2 mt-20">
            <Stethoscope color={text.secondary} size={40} />
            <Text className="text-md font-medium text-text-primary">
              {t("specialties.empty")}
            </Text>
            <Text className="text-sm text-text-secondary text-center">
              {t("specialties.emptyHint")}
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <Pressable
        className="absolute bottom-6 right-3 bg-primary rounded-full h-14 w-14 items-center justify-center"
        onPress={() => setIsFormVisible(true)}
      >
        <Plus color="white" size={28} />
      </Pressable>
      <SpecialtyFormSheet
        isVisible={isFormVisible}
        onClose={() => setIsFormVisible(false)}
      />
      <SpecialtyDeleteSheet
        specialty={removing}
        onClose={() => setRemoving(null)}
      />
    </View>
  );
};

export default SpecialtyPage;