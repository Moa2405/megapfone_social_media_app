import { useMediaQuery } from '@mui/material';
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocaleStorage";

const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {

  const [themeLocalStorage, setThemeLocalStorage] = useLocalStorage("mode", "dark");
  const [darkMode, setDarkMode] = useState();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (themeLocalStorage === "dark") {
      setDarkMode(true);
    }
    else if (themeLocalStorage === "light") {
      setDarkMode(false);
    }
    else {
      setDarkMode(prefersDarkMode);
    }
  }, [prefersDarkMode]);


  const handleMode = () => {
    if (darkMode) {
      setThemeLocalStorage("light");
      setDarkMode(false);
    } else {
      setThemeLocalStorage("dark");
      setDarkMode(true);
    }
  };

  const value = useMemo(
    () => ({
      darkMode,
      handleMode,
    }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeMode = () => {
  return useContext(ThemeContext);
}

