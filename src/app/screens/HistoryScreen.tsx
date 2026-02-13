import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HistoryStackParamList } from "../../types/navigation";
import { getReadingsList, deleteReading } from "../services/api";
import type { Reading } from "../../types/reading";
import { useAppTheme } from "../theme/useAppTheme";

type Props = NativeStackScreenProps<HistoryStackParamList, "History">;

export function HistoryScreen({ navigation }: Props) {
  const { colors, isDark } = useAppTheme();
  
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadReadings = async () => {
    try {
      const data = await getReadingsList();
      setReadings(data);
    } catch (error) {
      console.error("Error loading readings:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadReadings();
  }, []);

  useEffect(() => {
    // Reload when screen comes into focus
    const unsubscribe = navigation.addListener("focus", () => {
      loadReadings();
    });
    return unsubscribe;
  }, [navigation]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadReadings();
  };

  const handleDelete = (reading: Reading) => {
    Alert.alert(
      "Delete Reading",
      `Are you sure you want to delete this ${reading.handSide} hand reading from ${new Date(reading.createdAt).toLocaleDateString()}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReading(reading.id);
              await loadReadings();
            } catch (error) {
              console.error("Error deleting reading:", error);
              Alert.alert("Error", "Failed to delete reading");
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
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

  const renderReading = ({ item }: { item: Reading }) => (
    <View style={[styles.readingCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <TouchableOpacity
        style={styles.readingContent}
        onPress={() => navigation.navigate("ReadingDetail", { reading: item })}
        accessibilityRole="button"
        accessibilityLabel={`View ${item.handSide} hand reading from ${formatDate(item.createdAt)}`}
      >
        {/* Palm Image Thumbnail */}
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: item.imageUri }}
            style={[styles.thumbnail, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}
            resizeMode="cover"
          />
          <View style={[styles.handBadge, { backgroundColor: colors.surfaceElevated, borderColor: colors.accent }]}>
            <Ionicons 
              name={item.handSide === "left" ? "hand-left" : "hand-right"} 
              size={14} 
              color={colors.accent} 
            />
          </View>
        </View>

        {/* Reading Info */}
        <View style={styles.readingInfo}>
          <View style={styles.readingHeader}>
            <Text style={[styles.handText, { color: colors.textPrimary }]}>
              {item.handSide.charAt(0).toUpperCase() + item.handSide.slice(1)} Hand
            </Text>
            <View
              style={[
                styles.dominantBadge,
                item.isDominant 
                  ? [styles.dominantYes, { backgroundColor: colors.accentMuted, borderColor: "rgba(167, 139, 218, 0.3)" }] 
                  : [styles.dominantNo, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }],
              ]}
            >
              <Text style={[styles.dominantText, { color: colors.textSecondary }]}>
                {item.isDominant ? "Dominant" : "Non-Dominant"}
              </Text>
            </View>
          </View>

          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={12} color={colors.textDim} style={{marginRight: 4}} />
            <Text style={[styles.dateText, { color: colors.textSecondary }]}>{formatDate(item.createdAt)}</Text>
            <Text style={[styles.dateDivider, { color: colors.textDim }]}>•</Text>
            <Text style={[styles.timeText, { color: colors.textDim }]}>{formatTime(item.createdAt)}</Text>
          </View>

          {/* Sections Preview */}
          <View style={styles.sectionsContainer}>
            <Ionicons name="layers-outline" size={12} color={colors.primaryLight} style={{ marginRight: 4 }} />
            <Text style={[styles.sectionsPreview, { color: colors.primaryLight }]}>
              {item.sections.length} insights revealed
            </Text>
          </View>
        </View>

        {/* Arrow */}
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={24} color={colors.textDim} />
        </View>
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        style={[styles.deleteButton, { backgroundColor: colors.surfaceElevated, borderTopColor: colors.border }]}
        onPress={() => handleDelete(item)}
        accessibilityRole="button"
        accessibilityLabel="Delete reading"
      >
        <Ionicons name="trash-outline" size={18} color={colors.error} style={{ marginRight: 8 }} />
        <Text style={[styles.deleteText, { color: colors.error }]}>Delete Reading</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconContainer, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
        <Ionicons name="planet-outline" size={64} color={colors.textDim} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>No Readings Yet</Text>
      <Text style={[styles.emptyText, { color: colors.muted }]}>
        Capture your palm from the Home tab to begin your cosmic journey.
      </Text>
      <TouchableOpacity
        style={[styles.emptyButton, { backgroundColor: colors.accent, shadowColor: colors.accent }]}
        onPress={() => navigation.navigate("Home" as any)}
      >
        <Text style={[styles.emptyButtonText, { color: isDark ? colors.background : "#1F2937" }]}>Start New Reading</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Reading History</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.muted }]}>Loading readings...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]} accessibilityLabel="Reading history">
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.textPrimary }]} accessibilityRole="header">
          Reading History
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          {readings.length} {readings.length === 1 ? "reading" : "readings"}
        </Text>
      </View>

      {/* Readings List */}
      <FlatList
        data={readings}
        renderItem={renderReading}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  readingCard: {
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  readingContent: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  thumbnailContainer: {
    position: "relative",
    marginRight: 16,
    width: 64,
    height: 64,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
  },
  handBadge: {
    position: "absolute",
    bottom: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  readingInfo: {
    flex: 1,
  },
  readingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    flexWrap: "wrap",
    gap: 6,
  },
  handText: {
    fontSize: 16,
    fontWeight: "700",
  },
  dominantBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  dominantYes: {
    borderWidth: 1,
  },
  dominantNo: {
    borderWidth: 1,
  },
  dominantText: {
    fontSize: 10,
    fontWeight: "600",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  dateText: {
    fontSize: 12,
  },
  dateDivider: {
    fontSize: 12,
    marginHorizontal: 6,
  },
  timeText: {
    fontSize: 12,
  },
  sectionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionsPreview: {
    fontSize: 12,
    fontWeight: "500",
  },
  arrowContainer: {
    marginLeft: 8,
  },
  deleteButton: {
    padding: 12,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    fontSize: 13,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    marginTop: 60,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  emptyButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
  },
});
