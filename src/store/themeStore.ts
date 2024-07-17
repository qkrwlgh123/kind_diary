import { create } from "zustand";
import theme from "../styles/layout/themes";
import { getInitialTheme } from "../utils/themeUtils";

/** themeMode 전역 상태 및 상태 갱신 함수 */
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
