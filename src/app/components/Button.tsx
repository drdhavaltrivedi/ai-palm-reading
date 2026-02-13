import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { useAppTheme } from "../theme/useAppTheme";

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
  const { colors, isDark } = useAppTheme();

  const containerStyle = [
    styles.container,
    variant === "primary" 
      ? { backgroundColor: colors.accent } 
      : { backgroundColor: "transparent", borderWidth: 1, borderColor: colors.accent },
    disabled && { opacity: 0.5, backgroundColor: colors.surfaceElevated },
    style,
  ];

  const contentStyle = [
    styles.text,
    variant === "primary" 
      ? { color: isDark ? colors.background : "#1F2937", fontWeight: "700" as const } 
      : { color: colors.accent },
    disabled && { color: colors.muted },
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      style={containerStyle}
    >
      <Text style={contentStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
