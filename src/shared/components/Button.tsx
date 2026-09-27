import { ReactNode } from "react";
import { Pressable, Text } from "react-native";

type Props = {
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  text?: string;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  onPress: () => void;
};

type ButtonVariant = "default" | "outline" | "ghost";

export const variants = {
  default: "bg-primary",
  outline: "bg-transparent border border-secondary",
  ghost: "bg-transparent"
} as const;

const Button = ({
  prefixIcon,
  suffixIcon,
  text,
  variant,
  className,
  disabled = false,
  onPress
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full gap-2 px-4 flex flex-row justify-center items-center h-12 disabled:opacity-40 ${variants[variant ?? "default"]} ${className}`}
      disabled={disabled}
    >
      {prefixIcon ? prefixIcon : null}
      {text ? (
        <Text
          className={`text-md font-medium ${variant === "default" || variant === undefined ? "text-white" : "text-text-primary"}`}
        >
          {text}
        </Text>
      ) : null}
      {suffixIcon ? suffixIcon : null}
    </Pressable>
  );
};

export default Button;
