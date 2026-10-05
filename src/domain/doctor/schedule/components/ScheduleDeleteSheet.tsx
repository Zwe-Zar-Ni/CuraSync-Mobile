import useTheme from "@/common/hooks/useTheme";
import Button from "@/shared/components/Button";
import { X } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import { useDeleteSchedule } from "../queries/schedule";
import { DAY_KEYS, type Schedule } from "../types";

type Props = {
  schedule: Schedule | null;
  onClose: () => void;
};

const ScheduleDeleteSheet = ({ schedule, onClose }: Props) => {
  const { text } = useTheme();
  const { t } = useTranslation();

  const { mutate, isPending } = useDeleteSchedule();

  return (
    <Modal
      style={{ justifyContent: "center", margin: 12 }}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropColor={"#0C0C0C"}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      isVisible={!!schedule}
    >
      <View className="bg-background">
        <View className="relative bg-surface py-3 px-2 items-center">
          <Text className="text-md text-text-primary font-medium">
            {t("schedules.deleteTitle")}
          </Text>
          <View className="absolute top-3 right-4">
            <Pressable onPress={onClose}>
              <X color={text.secondary} />
            </Pressable>
          </View>
        </View>
        <View className="px-4 mt-8">
          <Text className="text-md font-medium text-text-primary">
            {schedule
              ? `${t(DAY_KEYS[schedule.day_of_week])} · ${schedule.start_time.slice(0, 5)} – ${schedule.end_time.slice(0, 5)}`
              : null}
          </Text>
          <Text className="text-sm text-text-secondary mt-2">
            {t("schedules.deleteMessage")}
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
              mutate(schedule?.id ?? 0, {
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

export default ScheduleDeleteSheet;