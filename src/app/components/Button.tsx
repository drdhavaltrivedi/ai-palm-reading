import React from "react";
import {
  TouchableOpacity,
  Text,
  type ViewStyle,
  type TextStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  /** Screen reader label; defaults to title */
  accessibilityLabel?: string;
  /** Optional hint for screen readers */
  accessibilityHint?: string;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  style,
  textStyle,
  disabled,
  accessibilityLabel,
  accessibilityHint,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      className={`rounded-xl px-6 py-3 ${
        variant === "primary" ? "bg-amber-800" : "border border-amber-700"
      }`}
      style={[{ minHeight: 44, justifyContent: "center" }, style]}
    >
      <Text
        className={`text-base font-medium ${
          variant === "primary" ? "text-white" : "text-amber-200"
        }`}
        style={textStyle}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
