import React from "react";
import { View, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HistoryStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<HistoryStackParamList, "Compare">;

export function CompareScreen({}: Props) {
  return (
    <View
      className="flex-1 bg-background px-6 pt-8"
      accessibilityLabel="Compare left and right hand readings"
    >
      <Text
        className="text-2xl text-white font-serif mb-6"
        accessibilityRole="header"
      >
        Compare hands
      </Text>
      <Text className="text-muted">
        Left vs right comparison when both readings exist.
      </Text>
    </View>
  );
}
