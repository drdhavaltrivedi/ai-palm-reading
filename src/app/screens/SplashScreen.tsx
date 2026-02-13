import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator, Platform } from "react-native";
import { useOnboardingStore } from "../store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types/navigation";
import { useAppTheme } from "../theme/useAppTheme";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export function SplashScreen({ navigation }: Props) {
  const { colors } = useAppTheme();
  const completed = useOnboardingStore((s) => s.completed);

  useEffect(() => {
    const t = setTimeout(() => {
      if (completed) {
        navigation.replace("Main");
      } else {
        navigation.replace("Onboarding");
      }
    }, 2500); // Give time to see the splash
    return () => clearTimeout(t);
  }, [completed, navigation]);

  const content = (
    <View style={styles.overlay}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.accentLight} />
        <Text style={[styles.loadingText, { color: colors.muted }]}>Loading...</Text>
      </View>
    </View>
  );

  if (Platform.OS === "web") {
    return (
      <View style={[styles.container, styles.containerWeb, { backgroundColor: colors.background }]} accessibilityLabel="Loading app">
        <View style={styles.overlayWeb}>
          <ActivityIndicator size="large" color={colors.accentLight} />
          <Text style={[styles.loadingTextWeb, { color: colors.muted }]}>Loading AI Palm Reading…</Text>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../../assets/splash.png")}
      style={[styles.container, { backgroundColor: colors.background }]}
      resizeMode="cover"
      accessibilityLabel="Loading app"
    >
      {content}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerWeb: {
    minHeight: "100vh" as unknown as number,
    width: "100%" as unknown as number,
  },
  overlayWeb: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingTextWeb: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(12, 10, 9, 0.4)",
    justifyContent: "flex-end",
    paddingBottom: 60,
  },
  loadingContainer: {
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 13,
    letterSpacing: 1,
  },
});
