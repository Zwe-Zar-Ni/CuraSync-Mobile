import { View, Text } from "react-native";
import { Link } from "expo-router";
import UpcomingConsultation from "./UpcomingConsultation";

const UpcomingConsultations = () => {
  return (
    <View className="mt-8">
      <View className="flex-row justify-between items-center gap-4">
        <Text className="text-text-primary text-xl     font-semibold">
          Upcoming Consultations
        </Text>
        <Link href="/patient/profile">
          <Text className="text-primary font-medium">See All</Text>
        </Link>
      </View>
      <View className="mt-2">
        <UpcomingConsultation />
      </View>
    </View>
  );
};

export default UpcomingConsultations;
