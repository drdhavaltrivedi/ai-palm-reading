import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "../components/Button";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ProfileStackParamList } from "../../types/navigation";
import { useAppTheme } from "../theme/useAppTheme";

type Props = NativeStackScreenProps<ProfileStackParamList, "Paywall">;

export function PaywallScreen({ navigation }: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }]}
      accessibilityLabel="Premium options"
    >
      <View style={[styles.content, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.textPrimary }]} accessibilityRole="header">
          Unlock Cosmic Wisdom
        </Text>
        <Text style={[styles.description, { color: colors.muted }]}>
          Deep analysis of mounts and shapes, compatibility readings, and unlimited monthly updates.
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Subscribe for $9.99/mo"
            onPress={() => {}} // Placeholder
            variant="primary"
            accessibilityLabel="Subscribe to premium"
            style={{marginBottom: 16}}
          />
          <Button
            title="Maybe Later"
            variant="secondary"
            onPress={() => navigation.goBack()}
            accessibilityLabel="Close premium"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  content: {
    padding: 32,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
  },
});
