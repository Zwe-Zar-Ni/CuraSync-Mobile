import useTheme from "@/common/hooks/useTheme";
import { Circle, CircleCheck, HeartPulse, X } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable } from "react-native";
import Modal from "react-native-modal";
import Button from "./Button";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

type Props = {
  onChange: (e: string) => void;
  value: string;
  disabled?: boolean;
};

const BloodTypeField = ({ onChange, value, disabled }: Props) => {
  const { t } = useTranslation();
  const { text } = useTheme();

  const [uiType, setUiType] = useState("");
  const [visibility, setVisibility] = useState(false);

  return (
    <View>
      <Text className="text-sm font-medium text-text-secondary mb-3">
        {t("labels.bloodType")}
      </Text>
      <Pressable
        className={`w-full flex-row items-center gap-2 bg-surface rounded-lg p-3 border border-border ${disabled ? "opacity-75" : "opacity-100"}`}
        onPress={() => setVisibility(true)}
        disabled={disabled}
      >
        <HeartPulse color={text.secondary} size={21} />
        <Text
          className={`text-md font-regular ${value.length ? "text-text-primary" : "text-text-tertiary"} flex-1`}
        >
          {value.length ? value : "Blood Type"}
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
              Select Blood Type
            </Text>
            <View className="absolute top-3 right-4">
              <Pressable onPress={() => setVisibility(false)}>
                <X color={text.secondary} />
              </Pressable>
            </View>
          </View>
          <View className="flex-row flex-wrap gap-4 mt-8 px-4">
            {BLOOD_TYPES.map((type) => (
              <Pressable
                key={type}
                onPress={() => setUiType(type)}
                className={`border rounded-xl p-4 px-8 ${uiType === type ? "border-primary" : "border-border"}`}
              >
                <Text
                  className={`font-medium ${uiType === type ? "text-primary" : "text-text-primary"}`}
                >
                  {type}
                </Text>
              </Pressable>
            ))}
          </View>
          <View className="pt-3 pb-6 mt-8 px-4">
            <Button
              text="Done"
              disabled={false}
              onPress={() => {
                onChange(uiType);
                setVisibility(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BloodTypeField;
