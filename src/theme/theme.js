export const light = {

  palette: {
    mode: "light",

    primary: {
      main: "#58C190",
      light: "#A2EFCB",
      dark: "#54CE95",
      contrastText: "#000000",
    },
    error: {
      main: "#CF6679",
      light: "#FF91A5",
      dark: "#DD4C66",
      contrastText: "#000000",
    },
  },

  breakpoints: {
    values: {
      xxs: 0,
      xs: 450,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
};
export const dark = {

  palette: {
    mode: "dark",

    primary: {
      main: "#6CF0B2",
      light: "#A2EFCB",
      dark: "#54CE95",
      contrastText: "#000000",
    },
    error: {
      main: "#CF6679",
      light: "#FF91A5",
      dark: "#DD4C66",
      contrastText: "#000000",
    },
  },

  breakpoints: {
    values: {
      xxs: 0,
      xs: 450,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
};

// const getDesignTokens = (mode) => ({
//   palette: {
//     mode,
//     ...(mode === 'light'
//       ? {
//           // palette values for light mode
//           primary: amber,
//           divider: amber[200],
//           text: {
//             primary: grey[900],
//             secondary: grey[800],
//           },
//         }
//       : {
//           // palette values for dark mode
//           primary: deepOrange,
//           divider: deepOrange[700],
//           background: {
//             default: deepOrange[900],
//             paper: deepOrange[900],
//           },
//           text: {
//             primary: '#fff',
//             secondary: grey[500],
//           },
//         }),
//   },
// });

// export default function App() {
//   const [mode, setMode] = useState('light');
//   const colorMode = useMemo(
//     () => ({
//       // The dark mode switch would invoke this method
//       toggleColorMode: () => {
//         setMode((prevMode) =>
//           prevMode === 'light' ? 'dark' : 'light',
//         );
//       },
//     }),
//     [],
//   );

//   // Update the theme only if the mode changes
//   const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <Page />
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }



