import { useColorScheme } from "react-native";
import { useThemeStore } from "../store/themeStore";
import { darkColors, lightColors, type Theme } from "./palettes";

export function useAppTheme() {
    const { mode, setMode } = useThemeStore();
    const systemScheme = useColorScheme() ?? "light";

    // Computed theme logic
    const isDark = mode === "dark" || (mode === "system" && systemScheme === "dark");
    const activeTheme = isDark ? darkColors : lightColors;

    return {
        mode,
        setMode,
        theme: activeTheme,
        colors: activeTheme,
        isDark,
    };
}
