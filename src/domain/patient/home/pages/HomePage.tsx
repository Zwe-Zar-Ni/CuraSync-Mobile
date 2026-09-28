import { View, Text } from "react-native";
import Heading from "../components/Heading";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UpcomingConsultations from "../components/UpcomingConsultations";
import Specializations from "../components/Specializations";
import { FlashList } from "@shopify/flash-list";
import { useGetDoctors } from "../queries";
import DoctorCard from "../components/DoctorCard";

const PatientHomePage = () => {
  const insets = useSafeAreaInsets();
  const { data, isPending } = useGetDoctors();
  return (
    <View
      className="flex-1 bg-background px-3"
      style={{ paddingTop: insets.top + 8 }}
    >
      <FlashList
        data={data?.data}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={() => (
          <>
            <Heading />
            <UpcomingConsultations />
            <Specializations />
          </>
        )}
        renderItem={({ item, index }) => (
          <View className={`${index % 2 === 0 ? "pr-1" : "pl-1"}`}>
            <DoctorCard />
          </View>
        )}
      />
    </View>
  );
};

export default PatientHomePage;
