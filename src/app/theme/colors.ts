/**
 * App Theme - Consistent colors and styles across all screens
 * Purple & Dark Slate theme for AI Palm Reading app
 */

export const colors = {
  // Background colors
  background: "#0f172a",     // Slate 950 - Main app background
  surface: "#1e293b",        // Slate 800 - Cards, elevated surfaces
  surfaceElevated: "#1e293b", // Same as surface

  // Purple theme
  accent: "#9333ea",         // Purple 600 - Primary actions, CTAs
  accentLight: "#a78bfa",    // Purple 400 - Light accents, section titles
  primary: "#9333ea",        // Alias for accent
  primaryLight: "#a78bfa",   // Alias for accentLight

  // Text colors
  white: "#ffffff",          // White - Main text
  textPrimary: "#ffffff",    // White - Main text
  textSecondary: "#cbd5e1",  // Slate 300 - Secondary text
  muted: "#94a3b8",          // Slate 400 - Muted/hint text
  mutedForeground: "#cbd5e1", // Slate 300 - Muted foreground
  textDim: "#64748b",        // Slate 500 - Dimmed text

  // Border colors
  border: "#334155",         // Slate 700 - Borders, dividers
  borderLight: "#475569",    // Slate 600 - Lighter borders

  // Status colors
  success: "#10b981",        // Green 500
  error: "#ef4444",          // Red 500
  warning: "#f59e0b",        // Amber 500
  info: "#3b82f6",           // Blue 500
} as const;

export default colors;
