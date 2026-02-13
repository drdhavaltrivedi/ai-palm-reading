import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../types/navigation";
import { getReading } from "../services/api";
import { useAppTheme } from "../theme/useAppTheme";

type Props = NativeStackScreenProps<HomeStackParamList, "AnalysisLoading">;

export function AnalysisLoadingScreen({ route, navigation }: Props) {
  const { colors } = useAppTheme();
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
    <View style={[styles.container, { backgroundColor: colors.background }]} accessibilityLabel="Analyzing your palm" accessibilityLiveRegion="polite">
      <View style={styles.content}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={[styles.title, { color: colors.textPrimary }]} accessibilityRole="header">
          Reading Your Palm…
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Our AI is analyzing the lines and patterns in your palm
        </Text>

        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <View style={[styles.stepDot, { backgroundColor: colors.accent }]} />
            <Text style={[styles.stepText, { color: colors.textSecondary }]}>Analyzing palm lines</Text>
          </View>
          <View style={styles.step}>
            <View style={[styles.stepDot, { backgroundColor: colors.accent }]} />
            <Text style={[styles.stepText, { color: colors.textSecondary }]}>Examining mounts & shapes</Text>
          </View>
          <View style={styles.step}>
            <View style={[styles.stepDot, { backgroundColor: colors.accent }]} />
            <Text style={[styles.stepText, { color: colors.textSecondary }]}>Generating insights</Text>
          </View>
        </View>
      </View>
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
  content: {
    alignItems: "center",
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
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
    marginRight: 12,
  },
  stepText: {
    fontSize: 14,
  },
});
