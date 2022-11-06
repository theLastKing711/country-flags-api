import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { darkTheme } from "./styles/themes/darkTheme";
import { ActiveTheme } from "./types";
import { lightTheme } from "./styles/themes/lightTheme";
import styled from "styled-components";
import { ThemeProvider } from "@mui/material";
import { ThemeStorageService } from "./services/localStorage";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  const [activeTheme, setActiveTheme] = useState(
    ThemeStorageService.getItem("theme")
  );

  const toggleTheme = () => {
    const newTheme: ActiveTheme =
      activeTheme == ActiveTheme.Light ? ActiveTheme.Dark : ActiveTheme.Light;

    console.log("new theme", newTheme);

    setActiveTheme(ThemeStorageService.setItem("theme", newTheme));
  };

  const theme = activeTheme == ActiveTheme.Light ? lightTheme : darkTheme;

  console.log("teheme", theme);

  return (
    <ThemeProvider theme={theme}>
      <StyledApp
        style={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <NavBar themeActiveMode={activeTheme} toggleTheme={toggleTheme} />
        <Outlet />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
