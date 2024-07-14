import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Layout from "./styles/layout/layout";
import { ThemeProvider } from "styled-components";
import theme from "./styles/layout/themes";
import { useEffect, useState } from "react";
import GlobalStyle from "./styles/globalStyles";
import ThemeToggle from "./components/themeToggle/themeToggle";
import CalendarStyle from "./styles/calendarStyles";
import { handleRequestValidateToken } from "./api/user/tokenValidate";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { isLoggedIn } = useAuth();

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

  /** 로컬스토리지에서 다크모드 데이터 찾아서 갱신 */
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
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<Navigate to="/login" replace />} />
              </>
            )}
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
