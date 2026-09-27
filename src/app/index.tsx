import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1 bg-background">
        <Link href="/auth/register">
          <Text className="text-text-primary">Register</Text>
        </Link>
      </SafeAreaView>
    </View>
  );
};

export default index;
