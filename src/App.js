import React, { useState } from "react";
import "./App.css";
import OftadehRoutes from "./components/OftadehRoutes/OftadehRoutes";
import { ThemeProvider } from "@material-ui/core/styles";
import getTheme from "./oftadeh-configs/themeConfig";
import ThemeContext from "./context/ThemeContext";
import { BrowserRouter,Switch, Route } from 'react-router-dom'
import { BrowserRouter as Router}from "react-router-dom";
const App = () => {
  const curThemeName = localStorage.getItem("appTheme") || "light";

  const [themeType, setThemeType] = useState(curThemeName);

  const setThemeName = themeName => {
    localStorage.setItem("appTheme", themeName);
    setThemeType(themeName);
  };

  const theme = getTheme({
    paletteType: themeType
  });

  return (
    <BrowserRouter basename='/'>
    <ThemeContext.Provider value={{ setThemeName, curThemeName }}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <OftadehRoutes />
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
    </BrowserRouter>
  );
};

export default App;
