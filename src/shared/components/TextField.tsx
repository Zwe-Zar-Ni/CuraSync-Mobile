import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = {
  disabled?: boolean;
  label?: string;
  placeholder?: string;
} & TextInputProps;

const TextField = ({
  label,
  placeholder,
  disabled = false,
  ...props
}: Props) => {
  return (
    <View>
      {label ? (
        <Text className="text-sm font-medium text-text-tertiary mb-1">
          {label}
        </Text>
      ) : null}
      <TextInput
        placeholder={placeholder}
        className={`w-full bg-surface rounded-lg p-3.5 border-[0.5px] border-border text-text-primary text-md font-regular ${disabled ? "opacity-75" : "opacity-100"}`}
        placeholderTextColor="#61656C"
        {...props}
      />
    </View>
  );
};

export default TextField;
