import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HistoryStackParamList } from "../../types/navigation";
import { useAppTheme } from "../theme/useAppTheme";

type Props = NativeStackScreenProps<HistoryStackParamList, "ReadingDetail">;

export function ReadingDetailScreen({ route, navigation }: Props) {
  const { colors, isDark } = useAppTheme();
  const { reading } = route.params;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Back Button */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Palm Reading</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        accessibilityLabel={`Reading for ${reading.handSide} hand`}
        showsVerticalScrollIndicator={false}
      >
        {/* Palm Image */}
        <View style={[styles.imageContainer, { borderColor: colors.border }]}>
          <Image
            source={{ uri: reading.imageUri }}
            style={[styles.palmImage, { backgroundColor: colors.surface }]}
            resizeMode="cover"
          />
        </View>

        {/* Reading Info Card */}
        <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons 
                name={reading.handSide === "left" ? "hand-left-outline" : "hand-right-outline"} 
                size={20} 
                color={colors.accent} 
                style={{marginBottom: 4}} 
              />
              <Text style={[styles.infoLabel, { color: colors.muted }]}>Hand</Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
                {reading.handSide.charAt(0).toUpperCase() + reading.handSide.slice(1)}
              </Text>
            </View>
            <View style={[styles.infoDivider, { backgroundColor: colors.border }]} />
            <View style={styles.infoItem}>
              <Ionicons 
                name={reading.isDominant ? "star" : "star-outline"} 
                size={20} 
                color={colors.accent} 
                style={{marginBottom: 4}} 
              />
              <Text style={[styles.infoLabel, { color: colors.muted }]}>Type</Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
                {reading.isDominant ? "Dominant" : "Non-Dominant"}
              </Text>
            </View>
          </View>
          <View style={[styles.dateRow, { borderTopColor: colors.border }]}>
            <Ionicons name="calendar-clear-outline" size={14} color={colors.textDim} style={{marginRight: 6}} />
            <Text style={[styles.dateText, { color: colors.textDim }]}>
              {formatDate(reading.createdAt)} • {formatTime(reading.createdAt)}
            </Text>
          </View>
        </View>

        {/* Reading Sections */}
        <View style={styles.sectionTitleContainer}>
          <Ionicons name="book-outline" size={20} color={colors.primaryLight} style={{ marginRight: 8 }} />
          <Text style={[styles.sectionsTitle, { color: colors.textPrimary }]}>Your Palm Insights</Text>
        </View>
        
        {reading.sections.map((section, index) => (
          <View key={section.id} style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionNumberBox, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
                <Text style={[styles.sectionNumber, { color: colors.accent }]}>
                  {String(index + 1).padStart(2, "0")}
                </Text>
              </View>
              <Text style={[styles.sectionTitle, { color: colors.accentLight }]}>{section.title}</Text>
            </View>
            <Text style={[styles.sectionContent, { color: colors.textSecondary }]}>{section.content}</Text>
          </View>
        ))}

        {/* Footer Note */}
        <View style={styles.footer}>
          <Ionicons name="sparkles" size={24} color={colors.accent} style={{ marginBottom: 12 }} />
          <Text style={[styles.footerText, { color: colors.muted }]}>
            Cosmic insights powered by Gemini 3 Pro AI
          </Text>
          <Text style={[styles.footerSubtext, { color: colors.textDim }]}>
            Analyzed on {formatDate(reading.createdAt)}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  imageContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  palmImage: {
    width: "100%",
    height: 300,
  },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  infoDivider: {
    width: 1,
    marginHorizontal: 16,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
  },
  dateText: {
    fontSize: 13,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionsTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionNumberBox: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
  },
  sectionNumber: {
    fontSize: 14,
    fontWeight: "700",
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
  footer: {
    alignItems: "center",
    marginTop: 16,
    marginHorizontal: 16,
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    textAlign: "center",
  },
});
