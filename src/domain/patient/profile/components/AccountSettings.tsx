import { LogOut, Trash } from "lucide-react-native";
import { View, Text, Pressable } from "react-native";

const AccountSettings = () => {
  return (
    <View className="mt-8">
      <Pressable className="p-3 rounded-full bg-red-700 flex-row justify-center items-center gap-2">
        <LogOut color="white" size={21} />
        <Text className="text-white font-medium">Logout</Text>
      </Pressable>
      <Pressable className="p-3 rounded-full border border-red-600 mt-4 flex-row justify-center items-center gap-2">
        <Trash color="red" size={21} />
        <Text className="text-red-500 font-medium">Delete Account</Text>
      </Pressable>
    </View>
  );
};

export default AccountSettings;
