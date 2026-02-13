import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HistoryStackParamList } from "../../types/navigation";
import { useAppTheme } from "../theme/useAppTheme";

type Props = NativeStackScreenProps<HistoryStackParamList, "Compare">;

export function CompareScreen({}: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }]}
      accessibilityLabel="Compare left and right hand readings"
    >
      <Text
        style={[styles.title, { color: colors.textPrimary }]}
        accessibilityRole="header"
      >
        Compare hands
      </Text>
      <Text style={[styles.description, { color: colors.muted }]}>
        Left vs right comparison when both readings exist.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold", // font-serif equivalent would need custom font loading, using bold for now
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
  },
});
