import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";

const appTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3d7ae5",
    },
    secondary: {
      main: "#01b8e3",
    },
    background: {
      default: "#050624",
      paper: "rgba(250, 251, 252, 0.15)",
    },
    text: {
      primary: "#ffffff",
      secondary: "#d2e0f5",
      disabled: "#a4b4cb",
    },
    success: {
      main: "#45b020",
      light: "#c1f5af",
    },
    error: {
      main: "#d22cd6",
      light: "#fdbcff",
    },
    info: {
      main: "#1092ef",
      light: "#a6d6f8",
    },
    warning: {
      main: "#f5640d",
      light: "#ffc5a3",
    },
    grey: {
      100: "#fafbfc",
      200: "#d3e1f5",
      300: "#798ba3",
      400: "#5b5b5b",
      500: "#4b6eac",
      600: "#393a52",
    },
  },
  typography: {
    fontFamily: "'Manrope', 'Sora', Helvetica, Arial, sans-serif",
    h1: {
      fontSize: "32px",
      fontWeight: 800,
      color: "#ffffff",
    },
    h2: {
      fontSize: "24px",
      fontWeight: 800,
      color: "#ffffff",
    },
    h3: {
      fontSize: "16px",
      fontWeight: 800,
      color: "#ffffff",
    },
    h4: {
      fontSize: "14px",
      fontWeight: 700,
      color: "#ffffff",
    },
    h5: {
      fontSize: "12px",
      fontWeight: 600,
      color: "#d2e0f5",
    },
    h6: {
      fontSize: "10px",
      fontWeight: 400,
      color: "#d2e0f5",
    },
    subtitle1: {
      fontSize: "18px",
      fontWeight: 700,
      color: "#ffffff",
    },
    subtitle2: {
      fontSize: "10px",
      fontWeight: 400,
      color: "#d2e0f5",
    },
    body1: {
      fontSize: "12px",
      fontWeight: 400,
      color: "#d2e0f5",
    },
    body2: {
      fontSize: "10px",
      fontWeight: 400,
      color: "#a4b4cb",
    },
    caption: {
      fontSize: "8px",
      fontWeight: 400,
      color: "#5b5b5b",
    },
    button: {
      fontSize: "8px",
      fontWeight: 400,
      textTransform: "none",
      color: "#fafbfc",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
          background:
            "linear-gradient(90deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)",
          "&:hover": {
            background:
              "linear-gradient(90deg, rgba(62,121,229,0.8) 0%, rgba(1,184,227,0.8) 100%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: "rgba(250, 251, 252, 0.15)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(75, 110, 172, 0.3)",
          borderRadius: "10px",
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255, 255, 255, 0.22)",
            borderRadius: "8px",
            border: "1px solid #4b6eac",
            color: theme.palette.text.secondary,
            fontSize: "10px",
            fontWeight: 600,
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
          "& .MuiInputLabel-root": {
            color: theme.palette.text.disabled,
            fontSize: "10px",
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "3px",
          fontSize: "8px",
          fontWeight: 400,
          height: "16px",
          "& .MuiChip-avatar": {
            width: "4px",
            height: "4px",
            borderRadius: "2px",
          },
        }),
      },
    },
  },
});

export const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
