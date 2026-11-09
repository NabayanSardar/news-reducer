import { RouterProvider } from "react-router-dom";
import "./App.css";
import Routes from "./routes/Routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import { Toaster } from "sonner";
import AuthProvider from "./context/auth/AuthProvider";
import CategoryProvider from "./context/category/CategoryProvider";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster closeButton richColors position="top-right" />
        <AuthProvider>
          <CategoryProvider>
            <RouterProvider router={Routes} />
          </CategoryProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
