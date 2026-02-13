import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../types/navigation";
import type { HandSide } from "../../types/reading";
import { submitAnalysis } from "../services/api";
import { useAppTheme } from "../theme/useAppTheme";

type Props = NativeStackScreenProps<HomeStackParamList, "Capture">;

export function CaptureScreen({ navigation }: Props) {
  const { colors, isDark } = useAppTheme();
  
  const [permission, requestPermission] = useCameraPermissions();
  const [capturing, setCapturing] = useState(false);
  const [showHandSelector, setShowHandSelector] = useState(false);
  const [capturedUri, setCapturedUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    try {
      console.log("Starting capture...");
      setCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
      });

      console.log("Capture result:", photo ? "Success" : "No photo");

      if (photo?.base64) {
        // Use base64 data URI for better web compatibility
        // Check if it already has a data prefix (it might be png or other format)
        const dataUri = photo.base64.startsWith("data:") 
          ? photo.base64 
          : "data:image/jpeg;base64," + photo.base64;
          
        setCapturedUri(dataUri);
        setShowHandSelector(true);
      } else if (photo?.uri) {
        setCapturedUri(photo.uri);
        setShowHandSelector(true);
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
      Alert.alert("Error", "Failed to capture photo. Please try again.");
    } finally {
      setCapturing(false);
    }
  };

  const handleAnalyze = async (handSide: HandSide, isDominant: boolean) => {
    if (!capturedUri) return;

    setShowHandSelector(false);

    try {
      navigation.navigate("AnalysisLoading", {});

      const result = await submitAnalysis({
        imageUri: capturedUri,
        handSide,
        isDominant,
      });

      // Navigate to reading screen
      navigation.replace("AnalysisLoading", {
        readingId: result.readingId,
        jobId: result.jobId,
      });
    } catch (error) {
      console.error("Error analyzing palm:", error);
      Alert.alert(
        "Analysis Failed",
        "Failed to analyze palm. Please make sure you have set up your Gemini API key."
      );
      navigation.goBack();
    }
  };

  if (!permission) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={[styles.loadingText, { color: colors.textPrimary }]}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Ionicons name="camera-outline" size={64} color={colors.muted} style={{marginBottom: 24}} />
        <Text style={[styles.permissionText, { color: colors.textPrimary }]}>
          Camera permission is required to capture your palm
        </Text>
        <TouchableOpacity style={[styles.permissionButton, { backgroundColor: colors.accent }]} onPress={requestPermission}>
          <Text style={[styles.buttonText, { color: isDark ? colors.background : "#1F2937" }]}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.permissionButton, styles.backButton, { backgroundColor: colors.surfaceElevated }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, { color: isDark ? colors.background : "#1F2937" }]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
      />
      
      {/* Overlay Guide - Positioned absolutely over camera */}
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>Position Your Palm</Text>
          <Text style={styles.subtitle}>
            Place your palm within the guide and keep it steady
          </Text>
        </View>

        {/* Palm Guide Outline */}
        <View style={styles.guideContainer}>
          <View style={[styles.palmGuide, { borderColor: colors.accent }]}>
            <View style={[styles.guideCorner, { borderColor: colors.accent }]} />
            <View style={[styles.guideCorner, styles.topRight, { borderColor: colors.accent }]} />
            <View style={[styles.guideCorner, styles.bottomLeft, { borderColor: colors.accent }]} />
            <View style={[styles.guideCorner, styles.bottomRight, { borderColor: colors.accent }]} />
          </View>
        </View>

        {/* Capture Button */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={28} color={colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.captureButton, { borderColor: colors.accent }]}
            onPress={handleCapture}
            disabled={capturing}
          >
            {capturing ? (
              <ActivityIndicator size="large" color={colors.white} />
            ) : (
              <View style={[styles.captureButtonInner, { backgroundColor: colors.white }]} />
            )}
          </TouchableOpacity>

          <View style={styles.placeholder} />
        </View>
      </View>

      {/* Hand Selection Modal */}
      <Modal
        visible={showHandSelector}
        transparent
        animationType="slide"
        onRequestClose={() => setShowHandSelector(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Select Captured Hand</Text>
            <Text style={[styles.modalSubtitle, { color: colors.muted }]}>
              Confirm details for accurate analysis
            </Text>

            <View style={[styles.handOptionsContainer, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
              {/* Left Hand Options */}
              <View style={styles.handColumn}>
                <Text style={[styles.columnTitle, { color: colors.muted }]}>Left Hand</Text>
                <Pressable
                  style={[styles.handOption, { backgroundColor: colors.surface, borderColor: colors.border }]}
                  onPress={() => handleAnalyze("left", true)}
                >
                  <Ionicons name="hand-left" size={24} color={colors.accent} />
                  <Text style={[styles.handLabel, { color: colors.textPrimary }]}>Dominant</Text>
                </Pressable>
                <Pressable
                  style={[styles.handOption, { backgroundColor: colors.surface, borderColor: colors.border }]}
                  onPress={() => handleAnalyze("left", false)}
                >
                  <Ionicons name="hand-left-outline" size={24} color={colors.textSecondary} />
                  <Text style={[styles.handLabel, {color: colors.textSecondary}]}>Non-dom</Text>
                </Pressable>
              </View>

              {/* Divider */}
              <View style={[styles.verticalDivider, { backgroundColor: colors.border }]} />

              {/* Right Hand Options */}
              <View style={styles.handColumn}>
                <Text style={[styles.columnTitle, { color: colors.muted }]}>Right Hand</Text>
                <Pressable
                  style={[styles.handOption, { backgroundColor: colors.surface, borderColor: colors.border }]}
                  onPress={() => handleAnalyze("right", true)}
                >
                  <Ionicons name="hand-right" size={24} color={colors.accent} />
                  <Text style={[styles.handLabel, { color: colors.textPrimary }]}>Dominant</Text>
                </Pressable>
                <Pressable
                  style={[styles.handOption, { backgroundColor: colors.surface, borderColor: colors.border }]}
                  onPress={() => handleAnalyze("right", false)}
                >
                  <Ionicons name="hand-right-outline" size={24} color={colors.textSecondary} />
                  <Text style={[styles.handLabel, {color: colors.textSecondary}]}>Non-dom</Text>
                </Pressable>
              </View>
            </View>

            <Pressable
              style={[styles.cancelButton, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}
              onPress={() => {
                setShowHandSelector(false);
                setCapturedUri(null);
              }}
            >
              <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 10,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF", // White on camera overlay
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#E5E7EB", // Light gray on camera overlay
    textAlign: "center",
  },
  guideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  palmGuide: {
    width: 280,
    height: 360,
    position: "relative",
    borderRadius: 20,
  },
  guideCorner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderWidth: 4,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    top: 0,
    left: 0,
  },
  topRight: {
    borderTopWidth: 4,
    borderLeftWidth: 0,
    borderRightWidth: 4,
    borderBottomWidth: 0,
    top: 0,
    left: undefined,
    right: 0,
  },
  bottomLeft: {
    borderTopWidth: 0,
    borderLeftWidth: 4,
    borderRightWidth: 0,
    borderBottomWidth: 4,
    top: undefined,
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    top: undefined,
    bottom: 0,
    left: undefined,
    right: 0,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  backBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  placeholder: {
    width: 50,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  permissionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  permissionButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  backButton: {
    // just a helper style for layout overrides
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 24,
    textAlign: "center",
  },
  handOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  handColumn: {
    flex: 1,
    alignItems: "center",
  },
  columnTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  verticalDivider: {
    width: 1,
    marginHorizontal: 8,
  },
  handOption: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  handLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  cancelButton: {
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
