export type Theme = typeof lightColors;

// Mystic Light Palette (Current)
export const lightColors = {
    // Background colors
    background: "#FFFFFF",       // Pure white
    surface: "#F8F7FF",          // Very subtle purple tint for cards
    surfaceElevated: "#F3E8FF",  // Light lavender for modals/highlighted areas

    // Accent - Orange #d16d08
    accent: "#d16d08",           // Primary orange action color
    accentHover: "#b85d06",      // Slightly darker for states
    accentLight: "#e07d12",      // Lighter orange for highlights
    accentMuted: "rgba(209, 109, 8, 0.2)", // Transparent orange for badges

    primary: "#d16d08",          // Matching accent
    primaryDark: "#b85d06",      // Darker orange
    primaryLight: "#e07d12",     // Lighter orange

    // Text colors - Dark for light theme
    white: "#FFFFFF",
    textPrimary: "#1F2937",      // Gray 800 - Main text
    textSecondary: "#4B5563",    // Gray 600 - Secondary text
    textDim: "#6B7280",          // Gray 500
    muted: "#9CA3AF",            // Gray 400

    // Borders
    border: "#E5E7EB",           // Gray 200
    borderHighlight: "#d16d08",  // Orange border

    // Tab bar
    tabBarBackground: "#FFFFFF",
    tabBarBorder: "#F3F4F6",
    tabActive: "#d16d08",        // Orange for active
    tabInactive: "#9CA3AF",      // Gray for inactive

    // Status
    success: "#10B981",          // Emerald 500
    error: "#EF4444",            // Red 500
    warning: "#d16d08",          // Orange (brand accent)
    info: "#3B82F6",             // Blue 500
};

// Cosmic Midnight Palette (Dark Mode)
export const darkColors: Theme = {
    // Background colors
    background: "#0c0a09",       // Warm black
    surface: "#1c1917",          // Stone 900
    surfaceElevated: "#292524",  // Stone 800

    // Accent - Orange #d16d08
    accent: "#d16d08",           // Primary orange
    accentHover: "#b85d06",      // Darker for states
    accentLight: "#e07d12",      // Lighter for highlights
    accentMuted: "rgba(209, 109, 8, 0.2)", // Transparent orange

    primary: "#d16d08",          // Matching accent
    primaryDark: "#b85d06",      // Darker orange
    primaryLight: "#e07d12",     // Lighter orange

    // Text colors - Light for dark theme
    white: "#fafafa",
    textPrimary: "#f3f4f6",      // Gray 100
    textSecondary: "#d1d5db",    // Gray 300
    textDim: "#9ca3af",          // Gray 400
    muted: "#6b7280",            // Gray 500

    // Borders
    border: "#44403c",           // Stone 700
    borderHighlight: "#d16d08",  // Orange border

    // Tab bar
    tabBarBackground: "#0c0a0a",
    tabBarBorder: "#292524",
    tabActive: "#d16d08",
    tabInactive: "#78716c",

    // Status
    success: "#22c55e",
    error: "#ef4444",
    warning: "#d16d08",
    info: "#3b82f6",
};
