import useTheme from "@/common/hooks/useTheme";
import Button from "@/shared/components/Button";
import dayjs from "dayjs";
import { X } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import { useDeleteOverride } from "../../queries/override";
import type { ScheduleOverride } from "../../types/override";

type Props = {
  override: ScheduleOverride | null;
  onClose: () => void;
};

const OverrideDeleteSheet = ({ override, onClose }: Props) => {
  const { text } = useTheme();
  const { t } = useTranslation();

  const { mutate, isPending } = useDeleteOverride();

  return (
    <Modal
      style={{ justifyContent: "center", margin: 12 }}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropColor={"#0C0C0C"}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      isVisible={!!override}
    >
      <View className="bg-background">
        <View className="relative bg-surface py-3 px-2 items-center">
          <Text className="text-md text-text-primary font-medium">
            {t("overrides.deleteTitle")}
          </Text>
          <View className="absolute top-3 right-4">
            <Pressable onPress={onClose}>
              <X color={text.secondary} />
            </Pressable>
          </View>
        </View>
        <View className="px-4 mt-8">
          <Text className="text-md font-medium text-text-primary">
            {override ? dayjs(override.date).format("MMM DD, YYYY") : null}
          </Text>
          <Text className="text-sm text-text-secondary mt-2">
            {t("overrides.deleteMessage")}
          </Text>
        </View>
        <View className="px-4 mt-8 pb-6 gap-3 flex-row">
          <Button
            text={t("actions.cancel")}
            variant="outline"
            onPress={onClose}
            disabled={isPending}
            className="flex-1"
          />
          <Button
            text={t("actions.delete")}
            onPress={() =>
              mutate(override?.id ?? 0, {
                onSuccess: () => onClose(),
                onError: (error) => {
                  console.log(error);
                }
              })
            }
            disabled={isPending}
            className="flex-1"
          />
        </View>
      </View>
    </Modal>
  );
};

export default OverrideDeleteSheet;