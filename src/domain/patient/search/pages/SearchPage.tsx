import useTheme from "@/common/hooks/useTheme";
import { Search } from "lucide-react-native";
import { useLayoutEffect, useRef } from "react";
import { View, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SearchPage = () => {
  const insets = useSafeAreaInsets();
  const { text } = useTheme();

  const inputRef = useRef<TextInput>(null);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <View
      className="flex-1 bg-background px-3"
      style={{ paddingTop: insets.top + 8 }}
    >
      <View>
        <View className="flex-row items-center bg-surface rounded-full p-1 px-4 gap-2">
          <Search color={text.secondary} size={20} />
          <TextInput placeholder="Search" autoFocus={true} className="flex-1" />
        </View>
      </View>
    </View>
  );
};

export default SearchPage;
