import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<HomeStackParamList, "Reading">;

export function ReadingScreen({ route, navigation }: Props) {
  const { reading, imageUri } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        accessibilityLabel="Your palm reading"
      >
        <Text style={styles.title} accessibilityRole="header">
          Your Palm Reading
        </Text>

        <View style={styles.handInfo}>
          <Text style={styles.handInfoText}>
            {reading.handSide === "left" ? "Left" : "Right"} Hand •{" "}
            {reading.isDominant ? "Dominant" : "Non-dominant"}
          </Text>
          <Text style={styles.dateText}>
            {new Date(reading.createdAt).toLocaleDateString()}
          </Text>
        </View>

        {reading.sections.map((s) => (
          <View key={s.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{s.title}</Text>
            <Text style={styles.sectionContent}>{s.content}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Chat Button - Fixed at bottom */}
      <View style={styles.chatButtonContainer}>
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => navigation.navigate("Chat", { reading, imageUri })}
          accessibilityLabel="Ask questions about your reading"
        >
          <Text style={styles.chatButtonIcon}>💬</Text>
          <Text style={styles.chatButtonText}>Ask Questions About Your Reading</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 100, // Space for chat button
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  handInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  handInfoText: {
    fontSize: 14,
    color: "#94a3b8",
    fontWeight: "600",
  },
  dateText: {
    fontSize: 13,
    color: "#64748b",
  },
  section: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#a78bfa",
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 15,
    color: "#cbd5e1",
    lineHeight: 22,
  },
  chatButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#0f172a",
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9333ea",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#9333ea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  chatButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  chatButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

