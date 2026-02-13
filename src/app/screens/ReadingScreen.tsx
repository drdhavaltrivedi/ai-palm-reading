import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../types/navigation";
import { useAppTheme } from "../theme/useAppTheme";

type Props = NativeStackScreenProps<HomeStackParamList, "Reading">;

export function ReadingScreen({ route, navigation }: Props) {
  const { colors, isDark } = useAppTheme();
  const { reading, imageUri } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        accessibilityLabel="Your palm reading"
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: colors.textPrimary }]} accessibilityRole="header">
          Your Palm Reading
        </Text>

        {imageUri && (
          <View style={[styles.imageContainer, { borderColor: colors.border }]}>
            <Image 
              source={{ uri: imageUri }} 
              style={[styles.palmImage, { backgroundColor: colors.surface }]} 
              resizeMode="cover" 
            />
          </View>
        )}

        <View style={[styles.handInfo, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.infoRow}>
            <Ionicons name={reading.handSide === "left" ? "hand-left-outline" : "hand-right-outline"} size={16} color={colors.accent} style={{marginRight: 6}} />
            <Text style={[styles.handInfoText, { color: colors.textPrimary }]}>
              {reading.handSide === "left" ? "Left" : "Right"} Hand
            </Text>
          </View>
          <Text style={[styles.divider, { color: colors.textDim }]}>•</Text>
          <Text style={[styles.handInfoText, { color: colors.textPrimary }]}>
            {reading.isDominant ? "Dominant" : "Non-dominant"}
          </Text>
        </View>

        {reading.sections.map((s, index) => (
          <View key={s.id} style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
               <View style={[styles.sectionNumberBox, { backgroundColor: colors.surfaceElevated, borderColor: colors.accent }]}>
                  <Text style={[styles.sectionNumber, { color: colors.accent }]}>{index + 1}</Text>
               </View>
              <Text style={[styles.sectionTitle, { color: colors.accentLight }]}>{s.title}</Text>
            </View>
            <Text style={[styles.sectionContent, { color: colors.textSecondary }]}>{s.content}</Text>
          </View>
        ))}
        
        {/* Spacer for bottom button */}
        <View style={{height: 80}} />
      </ScrollView>

      {/* Chat Button - Fixed at bottom */}
      <View style={[styles.chatButtonContainer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.chatButton, { backgroundColor: colors.accent, shadowColor: colors.accent }]}
          onPress={() => navigation.navigate("Chat", { reading, imageUri })}
          accessibilityLabel="Ask questions about your reading"
        >
          <Ionicons name="chatbubbles" size={24} color={isDark ? colors.background : "#1F2937"} style={{ marginRight: 8 }} />
          <Text style={[styles.chatButtonText, { color: isDark ? colors.background : "#1F2937" }]}>Ask the Oracle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  imageContainer: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    height: 200,
  },
  palmImage: {
    width: "100%",
    height: "100%",
  },
  handInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  handInfoText: {
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    marginHorizontal: 12,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionNumberBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
  },
  sectionNumber: {
    fontSize: 12,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
  },
  sectionContent: {
    fontSize: 15,
    lineHeight: 24,
  },
  chatButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30, // Extra padding for safe area
    borderTopWidth: 1,
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  chatButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
