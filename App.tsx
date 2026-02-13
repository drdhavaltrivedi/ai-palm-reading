import React from "react";
import { Platform, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
// On web, initialWindowMetrics can be null; pass undefined to use default behavior
const safeAreaInitialMetrics = Platform.OS === "web" ? undefined : initialWindowMetrics;
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./src/app/navigation";
import { useAppTheme } from "./src/app/theme/useAppTheme";
import { ErrorBoundary } from "./src/app/components/ErrorBoundary";

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
          HomeTab: {
            path: "",
            screens: {
              Home: "",
              Capture: "capture",
              AnalysisLoading: "analyzing",
              Reading: "reading",
              Chat: "chat",
            },
          },
          HistoryTab: {
            path: "history",
            screens: {
              History: "",
              ReadingDetail: "reading-detail",
              Compare: "compare",
            },
          },
          ProfileTab: {
            path: "profile",
            screens: {
              Profile: "",
              Paywall: "premium",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};

const RootWrapper = ({ children }: { children: React.ReactNode }) =>
  Platform.OS === "web" ? (
    <View style={{ flex: 1, minHeight: "100vh" as any, width: "100%", backgroundColor: "#0c0a09" }}>{children}</View>
  ) : (
    <GestureHandlerRootView style={{ flex: 1 }}>{children}</GestureHandlerRootView>
  );

function AppContent() {
  const { isDark } = useAppTheme();
  
  return (
    <NavigationContainer linking={linking}>
      <RootNavigator />
      <StatusBar style={isDark ? "light" : "dark"} />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <RootWrapper>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider initialMetrics={safeAreaInitialMetrics}>
            <AppContent />
          </SafeAreaProvider>
        </QueryClientProvider>
      </RootWrapper>
    </ErrorBoundary>
  );
}
