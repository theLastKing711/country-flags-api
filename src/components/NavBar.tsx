import React from "react";
import styled from "styled-components";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material";
import { ActiveTheme } from "../types";

const StyledHeader = styled.header`
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
  .main-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 1.75rem 1rem;
  }

  .second-section {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`;

interface Props {
  themeActiveMode: ActiveTheme;
  toggleTheme: () => void;
}

const NavBar: React.FC<Props> = ({ themeActiveMode, toggleTheme }: Props) => {
  const theme = useTheme();

  const textColor = theme.palette.text.primary;
  const paperColor = theme.palette.background.paper;

  const isLightMode: boolean = themeActiveMode == ActiveTheme.Light;
  const isDarkMode: boolean = themeActiveMode == ActiveTheme.Dark;

  return (
    <StyledHeader
      style={{
        backgroundColor: paperColor,
        color: textColor,
      }}
    >
      <nav className="main-nav container">
        <h1 className="">Where in the world</h1>
        <div className="second-section">
          <IconButton
            aria-label="upload picture"
            component="label"
            onClick={toggleTheme}
          >
            {isLightMode && <DarkModeIcon style={{ fill: textColor }} />}
            {isDarkMode && <LightModeIcon style={{ fill: textColor }} />}
          </IconButton>
          <div className="">Dark Mode</div>
        </div>
      </nav>
    </StyledHeader>
  );
};

export default NavBar;
