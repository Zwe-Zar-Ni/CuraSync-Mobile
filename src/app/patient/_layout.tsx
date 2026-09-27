import useTheme from "@/common/hooks/useTheme";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { User } from "lucide-react-native";
import { Pressable, Text } from "react-native";

const PatientLayout = () => {
  const { text } = useTheme();
  return (
    <Tabs className="flex-1 bg-background">
      <TabSlot />

      <TabList className="flex-row bg-surface h-15 bottom-6 mx-6 rounded-full">
        <TabTrigger name="profile" href="/patient/profile" className="flex-1">
          <Pressable className="flex-col  flex-1 items-center justify-center">
            <User color={text.primary} size={21} />
            <Text className="text-text-primary">Profile</Text>
          </Pressable>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
};

export default PatientLayout;
