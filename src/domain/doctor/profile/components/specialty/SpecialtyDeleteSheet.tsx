import useTheme from "@/common/hooks/useTheme";
import Button from "@/shared/components/Button";
import { X } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import { useDeleteSpecialty } from "../../queries/specialty";
import type { DoctorSpecialty } from "../../types/specialty";

type Props = {
  specialty: DoctorSpecialty | null;
  onClose: () => void;
};

const SpecialtyDeleteSheet = ({ specialty, onClose }: Props) => {
  const { text } = useTheme();
  const { t } = useTranslation();

  const { mutate, isPending } = useDeleteSpecialty();

  return (
    <Modal
      style={{ justifyContent: "flex-end", margin: 0 }}
      backdropColor={"#0C0C0C"}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      isVisible={!!specialty}
    >
      <View className="bg-background">
        <View className="relative bg-surface py-3 px-2 items-center">
          <Text className="text-md text-text-primary font-medium">
            {t("specialties.deleteTitle")}
          </Text>
          <View className="absolute top-3 right-4">
            <Pressable onPress={onClose}>
              <X color={text.secondary} />
            </Pressable>
          </View>
        </View>
        <View className="px-4 mt-8">
          <Text className="text-md font-medium text-text-primary">
            {specialty?.specialization.name}
          </Text>
          <Text className="text-sm text-text-secondary mt-2">
            {t("specialties.deleteMessage")}
          </Text>
        </View>
        <View className="px-4 mt-8 pb-6 gap-3">
          <Button
            text={t("actions.delete")}
            onPress={() =>
              mutate(specialty?.id ?? 0, {
                onSuccess: () => onClose(),
                onError: (error) => {
                  console.log(error);
                }
              })
            }
            disabled={isPending}
          />
          <Button
            text={t("actions.cancel")}
            variant="outline"
            onPress={onClose}
            disabled={isPending}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SpecialtyDeleteSheet;