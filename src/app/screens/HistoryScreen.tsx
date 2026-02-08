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
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HistoryStackParamList } from "../../types/navigation";
import { getReadingsList, deleteReading } from "../services/api";
import type { Reading } from "../../types/reading";

type Props = NativeStackScreenProps<HistoryStackParamList, "History">;

export function HistoryScreen({ navigation }: Props) {
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
    <View style={styles.readingCard}>
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
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <View style={styles.handBadge}>
            <Text style={styles.handBadgeText}>
              {item.handSide === "left" ? "🖐️" : "🤚"}
            </Text>
          </View>
        </View>

        {/* Reading Info */}
        <View style={styles.readingInfo}>
          <View style={styles.readingHeader}>
            <Text style={styles.handText}>
              {item.handSide.charAt(0).toUpperCase() + item.handSide.slice(1)} Hand
            </Text>
            <View
              style={[
                styles.dominantBadge,
                item.isDominant ? styles.dominantYes : styles.dominantNo,
              ]}
            >
              <Text style={styles.dominantText}>
                {item.isDominant ? "Dominant" : "Non-Dominant"}
              </Text>
            </View>
          </View>

          <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
          <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>

          {/* Sections Preview */}
          <Text style={styles.sectionsPreview}>
            {item.sections.length} sections analyzed
          </Text>
        </View>

        {/* Arrow */}
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>›</Text>
        </View>
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item)}
        accessibilityRole="button"
        accessibilityLabel="Delete reading"
      >
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔮</Text>
      <Text style={styles.emptyTitle}>No Readings Yet</Text>
      <Text style={styles.emptyText}>
        Capture your palm from the Home tab to get your first AI reading!
      </Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() => navigation.navigate("ReadingDetail" as any, {} as any)}
      >
        <Text style={styles.emptyButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Reading History</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading readings...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} accessibilityLabel="Reading history">
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          Reading History
        </Text>
        <Text style={styles.subtitle}>
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
    backgroundColor: "#0f172a",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  readingCard: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
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
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#334155",
  },
  handBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#9333ea",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1e293b",
  },
  handBadgeText: {
    fontSize: 14,
  },
  readingInfo: {
    flex: 1,
  },
  readingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  handText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  dominantBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  dominantYes: {
    backgroundColor: "rgba(147, 51, 234, 0.2)",
  },
  dominantNo: {
    backgroundColor: "rgba(100, 116, 139, 0.2)",
  },
  dominantText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#a78bfa",
  },
  dateText: {
    fontSize: 14,
    color: "#cbd5e1",
    marginBottom: 2,
  },
  timeText: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8,
  },
  sectionsPreview: {
    fontSize: 13,
    color: "#9333ea",
    fontWeight: "600",
  },
  arrowContainer: {
    marginLeft: 8,
  },
  arrow: {
    fontSize: 28,
    color: "#64748b",
  },
  deleteButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#334155",
    alignItems: "center",
  },
  deleteIcon: {
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    marginTop: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: "#9333ea",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#94a3b8",
  },
});
