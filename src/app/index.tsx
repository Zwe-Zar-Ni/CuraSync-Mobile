import { Link } from "expo-router";
import { View } from "react-native";

const index = () => {
  return (
    <View>
      <Link href="/patient/profile">To Patient Profile</Link>
    </View>
  );
};

export default index;
