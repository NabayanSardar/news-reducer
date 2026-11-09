import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563eb", // Professional Blue
      light: "#60a5fa",
      dark: "#1e40af",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#0f172a", // Dark navy
      light: "#334155",
      dark: "#020617",
      contrastText: "#ffffff",
    },

    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },

    success: {
      main: "#16a34a",
    },

    error: {
      main: "#dc2626",
    },

    warning: {
      main: "#f59e0b",
    },

    info: {
      main: "#0284c7",
    },

    divider: "#e2e8f0",
  },

  typography: {
    fontFamily: `'Inter', 'Roboto', sans-serif`,

    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },

    h2: {
      fontWeight: 700,
      fontSize: "2rem",
    },

    h3: {
      fontWeight: 600,
    },

    h4: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 20px",
        },
        containedPrimary: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
          
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid #e2e8f0",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;