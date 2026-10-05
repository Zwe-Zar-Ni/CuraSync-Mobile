import DatePicker from "@/shared/components/DatePicker";
import dayjs from "dayjs";
import { Calendar, X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View, Text } from "react-native";
import { DateType } from "react-native-ui-datepicker";
import Modal from "react-native-modal";
import useTheme from "@/common/hooks/useTheme";
import Button from "./Button";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type Props = {
  time: string;
  // e is "HH:mm:ss" format
  setTime: (e: string) => void;
  label: string;
  disabled?: boolean;
};

const TimePickerField = ({ time, setTime, label, disabled = false }: Props) => {
  const { text } = useTheme();
  const [uiTime, setUiTime] = useState<DateType>(
    dayjs(time, "HH:mm:ss").isValid() ? dayjs(time, "HH:mm:ss") : new Date()
  );

  const [visibility, setVisibility] = useState(false);

  return (
    <View>
      <Text className="text-sm font-medium text-text-secondary mb-3">
        {label}
      </Text>
      <Pressable
        className={`w-full flex-row items-center gap-2 bg-surface rounded-lg p-3 border border-border ${disabled ? "opacity-75" : "opacity-100"}`}
        onPress={() => setVisibility(true)}
        disabled={disabled}
      >
        <Calendar color={text.secondary} size={21} />
        <Text
          className={`text-md font-regular ${time && time.length ? "text-text-primary" : "text-text-tertiary"} flex-1`}
        >
          {time && time.length ? time : "00:00:00"}
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
              Select Time
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
              {dayjs(uiTime).format("HH:mm:ss")}
            </Text>
          </View>
          <View className="px-3">
            <DatePicker date={uiTime} setDate={setUiTime} type="time" />
          </View>
          <View className="pt-3 pb-6 mt-4 px-4">
            <Button
              text="Done"
              disabled={false}
              onPress={() => {
                setTime(dayjs(uiTime).format("HH:mm:ss"));
                setVisibility(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TimePickerField;
