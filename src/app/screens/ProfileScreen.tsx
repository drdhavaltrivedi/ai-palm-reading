import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ProfileStackParamList } from "../../types/navigation";
import { getReadingsList } from "../services/api";

type Props = NativeStackScreenProps<ProfileStackParamList, "Profile">;

export function ProfileScreen({ navigation }: Props) {
  const [totalReadings, setTotalReadings] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled] = useState(true); // Always dark for this app

  useEffect(() => {
    loadStats();
    loadSettings();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadStats();
    });
    return unsubscribe;
  }, [navigation]);

  const loadStats = async () => {
    try {
      const readings = await getReadingsList();
      setTotalReadings(readings.length);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const loadSettings = async () => {
    try {
      const notifications = await AsyncStorage.getItem("@notifications_enabled");
      if (notifications !== null) {
        setNotificationsEnabled(notifications === "true");
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const toggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    try {
      await AsyncStorage.setItem("@notifications_enabled", value.toString());
    } catch (error) {
      console.error("Error saving notification setting:", error);
    }
  };

  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "This will delete all your palm readings permanently. This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("@palm_readings");
              setTotalReadings(0);
              Alert.alert("Success", "All readings have been cleared");
            } catch (error) {
              console.error("Error clearing data:", error);
              Alert.alert("Error", "Failed to clear data");
            }
          },
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "About AI Palm Reading",
      `Version 1.0.0\n\nPowered by Gemini 3 Pro AI\n\nThis app uses advanced AI to analyze your palm and provide personalized palmistry insights. All your data is stored locally on your device.`,
      [{ text: "OK" }]
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      "Privacy Policy",
      "Your privacy is important to us:\n\n• All palm readings are stored locally on your device\n• Palm images never leave your device except for AI analysis\n• We use Google's Gemini AI API for palm analysis\n• No personal data is collected or shared\n• You can delete all your data at any time",
      [{ text: "OK" }]
    );
  };

  const handleSupport = () => {
    Linking.openURL("mailto:support@example.com?subject=AI Palm Reading Support");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      accessibilityLabel="Profile and settings"
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          Profile
        </Text>
      </View>

      {/* Stats Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Your Statistics</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalReadings}</Text>
            <Text style={styles.statLabel}>
              Palm {totalReadings === 1 ? "Reading" : "Readings"}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>🔮</Text>
            <Text style={styles.statLabel}>AI Powered</Text>
          </View>
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        {/* Notifications */}
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Text style={styles.settingDescription}>
              Receive updates and reminders
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: "#334155", true: "#9333ea" }}
            thumbColor="#fff"
          />
        </View>

        {/* Dark Mode (Always on) */}
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Text style={styles.settingDescription}>Premium dark theme</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            disabled={true}
            trackColor={{ false: "#334155", true: "#9333ea" }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* AI Model Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Information</Text>
        <View style={styles.card}>
          <View style={styles.modelInfo}>
            <Text style={styles.modelLabel}>Current AI Model</Text>
            <Text style={styles.modelValue}>Gemini 3 Pro Preview</Text>
            <Text style={styles.modelDescription}>
              Google's most advanced AI for the best palm reading quality
            </Text>
          </View>
        </View>
      </View>

      {/* Actions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data & Privacy</Text>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleClearData}
          accessibilityRole="button"
        >
          <Text style={styles.actionIcon}>🗑️</Text>
          <View style={styles.actionInfo}>
            <Text style={styles.actionLabel}>Clear All Data</Text>
            <Text style={styles.actionDescription}>
              Delete all palm readings
            </Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handlePrivacy}
          accessibilityRole="button"
        >
          <Text style={styles.actionIcon}>🔒</Text>
          <View style={styles.actionInfo}>
            <Text style={styles.actionLabel}>Privacy Policy</Text>
            <Text style={styles.actionDescription}>How we protect your data</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support & Info</Text>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleAbout}
          accessibilityRole="button"
        >
          <Text style={styles.actionIcon}>ℹ️</Text>
          <View style={styles.actionInfo}>
            <Text style={styles.actionLabel}>About</Text>
            <Text style={styles.actionDescription}>App version & info</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSupport}
          accessibilityRole="button"
        >
          <Text style={styles.actionIcon}>💌</Text>
          <View style={styles.actionInfo}>
            <Text style={styles.actionLabel}>Contact Support</Text>
            <Text style={styles.actionDescription}>Get help and feedback</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            Linking.openURL("https://github.com/yourusername/ai-palm-reading")
          }
          accessibilityRole="button"
        >
          <Text style={styles.actionIcon}>⭐</Text>
          <View style={styles.actionInfo}>
            <Text style={styles.actionLabel}>Rate the App</Text>
            <Text style={styles.actionDescription}>Share your feedback</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>AI Palm Reading v1.0.0</Text>
        <Text style={styles.footerSubtext}>Powered by Gemini 3 Pro AI</Text>
        <Text style={styles.footerSubtext}>
          Made with ❤️ using React Native & Expo
        </Text>
        <View style={styles.developerCredit}>
          <Text style={styles.developerText}>Developed by</Text>
          <Text style={styles.developerName}>Dhaval Trivedi</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#9333ea",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#94a3b8",
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    height: 50,
    backgroundColor: "#334155",
  },
  section: {
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginHorizontal: 24,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#1e293b",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: "#94a3b8",
  },
  modelInfo: {
    alignItems: "center",
  },
  modelLabel: {
    fontSize: 13,
    color: "#94a3b8",
    marginBottom: 8,
  },
  modelValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#9333ea",
    marginBottom: 8,
  },
  modelDescription: {
    fontSize: 13,
    color: "#cbd5e1",
    textAlign: "center",
    lineHeight: 18,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#1e293b",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  actionInfo: {
    flex: 1,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
    color: "#94a3b8",
  },
  actionArrow: {
    fontSize: 24,
    color: "#64748b",
  },
  footer: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: "#475569",
    marginBottom: 2,
  },
  developerCredit: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#334155",
    alignItems: "center",
  },
  developerText: {
    fontSize: 11,
    color: "#64748b",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  developerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#9333ea",
  },
});
