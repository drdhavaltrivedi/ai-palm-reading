import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HistoryScreen } from "../screens/HistoryScreen";
import { ReadingDetailScreen } from "../screens/ReadingDetailScreen";
import { CompareScreen } from "../screens/CompareScreen";
import type { HistoryStackParamList } from "../../types/navigation";

const Stack = createNativeStackNavigator<HistoryStackParamList>();

export function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="ReadingDetail" component={ReadingDetailScreen} />
      <Stack.Screen name="Compare" component={CompareScreen} />
    </Stack.Navigator>
  );
}
