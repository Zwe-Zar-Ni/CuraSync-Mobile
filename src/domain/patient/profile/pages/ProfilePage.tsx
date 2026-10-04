import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Heading from "../components/Heading";
import PersonalInformation from "../components/PersonalInformation";
import Settings from "../components/Settings";
import AccountSettings from "../components/AccountSettings";
import useAuth from "@/common/hooks/useAuth";
import { Patient } from "@/common/types";

const PatientProfilePage = () => {
  const insets = useSafeAreaInsets();
  const { user, isAuthenticated } = useAuth();

  return (
    <View
      className="flex-1 bg-background px-3"
      style={{ paddingTop: insets.top + 8 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Heading profile={user as Patient} isAuthenticated={isAuthenticated} />
        <PersonalInformation isAuthenticated={isAuthenticated} />
        <Settings />
        {isAuthenticated ? <AccountSettings /> : null}
      </ScrollView>
    </View>
  );
};

export default PatientProfilePage;
