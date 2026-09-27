import useTheme from "@/common/hooks/useTheme";
import { Eye, EyeClosed } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

type Props = {
  disabled?: boolean;
  label?: string;
  placeholder?: string;
} & TextInputProps;

const PasswordField = ({
  label,
  placeholder,
  disabled = false,
  ...props
}: Props) => {
  const { text } = useTheme();
  const [show, setShow] = useState(false);

  return (
    <View>
      {label ? (
        <Text className="text-sm font-medium text-text-tertiary mb-1">
          {label}
        </Text>
      ) : null}
      <View className="relative">
        <TextInput
          placeholder={placeholder}
          secureTextEntry={show}
          className={`w-full bg-surface rounded-lg p-3.5 border-[0.5px] border-border text-text-primary text-md font-regular ${disabled ? "opacity-75" : "opacity-100"}`}
          placeholderTextColor="#61656C"
          {...props}
        />
        <Pressable
          className="absolute top-3 right-4 flex items-center justify-center"
          onPress={() => setShow(!show)}
        >
          {show ? (
            <Eye size={21} color={text.secondary} />
          ) : (
            <EyeClosed size={21} color={text.secondary} />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default PasswordField;
