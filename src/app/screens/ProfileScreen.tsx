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
  Modal,
  Pressable
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ProfileStackParamList } from "../../types/navigation";
import { getReadingsList } from "../services/api";
import { useAppTheme } from "../theme/useAppTheme";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<ProfileStackParamList, "Profile">;

export function ProfileScreen({ navigation }: Props) {
  const { colors, mode, setMode, isDark } = useAppTheme();
  
  const [totalReadings, setTotalReadings] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

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
      "About Cosmic Palmistry",
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
    Linking.openURL("mailto:support@example.com?subject=Cosmic Palmistry Support");
  };

  const themeLabel = {
    light: "Mystic Light",
    dark: "Cosmic Midnight",
    system: "System Default",
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
    <ScrollView
      contentContainerStyle={styles.content}
      accessibilityLabel="Profile and settings"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]} accessibilityRole="header">
          Your Soul Profile
        </Text>
      </View>

      {/* Stats Card */}
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="stats-chart" size={20} color={colors.accent} style={{ marginRight: 8 }} />
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Journey Statistics</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.accent }]}>{totalReadings}</Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>
              Palm {totalReadings === 1 ? "Reading" : "Readings"}
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Ionicons name="sparkles" size={32} color={colors.primaryLight} style={{marginBottom: 4}} />
            <Text style={[styles.statLabel, { color: colors.muted }]}>AI Powered</Text>
          </View>
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textDim }]}>Mystic Settings</Text>

        {/* Notifications */}
        <View style={[styles.settingItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.settingIconBox, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
             <Ionicons name="notifications-outline" size={22} color={colors.primaryLight} />
          </View>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>Notifications</Text>
            <Text style={[styles.settingDescription, { color: colors.muted }]}>
              Cosmic updates and reminders
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>

        {/* Theme Selection */}
        <TouchableOpacity 
          style={[styles.settingItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => setShowThemeModal(true)}
        >
          <View style={[styles.settingIconBox, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
             <Ionicons name={isDark ? "moon-outline" : "sunny-outline"} size={22} color={colors.accent} />
          </View>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>App Theme</Text>
            <Text style={[styles.settingDescription, { color: colors.muted }]}>
              {themeLabel[mode]}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
        </TouchableOpacity>
      </View>

      {/* AI Model Info */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textDim }]}>Oracle Engine</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.modelInfo}>
            <Ionicons name="cube-outline" size={32} color={colors.accent} style={{ marginBottom: 12 }} />
            <Text style={[styles.modelLabel, { color: colors.muted }]}>Connecting to</Text>
            <Text style={[styles.modelValue, { color: colors.accent }]}>Gemini 3 Pro Preview</Text>
            <Text style={[styles.modelDescription, { color: colors.textSecondary }]}>
              Advanced neural networks analyzing your destiny lines.
            </Text>
          </View>
        </View>
      </View>

      {/* Actions Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textDim }]}>Data & Privacy</Text>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={handleClearData}
          accessibilityRole="button"
        >
          <View style={[styles.actionIconBox, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: colors.border }]}>
            <Ionicons name="trash-outline" size={20} color={colors.error} />
          </View>
          <View style={styles.actionInfo}>
            <Text style={[styles.actionLabel, { color: colors.error }]}>Clear Destiny Data</Text>
            <Text style={[styles.actionDescription, { color: colors.muted }]}>
              Permanently delete all readings
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={handlePrivacy}
          accessibilityRole="button"
        >
          <View style={[styles.actionIconBox, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
            <Ionicons name="shield-checkmark-outline" size={20} color={colors.primaryLight} />
          </View>
          <View style={styles.actionInfo}>
            <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>Privacy Policy</Text>
            <Text style={[styles.actionDescription, { color: colors.muted }]}>Your data stays on device</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
        </TouchableOpacity>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textDim }]}>Support & Info</Text>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={handleAbout}
          accessibilityRole="button"
        >
          <View style={[styles.actionIconBox, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
            <Ionicons name="information-circle-outline" size={20} color={colors.primaryLight} />
          </View>
          <View style={styles.actionInfo}>
            <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>About</Text>
            <Text style={[styles.actionDescription, { color: colors.muted }]}>App version & credits</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={handleSupport}
          accessibilityRole="button"
        >
          <View style={[styles.actionIconBox, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
            <Ionicons name="mail-outline" size={20} color={colors.primaryLight} />
          </View>
          <View style={styles.actionInfo}>
            <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>Contact Oracle</Text>
            <Text style={[styles.actionDescription, { color: colors.muted }]}>Get help and feedback</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textDim }]}>Cosmic Palmistry v1.0.0</Text>
        <Text style={[styles.footerSubtext, { color: colors.muted }]}>Powered by Gemini 3 Pro AI</Text>
        <View style={[styles.developerCredit, { borderColor: colors.border }]}>
          <Text style={[styles.developerText, { color: colors.textDim }]}>Crafted by</Text>
          <Text style={[styles.developerName, { color: colors.accent }]}>Dhaval Trivedi</Text>
        </View>
      </View>
    </ScrollView>

    {/* Theme Selection Modal */}
    <Modal
      visible={showThemeModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowThemeModal(false)}
    >
      <Pressable style={styles.modalOverlay} onPress={() => setShowThemeModal(false)}>
        <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Choose Theme</Text>
          
          <TouchableOpacity 
            style={[styles.themeOption, mode === "dark" && { backgroundColor: colors.surfaceElevated }]}
            onPress={() => {
              setMode("dark");
              setShowThemeModal(false);
            }}
          >
            <Ionicons name="moon" size={24} color={mode === "dark" ? colors.accent : colors.muted} />
            <Text style={[styles.themeOptionText, { color: mode === "dark" ? colors.accent : colors.textPrimary }]}>Cosmic Midnight (Dark)</Text>
            {mode === "dark" && <Ionicons name="checkmark" size={24} color={colors.accent} />}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.themeOption, mode === "light" && { backgroundColor: colors.surfaceElevated }]}
            onPress={() => {
              setMode("light");
              setShowThemeModal(false);
            }}
          >
            <Ionicons name="sunny" size={24} color={mode === "light" ? colors.accent : colors.muted} />
            <Text style={[styles.themeOptionText, { color: mode === "light" ? colors.accent : colors.textPrimary }]}>Mystic Light</Text>
            {mode === "light" && <Ionicons name="checkmark" size={24} color={colors.accent} />}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.themeOption, mode === "system" && { backgroundColor: colors.surfaceElevated }]}
            onPress={() => {
              setMode("system");
              setShowThemeModal(false);
            }}
          >
            <Ionicons name="settings-outline" size={24} color={mode === "system" ? colors.accent : colors.muted} />
            <Text style={[styles.themeOptionText, { color: mode === "system" ? colors.accent : colors.textPrimary }]}>System Default</Text>
            {mode === "system" && <Ionicons name="checkmark" size={24} color={colors.accent} />}
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
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
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    height: 50,
  },
  section: {
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
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
    borderBottomWidth: 1,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
  },
  modelInfo: {
    alignItems: "center",
  },
  modelLabel: {
    fontSize: 13,
    marginBottom: 8,
  },
  modelValue: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  modelDescription: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  actionInfo: {
    flex: 1,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
  },
  footer: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    marginBottom: 2,
  },
  developerCredit: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    alignItems: "center",
  },
  developerText: {
    fontSize: 11,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  developerName: {
    fontSize: 16,
    fontWeight: "700",
  },
  settingIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1,
  },
  actionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  themeOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  themeOptionText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
    flex: 1,
  },
});
