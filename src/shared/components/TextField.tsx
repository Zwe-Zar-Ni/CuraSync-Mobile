import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = {
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
} & TextInputProps;

const TextField = ({
  label,
  placeholder,
  disabled = false,
  error,
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
      {error ? (
        <Text className="text-xs text-red-500 font-medium mt-1">{error}</Text>
      ) : null}
    </View>
  );
};

export default TextField;
