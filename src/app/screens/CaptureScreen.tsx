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
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../types/navigation";
import type { HandSide } from "../../types/reading";
import { submitAnalysis } from "../services/api";

type Props = NativeStackScreenProps<HomeStackParamList, "Capture">;

export function CaptureScreen({ navigation }: Props) {
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
      setCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      if (photo?.uri) {
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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#9333ea" />
        <Text style={styles.loadingText}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Camera permission is required to capture your palm
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.permissionButton, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
          <View style={styles.palmGuide}>
            <View style={styles.guideCorner} />
            <View style={[styles.guideCorner, styles.topRight]} />
            <View style={[styles.guideCorner, styles.bottomLeft]} />
            <View style={[styles.guideCorner, styles.bottomRight]} />
          </View>
        </View>

        {/* Capture Button */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backBtnText}>✕</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleCapture}
            disabled={capturing}
          >
            {capturing ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <View style={styles.captureButtonInner} />
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
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Which hand did you capture?</Text>
            <Text style={styles.modalSubtitle}>
              Select the hand and whether it's your dominant hand
            </Text>

            <View style={styles.handOptions}>
              <Pressable
                style={styles.handOption}
                onPress={() => handleAnalyze("left", true)}
              >
                <Text style={styles.handEmoji}>🖐️</Text>
                <Text style={styles.handLabel}>Left Hand</Text>
                <Text style={styles.handSubLabel}>(Dominant)</Text>
              </Pressable>

              <Pressable
                style={styles.handOption}
                onPress={() => handleAnalyze("left", false)}
              >
                <Text style={styles.handEmoji}>🖐️</Text>
                <Text style={styles.handLabel}>Left Hand</Text>
                <Text style={styles.handSubLabel}>(Non-dominant)</Text>
              </Pressable>
            </View>

            <View style={styles.handOptions}>
              <Pressable
                style={styles.handOption}
                onPress={() => handleAnalyze("right", true)}
              >
                <Text style={styles.handEmoji}>🤚</Text>
                <Text style={styles.handLabel}>Right Hand</Text>
                <Text style={styles.handSubLabel}>(Dominant)</Text>
              </Pressable>

              <Pressable
                style={styles.handOption}
                onPress={() => handleAnalyze("right", false)}
              >
                <Text style={styles.handEmoji}>🤚</Text>
                <Text style={styles.handLabel}>Right Hand</Text>
                <Text style={styles.handSubLabel}>(Non-dominant)</Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.cancelButton}
              onPress={() => {
                setShowHandSelector(false);
                setCapturedUri(null);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
    backgroundColor: "#000",
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
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#d1d5db",
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
    borderColor: "#9333ea",
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
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  backBtnText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#9333ea",
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#9333ea",
  },
  placeholder: {
    width: 50,
  },
  loadingText: {
    color: "#fff",
    marginTop: 16,
    fontSize: 16,
  },
  permissionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  permissionButton: {
    backgroundColor: "#9333ea",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  backButton: {
    backgroundColor: "#4b5563",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#1f2937",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 24,
    textAlign: "center",
  },
  handOptions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  handOption: {
    flex: 1,
    backgroundColor: "#374151",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4b5563",
  },
  handEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  handLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  handSubLabel: {
    fontSize: 12,
    color: "#9ca3af",
  },
  cancelButton: {
    backgroundColor: "#4b5563",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
