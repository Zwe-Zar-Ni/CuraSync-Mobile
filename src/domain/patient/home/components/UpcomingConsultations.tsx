import { View, Text } from "react-native";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { docs } from "../services/dummy";
import type { Consultation } from "../types";
import UpcomingConsultation from "./UpcomingConsultation";

const consultation: Consultation = {
  id: 1,
  doctor: docs.data[0],
  scheduled_at: "2026-09-30T10:00:00",
  visit_type: "virtual"
};

const UpcomingConsultations = () => {
  const { t } = useTranslation();

  return (
    <View className="mt-8">
      <View className="flex-row justify-between items-center gap-4">
        <Text className="text-text-primary text-xl font-semibold">
          {t("home.upcomingConsultations")}
        </Text>
        <Link href="/patient/profile">
          <Text className="text-primary font-medium">{t("home.seeAll")}</Text>
        </Link>
      </View>
      <View className="mt-2">
        <UpcomingConsultation consultation={consultation} />
      </View>
    </View>
  );
};

export default UpcomingConsultations;
