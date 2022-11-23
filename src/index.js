import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContextProvider, useThemeMode } from './context/themeContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { light, dark } from './theme/theme';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const Root = () => {
  const { darkMode } = useThemeMode();
  let theme = useMemo(() => {
    return createTheme(darkMode ? dark : light);
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ThemeContextProvider>
      <Root />
    </ThemeContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
