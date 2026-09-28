import useTheme from "@/common/hooks/useTheme";
import { usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { Heart, User } from "lucide-react-native";
import { Text, View } from "react-native";

const tabs = [
  {
    name: "Home",
    href: "/patient/home",
    icon: Heart
  },
  {
    name: "Profile",
    href: "/patient/profile",
    icon: User
  }
] as const;

const PatientLayout = () => {
  const { text } = useTheme();
  const pathname = usePathname();

  return (
    <Tabs className="flex-1 bg-background">
      <TabSlot />

      <TabList className="flex-row bg-surface h-15 bottom-6 mx-6 rounded-full">
        {tabs.map((tab, index) => (
          <TabTrigger
            key={index}
            name={tab.name}
            href={tab.href}
            className="flex-1 rounded-full overflow-hidden"
          >
            <View
              className={`flex-col  flex-1 items-center rounded-full justify-center ${pathname === tab.href ? "bg-secondary" : "bg-transparent"}`}
            >
              <tab.icon
                color={pathname === tab.href ? "black" : text.primary}
                size={21}
              />
              {pathname === tab.href ? (
                <Text className="text-black text-sm font-medium">
                  {tab.name}
                </Text>
              ) : null}
            </View>
          </TabTrigger>
        ))}
      </TabList>
    </Tabs>
  );
};

export default PatientLayout;
