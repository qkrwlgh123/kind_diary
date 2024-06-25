import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Layout from "./styles/layout/layout";
import { ThemeProvider } from "styled-components";
import theme from "./styles/layout/themes";
import { useState } from "react";
import GlobalStyle from "./styles/globalStyles";

const App = () => {
  const [themeMode, setThemeMode] = useState<keyof typeof theme>("light");

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme[themeMode]}>
        <GlobalStyle />
        <Layout>
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
