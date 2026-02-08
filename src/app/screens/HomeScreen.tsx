import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<HomeStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container} accessibilityLabel="Home, start a new palm reading">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title} accessibilityRole="header">
            AI Palm Reading
          </Text>
          <Text style={styles.subtitle}>
            Discover insights about your life through ancient palmistry powered by modern AI
          </Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroCard}>
          <Text style={styles.heroIcon}>🔮</Text>
          <Text style={styles.heroTitle}>Unlock Your Palm's Secrets</Text>
          <Text style={styles.heroDescription}>
            Get a detailed AI-powered analysis of your palm lines, mounts, and fingers
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🤖</Text>
            <Text style={styles.featureTitle}>AI Analysis</Text>
            <Text style={styles.featureText}>
              Powered by Gemini 3 Pro for accurate readings
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>💬</Text>
            <Text style={styles.featureTitle}>Interactive Chat</Text>
            <Text style={styles.featureText}>
              Ask questions about your reading
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📚</Text>
            <Text style={styles.featureTitle}>Reading History</Text>
            <Text style={styles.featureText}>
              Save and review past analyses
            </Text>
          </View>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate("Capture")}
          accessibilityLabel="Capture palm for reading"
          accessibilityHint="Opens the camera to take a photo of your palm"
          accessibilityRole="button"
        >
          <Text style={styles.ctaButtonText}>📸 Scan Your Palm</Text>
          <Text style={styles.ctaButtonSubtext}>Get your reading in seconds</Text>
        </TouchableOpacity>

        {/* Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>How it works</Text>
          <View style={styles.infoStep}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>Capture a clear photo of your palm</Text>
          </View>
          <View style={styles.infoStep}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepText}>AI analyzes lines, mounts & fingers</Text>
          </View>
          <View style={styles.infoStep}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepText}>Get detailed insights & chat with AI</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  scrollContent: {
    padding: 16,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#94a3b8",
    lineHeight: 22,
  },
  heroCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 32,
    marginBottom: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  heroIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  heroDescription: {
    fontSize: 15,
    color: "#cbd5e1",
    textAlign: "center",
    lineHeight: 22,
  },
  featuresContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  featureCard: {
    flex: 1,
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#a78bfa",
    marginBottom: 6,
    textAlign: "center",
  },
  featureText: {
    fontSize: 11,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 16,
  },
  ctaButton: {
    backgroundColor: "#9333ea",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#9333ea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  ctaButtonSubtext: {
    fontSize: 13,
    color: "#e9d5ff",
  },
  infoCard: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },
  infoStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(147, 51, 234, 0.2)",
    color: "#9333ea",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 32,
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: "#cbd5e1",
    lineHeight: 20,
  },
});
