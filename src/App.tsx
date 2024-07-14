import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Layout from "./styles/layout/layout";
import { ThemeProvider } from "styled-components";
import theme from "./styles/layout/themes";
import { useEffect, useState } from "react";
import GlobalStyle from "./styles/globalStyles";
import CalendarStyle from "./styles/calendarStyles";
import ProtectedRoute from "./components/auth/protectedRoute";
import useStore from "./store/authStore";
import UtilsBox from "./components/utilsBox/utilsBox";

const App = () => {
  const { isLoggedIn } = useStore();

  /** 라우트 목록 */
  const routeList = [
    {
      path: "/",
      element: <Home />,
      isPrivate: true,
    },
    {
      path: "/login",
      element: <Login />,
      isPrivate: false,
    },
  ];

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
          <UtilsBox themeMode={themeMode} handleFunc={handleToggleTheme} />

          <Routes>
            {routeList.map((route) => {
              const isAuthenticated = isLoggedIn;
              if (route.isPrivate) {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<ProtectedRoute component={route.element} />}
                  />
                );
              } else {
                if (route.path === "/login" && isAuthenticated) {
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<Navigate to="/" replace />}
                    />
                  );
                }
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                );
              }
            })}
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
