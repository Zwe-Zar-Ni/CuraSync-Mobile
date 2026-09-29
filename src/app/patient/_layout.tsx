import useTheme from "@/common/hooks/useTheme";
import { usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { Home, Search, User } from "lucide-react-native";
import { Text, View } from "react-native";

const tabs = [
  {
    name: "Home",
    href: "/patient/home",
    icon: Home
  },
  {
    name: "Search",
    href: "/patient/search",
    icon: Search
  },
  {
    name: "Profile",
    href: "/patient/profile",
    icon: User
  }
] as const;

const PatientLayout = () => {
  const { colors, text } = useTheme();
  const pathname = usePathname();

  const showTabs = pathname.split("/").length === 3;

  return (
    <Tabs className="bg-background">
      <TabSlot />

      <TabList
        className={`bg-surface h-15 bottom-6 mx-6 rounded-full ${showTabs ? "flex-row" : "hidden"}`}
      >
        {tabs.map((tab, index) =>
          tab.name === "Search" ? (
            <TabTrigger
              name={tab.name}
              href={tab.href}
              key={index}
              // className="rounded-full overflow-hidden p-1 bottom-7"
              className="rounded-full overflow-hidden p-1"
            >
              <View
                className={`flex-col items-center rounded-full justify-center bg-primary aspect-square`}
              >
                <Search color="white" size={24} />
              </View>
            </TabTrigger>
          ) : (
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
          )
        )}
      </TabList>
    </Tabs>
  );
};

export default PatientLayout;
