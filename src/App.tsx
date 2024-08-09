import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Layout from "./styles/layout/layout";
import { ThemeProvider } from "styled-components";
import theme from "./styles/layout/themes";
import GlobalStyle from "./styles/globalStyles";
import CalendarStyle from "./styles/calendarStyles";
import ProtectedRoute from "./components/auth/protectedRoute";
import useAuthStore from "./store/authStore";
import UtilsBox from "./components/utilsBox/utilsBox";
import useThemeStore from "./store/themeStore";
import { useEffect, useRef, useState } from "react";

const App = () => {
  /** 로그인 전역 상태 */
  const { isLoggedIn } = useAuthStore();

  /** theme 전역 상태 */
  const { themeMode, changeTheme } = useThemeStore();

  /**
   * 스크롤 위치에 따른 계정 정보 visible 변경 영역
   * ====================
   */

  /** UtilsBox의 bottom rect value, 및 본문 컴포넌트의 top rect value */
  const [bottomRectValueOfUtilsBox, setBottomOffsetOfUtilsBox] = useState(0);
  const [topRectValueOfContentsComponent, setTopRectValueOfContentsComponent] =
    useState(0);

  /** UtilsBox 및 본문 컴포넌트의 Rect Value를 얻기 위한 useRef */
  const utilsBoxRef = useRef<HTMLDivElement>(null);
  const contentsComponentRef = useRef<HTMLDivElement>(null);

  /** UtilsBox, Contents Component Rect value 갱신 함수 */
  const handleUpdateRectValueOfUtilsBox = (rectValue: number) => {
    setBottomOffsetOfUtilsBox(rectValue);
  };

  const handleUpdateRectValueOfContentsComponent = (rectValue: number) => {
    setTopRectValueOfContentsComponent(rectValue);
  };

  /** UtilsBox Componentd의 visible 여부 */
  const [isUtilsBoxVisible, setIsUtilsBoxVisible] = useState(true);

  /** 스크롤 위치에 따라 UtilsBox의 visible 상태 변경하는 Effect */
  useEffect(() => {
    if (
      topRectValueOfContentsComponent > 0 &&
      topRectValueOfContentsComponent <= bottomRectValueOfUtilsBox
    ) {
      setIsUtilsBoxVisible(false);
    } else if (topRectValueOfContentsComponent > bottomRectValueOfUtilsBox) {
      setIsUtilsBoxVisible(true);
    }
  }, [topRectValueOfContentsComponent]);

  /**
   * ====================
   */

  /** 라우트 목록 */
  const routeList = [
    {
      path: "/",
      element: (
        <Home
          ref={contentsComponentRef}
          handleUpdateRectValueOfContentsComponent={
            handleUpdateRectValueOfContentsComponent
          }
        />
      ),
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
          <UtilsBox
            themeMode={themeMode}
            handleFunc={changeTheme}
            isUtilsBoxVisible={isUtilsBoxVisible}
            handleUpdateRectValueOfUtilsBox={handleUpdateRectValueOfUtilsBox}
            ref={utilsBoxRef}
          />

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
