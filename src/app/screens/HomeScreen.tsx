import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../types/navigation";
import { useAppTheme } from "../theme/useAppTheme";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<HomeStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const { colors, isDark } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]} accessibilityLabel="Home, start a new palm reading">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]} accessibilityRole="header">
            Cosmic Palmistry
          </Text>
          <Text style={[styles.subtitle, { color: colors.textDim }]}>
            Unlock your destiny with AI-powered ancient wisdom
          </Text>
        </View>

        {/* Hero Section */}
        <View style={[styles.heroCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.borderHighlight, shadowColor: colors.primary }]}>
          <View style={[styles.heroIconContainer, { backgroundColor: isDark ? "rgba(251, 191, 36, 0.1)" : colors.surface, borderColor: colors.accent }]}>
            <Ionicons name="sparkles" size={48} color={colors.accent} />
          </View>
          <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>Discover Your Path</Text>
          <Text style={[styles.heroDescription, { color: colors.textSecondary }]}>
            Scan your palm to reveal insights about your life, love, and career through the stars.
          </Text>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={[styles.ctaButton, { backgroundColor: colors.accent, shadowColor: colors.accent }]}
          onPress={() => navigation.navigate("Capture")}
          accessibilityLabel="Capture palm for reading"
          accessibilityHint="Opens the camera to take a photo of your palm"
          accessibilityRole="button"
        >
          <Ionicons name="camera" size={24} color={isDark ? colors.background : "#1F2937"} style={{ marginRight: 8 }} />
          <View>
            <Text style={[styles.ctaButtonText, { color: isDark ? colors.background : "#1F2937" }]}>Begin Reading</Text>
            <Text style={[styles.ctaButtonSubtext, { color: isDark ? "rgba(5, 4, 10, 0.7)" : "rgba(31, 41, 55, 0.7)" }]}>Instant AI Analysis</Text>
          </View>
        </TouchableOpacity>

        {/* Features */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Mystical Features</Text>
        </View>
        
        <View style={styles.featuresContainer}>
          <View style={[styles.featureCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="finger-print-outline" size={28} color={colors.primaryLight} style={styles.featureIcon} />
            <Text style={[styles.featureTitle, { color: colors.textPrimary }]}>Deep Analysis</Text>
            <Text style={[styles.featureText, { color: colors.muted }]}>
              Lines & Mounts
            </Text>
          </View>

          <View style={[styles.featureCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="chatbubbles-outline" size={28} color={colors.primaryLight} style={styles.featureIcon} />
            <Text style={[styles.featureTitle, { color: colors.textPrimary }]}>Spirit Chat</Text>
            <Text style={[styles.featureText, { color: colors.muted }]}>
              Ask the Oracle
            </Text>
          </View>

          <View style={[styles.featureCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="journal-outline" size={28} color={colors.primaryLight} style={styles.featureIcon} />
            <Text style={[styles.featureTitle, { color: colors.textPrimary }]}>Soul Journal</Text>
            <Text style={[styles.featureText, { color: colors.muted }]}>
              Track Growth
            </Text>
          </View>
        </View>

        {/* Info */}
        <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.infoTitle, { color: colors.textPrimary }]}>The Journey</Text>
          <View style={styles.infoStep}>
            <View style={[styles.stepNumberContainer, { backgroundColor: colors.surfaceElevated, borderColor: colors.primary }]}>
              <Text style={[styles.stepNumber, { color: colors.primaryLight }]}>1</Text>
            </View>
            <Text style={[styles.stepText, { color: colors.textSecondary }]}>Capture your palm under good light</Text>
          </View>
          <View style={styles.infoStep}>
             <View style={[styles.stepNumberContainer, { backgroundColor: colors.surfaceElevated, borderColor: colors.primary }]}>
              <Text style={[styles.stepNumber, { color: colors.primaryLight }]}>2</Text>
            </View>
            <Text style={[styles.stepText, { color: colors.textSecondary }]}>Let the AI decipher your cosmic lines</Text>
          </View>
          <View style={styles.infoStep}>
             <View style={[styles.stepNumberContainer, { backgroundColor: colors.surfaceElevated, borderColor: colors.primary }]}>
              <Text style={[styles.stepNumber, { color: colors.primaryLight }]}>3</Text>
            </View>
            <Text style={[styles.stepText, { color: colors.textSecondary }]}>Receive guidance for your life path</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: "80%",
  },
  heroCard: {
    borderRadius: 24,
    padding: 32,
    marginBottom: 24,
    alignItems: "center",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  heroIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  heroDescription: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  sectionHeader: {
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  featuresContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  featureCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
  },
  featureIcon: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  featureText: {
    fontSize: 11,
    textAlign: "center",
    lineHeight: 14,
  },
  ctaButton: {
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 22,
  },
  ctaButtonSubtext: {
    fontSize: 12,
    fontWeight: "600",
  },
  infoCard: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  infoStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stepNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "bold",
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
