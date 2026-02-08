import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../types/navigation";
import { getReading } from "../services/api";

type Props = NativeStackScreenProps<HomeStackParamList, "AnalysisLoading">;

export function AnalysisLoadingScreen({ route, navigation }: Props) {
  const { readingId } = route.params;

  useEffect(() => {
    if (readingId) {
      // Fetch the reading and navigate to Reading screen
      const loadReading = async () => {
        try {
          const reading = await getReading(readingId);
          navigation.replace("Reading", {
            reading,
            imageUri: reading.imageUri,
          });
        } catch (error) {
          console.error("Error loading reading:", error);
          // Navigate back to home on error
          navigation.navigate("Home");
        }
      };

      loadReading();
    }
  }, [readingId, navigation]);

  return (
    <View style={styles.container} accessibilityLabel="Analyzing your palm" accessibilityLiveRegion="polite">
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#9333ea" />
        <Text style={styles.title} accessibilityRole="header">
          Reading Your Palm…
        </Text>
        <Text style={styles.subtitle}>
          Our AI is analyzing the lines and patterns in your palm
        </Text>

        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <View style={styles.stepDot} />
            <Text style={styles.stepText}>Analyzing palm lines</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepDot} />
            <Text style={styles.stepText}>Examining mounts & shapes</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepDot} />
            <Text style={styles.stepText}>Generating insights</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  content: {
    alignItems: "center",
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 24,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 40,
  },
  stepsContainer: {
    width: "100%",
    gap: 16,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#9333ea",
    marginRight: 12,
  },
  stepText: {
    fontSize: 14,
    color: "#cbd5e1",
  },
});
