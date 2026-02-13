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
        background: "#0c0a09",
        surface: "#1c1917",
        muted: "#a8a29e",
        accent: "#d16d08",
        "accent-deep": "#b85d06",
        border: "#292524",
      },
      fontFamily: {
        serif: ["serif"],
        sans: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
