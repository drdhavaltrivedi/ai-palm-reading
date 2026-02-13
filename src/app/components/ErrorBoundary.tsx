import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (Platform.OS === "web") {
      console.error("ErrorBoundary caught:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>{this.state.error.message}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#0c0a09",
    ...(Platform.OS === "web" ? { minHeight: "100vh" as unknown as number } : {}),
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ef4444",
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: "#a8a29e",
    textAlign: "center",
  },
});
