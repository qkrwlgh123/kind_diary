import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Layout from "./styles/layout/layout";
import { ThemeProvider } from "styled-components";
import theme from "./styles/layout/themes";
import { useEffect, useState } from "react";
import GlobalStyle from "./styles/globalStyles";
import ThemeToggle from "./components/themeToggle/themeToggle";
import CalendarStyle from "./styles/calendarStyles";

const App = () => {
  /** 로컬스토리지에서 저장된 테마 값을 불러오거나, 없다면 시스템 설정에 따라 초기 테마 값 설정 */
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      return savedTheme as keyof typeof theme;
    }

    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDarkMode ? "dark" : "light";
  };

  const [themeMode, setThemeMode] = useState<keyof typeof theme>(
    getInitialTheme()
  );

  /** 라이트 / 다크모드 전환 함수 */
  const handleToggleTheme = () => {
    setThemeMode((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newTheme); // 로컬스토리지에 저장
      return newTheme;
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme) {
      setThemeMode(savedTheme as keyof typeof theme);
    }
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme[themeMode]}>
        <GlobalStyle />
        <CalendarStyle />
        <Layout>
          <ThemeToggle themeMode={themeMode} handleFunc={handleToggleTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
