import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types/navigation";
import { useAppTheme } from "../theme/useAppTheme";

type Props = NativeStackScreenProps<RootStackParamList, "NotFound">;

export function NotFoundScreen({ navigation }: Props) {
  const { colors, isDark } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]} accessibilityLabel="Page not found">
      <View style={[styles.iconContainer, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
        <Ionicons name="telescope-outline" size={64} color={colors.accent} />
      </View>
      
      <Text style={[styles.title, { color: colors.textPrimary }]} accessibilityRole="header">
        Lost in the Cosmos?
      </Text>
      
      <Text style={[styles.description, { color: colors.muted }]}>
        The page you are looking for seems to have drifted into a black hole.
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={() => navigation.replace("Main")}
        accessibilityRole="button"
        accessibilityLabel="Return to home"
      >
        <Text style={[styles.buttonText, { color: isDark ? colors.background : "#1F2937" }]}>
          Return Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
    maxWidth: 300,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
