import useTheme from "@/common/hooks/useTheme";
import { Calendar, X } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable, FlatList } from "react-native";
import Modal from "react-native-modal";
import Button from "./Button";

const getOptions = () => {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= currentYear - 59; i--) {
    years.push(i);
  }
  return years;
};

type Props = {
  onChange: (e: number) => void;
  value: number;
  disabled?: boolean;
};

const YearPickerField = ({ onChange, value, disabled }: Props) => {
  const { t } = useTranslation();
  const { text } = useTheme();

  const [uiYear, setUiYear] = useState(new Date().getFullYear());
  const [visibility, setVisibility] = useState(false);

  return (
    <View>
      <Text className="text-sm font-medium text-text-secondary mb-3">
        {t("qualifications.year")}
      </Text>
      <Pressable
        className={`w-full flex-row items-center gap-2 bg-surface rounded-lg p-3 border border-border ${disabled ? "opacity-75" : "opacity-100"}`}
        onPress={() => setVisibility(true)}
        disabled={disabled}
      >
        <Calendar color={text.secondary} size={21} />
        <Text
          className={`text-md font-regular ${value ? "text-text-primary" : "text-text-tertiary"} flex-1`}
        >
          {value ?? "E.g. 2020"}
        </Text>
      </Pressable>
      <Modal
        style={{ justifyContent: "flex-end", margin: 0 }}
        backdropColor={"#0C0C0C"}
        onBackButtonPress={() => setVisibility(false)}
        onBackdropPress={() => setVisibility(false)}
        isVisible={visibility}
      >
        <View className="bg-background">
          <View className="relative bg-surface py-3 px-2 items-center">
            <Text className="text-md text-text-primary font-medium">
              Select Year
            </Text>
            <View className="absolute top-3 right-4">
              <Pressable onPress={() => setVisibility(false)}>
                <X color={text.secondary} />
              </Pressable>
            </View>
          </View>
          <FlatList
            data={getOptions()}
            numColumns={3}
            className="p-4 h-100"
            keyExtractor={(item) => item.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                key={item}
                onPress={() => setUiYear(item)}
                className={`border rounded-xl p-4 px-8 m-2 flex-1 ${uiYear === item ? "border-primary" : "border-border"}`}
              >
                <Text
                  className={`font-medium ${uiYear === item ? "text-primary" : "text-text-primary"}`}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
          <View className="pt-3 pb-6 px-4 mt-8">
            <Button
              text="Done"
              disabled={false}
              onPress={() => {
                onChange(uiYear);
                setVisibility(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default YearPickerField;
