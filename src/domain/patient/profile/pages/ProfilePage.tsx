import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Heading from "../components/Heading";
import PersonalInformation from "../components/PersonalInformation";
import Settings from "../components/Settings";
import AccountSettings from "../components/AccountSettings";

const ProfilePage = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-background px-3"
      style={{ paddingTop: insets.top + 8 }}
    >
      <ScrollView>
        <Heading />
        <PersonalInformation />
        <Settings />
        <AccountSettings />
      </ScrollView>
    </View>
  );
};

export default ProfilePage;
