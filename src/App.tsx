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
import useAuthStore from "./store/authStore";
import UtilsBox from "./components/utilsBox/utilsBox";
import useThemeStore from "./store/themeStore";

const App = () => {
  /** 로그인 전역 상태 */
  const { isLoggedIn } = useAuthStore();

  /** theme 전역 상태 */
  const { themeMode, changeTheme } = useThemeStore();

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

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme[themeMode]}>
        <GlobalStyle />
        <CalendarStyle />
        <Layout>
          <UtilsBox themeMode={themeMode} handleFunc={changeTheme} />

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
