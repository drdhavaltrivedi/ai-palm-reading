import { useAppTheme } from "./useAppTheme";

// DEPRECATED: This export is for backward compatibility.
// Components should migrate to `useAppTheme()` hook for dynamic theming.
// For now, this will return the LIGHT theme as default to avoid breaking imports 
// until all components are refactored.
import { lightColors } from "./palettes";

export const colors = lightColors;
export default colors;
