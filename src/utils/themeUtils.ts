import theme from "../styles/layout/themes";

/** 로컬스토리지에서 저장된 테마 값을 불러오거나, 없다면 시스템 설정에 따라 초기 테마 값 설정 */
export const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("themeMode");
  if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
    return savedTheme as keyof typeof theme;
  }

  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return prefersDarkMode ? "dark" : "light";
};
