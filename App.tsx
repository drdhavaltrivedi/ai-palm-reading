import React from "react";
import { Platform, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./src/app/navigation";

const queryClient = new QueryClient();

const linking = {
  prefixes: Platform.OS === "web" ? ["/"] : ["ai-palm-reading://"],
  config: {
    screens: {
      Splash: "splash",
      Onboarding: "onboarding",
      Main: {
        path: "",
        screens: {
          Home: "",
          History: "history",
          Profile: "profile",
        },
      },
    },
  },
};

const RootWrapper = ({ children }: { children: React.ReactNode }) =>
  Platform.OS === "web" ? (
    <View style={{ flex: 1 }}>{children}</View>
  ) : (
    <GestureHandlerRootView style={{ flex: 1 }}>{children}</GestureHandlerRootView>
  );

export default function App() {
  return (
    <RootWrapper>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NavigationContainer linking={linking}>
            <RootNavigator />
            <StatusBar style="light" />
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </RootWrapper>
  );
}
