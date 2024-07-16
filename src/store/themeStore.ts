import { create } from "zustand";
import theme from "../styles/layout/themes";
import { getInitialTheme } from "../utils/themeUtils";

interface ThemeStore {
  themeMode: keyof typeof theme;
  changeTheme: () => void;
}

const useThemeStore = create<ThemeStore>((set, get) => ({
  themeMode: getInitialTheme(),
  changeTheme: () => {
    const newTheme = get().themeMode === "light" ? "dark" : "light";
    localStorage.setItem("themeMode", newTheme);
    set({ themeMode: newTheme });
  },
}));

export default useThemeStore;
