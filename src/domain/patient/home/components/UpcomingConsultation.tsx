import { View, Text, Image, Pressable } from "react-native";
import { ArrowUpRight, Calendar, Monitor } from "lucide-react-native";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import useTheme from "@/common/hooks/useTheme";
import type { Consultation } from "../types";

type Props = {
  consultation: Consultation;
};

const UpcomingConsultation = ({ consultation }: Props) => {
  const { t } = useTranslation();
  const { text } = useTheme();
  const { doctor, scheduled_at, visit_type } = consultation;

  return (
    <View className="p-4 rounded-2xl border border-border bg-surface/50">
      <View className="flex-row gap-2">
        {doctor.profile_url ? (
          <Image
            src={doctor.profile_url}
            className="w-16 h-16 rounded-full"
            resizeMode="cover"
            width={64}
            height={64}
          />
        ) : null}
        <View>
          <Text className="text-xl font-semibold text-text-primary">
            {doctor.name}
          </Text>
          <Text className="font-medium text-text-secondary">
            {doctor.specilizations[0]?.name ?? ""}
          </Text>
        </View>
      </View>
      <View className="mt-4">
        <View className="flex-row">
          <View className="flex-1">
            <View className="flex-row gap-2 items-center">
              <Calendar color={text.secondary} size={18} />
              <Text className="text-text-secondary font-medium">
                {dayjs(scheduled_at).format("DD MMM YYYY, h:mm A")}
              </Text>
            </View>
            <View className="flex-row mt-1 gap-2 items-center">
              <Monitor color={text.secondary} size={18} />
              <Text className="text-text-secondary font-medium">
                {visit_type === "virtual"
                  ? t("home.virtualVisit")
                  : t("home.inPersonVisit")}
              </Text>
            </View>
          </View>
          <Pressable className="flex-row justify-center items-center rounded-full bg-primary gap-2 p-3">
            <ArrowUpRight color="white" size={18} />
            <Text className="text-white font-medium">{t("home.view")}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default UpcomingConsultation;
