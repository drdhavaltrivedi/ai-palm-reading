import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import { useOnboardingStore } from "../store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export function SplashScreen({ navigation }: Props) {
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

  return (
    <ImageBackground
      source={require("../../../assets/splash.png")}
      style={styles.container}
      resizeMode="cover"
      accessibilityLabel="Loading app"
    >
      {/* Overlay for better text readability */}
      <View style={styles.overlay}>
        {/* Loading indicator at bottom */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#a78bfa" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.3)", // Slight dark overlay
    justifyContent: "flex-end",
    paddingBottom: 60,
  },
  loadingContainer: {
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 13,
    color: "#94a3b8",
    letterSpacing: 1,
  },
});
