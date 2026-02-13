export default {
  expo: {
    name: "AI Palm Reading",
    slug: "ai-palm-reading",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "dark",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#0f172a",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.aipalmreading.app",
      buildNumber: "1", // Will be auto-incremented by EAS
    },
    android: {
      package: "com.aipalmreading.app",
      versionCode: 1, // Will be auto-incremented by EAS
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#1e293b",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "963fbfea-1217-43be-8ecd-1c32f50edb83",
      },
    },
  },
};
