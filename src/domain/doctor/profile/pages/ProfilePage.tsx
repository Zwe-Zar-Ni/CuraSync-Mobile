import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Heading from "../components/Heading";
import PersonalInformation from "../components/PersonalInformation";
import Settings from "../components/Settings";
import AccountSettings from "../components/AccountSettings";
import { useGetProfile } from "../queries";

const DoctorProfilePage = () => {
  const insets = useSafeAreaInsets();
  const { data: profile, isSuccess } = useGetProfile();
  console.log(profile);
  return (
    <View
      className="flex-1 bg-background px-3"
      style={{ paddingTop: insets.top + 8 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Heading profile={profile} isAuthenticated={isSuccess} />
        <PersonalInformation isAuthenticated={isSuccess} />
        <Settings />
        {isSuccess ? <AccountSettings /> : null}
      </ScrollView>
    </View>
  );
};

export default DoctorProfilePage;
