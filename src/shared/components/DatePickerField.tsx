import DatePicker from "@/shared/components/DatePicker";
import dayjs from "dayjs";
import { Calendar, X } from "lucide-react-native";
import { useRef, useState } from "react";
import { Pressable, View, Text } from "react-native";
import { DateType } from "react-native-ui-datepicker";
import { useUniwind } from "uniwind";
import Modal from "react-native-modal";
import useTheme from "@/common/hooks/useTheme";
import Button from "./Button";

type Props = {
  date: string;
  setDate: (e: string) => void;
  label: string;
  placeholder: string;
  displayDateFormat?: string;
  disabled?: boolean;
};

const DatePickerField = ({
  date,
  setDate,
  label,
  placeholder,
  displayDateFormat = "MMM DD, YYYY",
  disabled = false
}: Props) => {
  const { isDark, text } = useTheme();
  const [uiDate, setUiDate] = useState<DateType>(new Date());

  const [visibility, setVisibility] = useState(false);

  return (
    <View className="mt-6">
      <Text className="text-sm font-medium text-text-secondary mb-3">
        {label}
      </Text>
      <Pressable
        className={`w-full flex-row items-center gap-2 bg-surface rounded-lg p-3 border border-border ${disabled ? "opacity-75" : "opacity-100"}`}
        onPress={() => setVisibility(true)}
        disabled={disabled}
      >
        <Calendar color={text.secondary} />
        <Text
          className={`text-md font-regular ${date && date.length ? "text-text-primary" : "text-text-tertiary"} flex-1`}
        >
          {date && date.length
            ? dayjs(date).format(displayDateFormat)
            : placeholder}
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
              Select Date
            </Text>
            <View className="absolute top-3 right-4">
              <Pressable onPress={() => setVisibility(false)}>
                <X color={text.secondary} />
              </Pressable>
            </View>
          </View>
          <View className="my-3 items-center gap-0.5">
            <Text className="text-xs font-medium text-text-tertiary">
              {label}
            </Text>
            <Text className="text-sm font-semibold text-text-primary">
              {dayjs(uiDate).format("DD/MM/YYYY")}
            </Text>
          </View>
          <View className="px-3">
            <DatePicker date={uiDate} setDate={setUiDate} mode="single" />
          </View>
          <View className="pt-3 pb-6 mt-8 px-4">
            <Button
              text="Done"
              disabled={false}
              onPress={() => {
                setDate(dayjs(uiDate).format("YYYY-MM-DD"));
                setVisibility(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePickerField;
