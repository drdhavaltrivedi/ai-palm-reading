import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { CaptureScreen } from "../screens/CaptureScreen";
import { AnalysisLoadingScreen } from "../screens/AnalysisLoadingScreen";
import { ReadingScreen } from "../screens/ReadingScreen";
import { ChatScreen } from "../screens/ChatScreen";
import type { HomeStackParamList } from "../../types/navigation";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Capture" component={CaptureScreen} />
      <Stack.Screen name="AnalysisLoading" component={AnalysisLoadingScreen} />
      <Stack.Screen name="Reading" component={ReadingScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
