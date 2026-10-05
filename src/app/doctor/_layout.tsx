import useTheme from "@/common/hooks/useTheme";
import { usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { Calendar, Home, User } from "lucide-react-native";
import { Text, View } from "react-native";

const tabs = [
  {
    name: "Home",
    href: "/doctor/home",
    icon: Home
  },
  {
    name: "Schedule",
    href: "/doctor/schedule",
    icon: Calendar
  },
  {
    name: "Profile",
    href: "/doctor/profile",
    icon: User
  }
] as const;

const DoctorLayout = () => {
  const { colors, text } = useTheme();
  const pathname = usePathname();

  const showTabs = pathname.split("/").length === 3;

  return (
    <Tabs className="bg-background">
      <TabSlot />

      <TabList
        className={`bg-surface h-15 bottom-6 mx-6 rounded-full ${showTabs ? "flex-row" : "hidden"}`}
      >
        {tabs.map((tab, index) => (
          <TabTrigger
            key={index}
            name={tab.name}
            href={tab.href}
            className="flex-1 rounded-full overflow-hidden"
          >
            <View
              className={`flex-col  flex-1 items-center rounded-full justify-center`}
            >
              <tab.icon
                color={pathname === tab.href ? colors.primary : text.primary}
                size={21}
              />
              {pathname === tab.href ? (
                <Text className="text-primary text-sm font-medium">
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

export default DoctorLayout;
