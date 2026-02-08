/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Dark-first palette; override in app/theme for design tokens
        background: "#0a0a0f",
        surface: "#12121a",
        muted: "#6b7280",
        accent: "#8b7355",
        border: "#27272a",
      },
      fontFamily: {
        serif: ["serif"],
        sans: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
