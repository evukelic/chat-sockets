import { ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import ChatWindow from "./components/ChatWindow";
import JoinChat from "./components/JoinChat";
import { useState } from "react";

// Custom theme with sage green and grey colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#3e5438", // Sage green
      light: "#A5C0BF", // Lighter sage green
      dark: "#5C7A79", // Darker sage green
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#E4E4E4", // Light grey
      light: "#F0F0F0", // Lighter grey
      dark: "#BDBDBD", // Darker grey
    },
    background: {
      default: "#F5F5F5", // Very light grey
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#7D9D9C",
            },
            "&:hover fieldset": {
              borderColor: "#A5C0BF",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#5C7A79",
            },
          },
        },
      },
    },
  },
});

function App() {
  const [user, setUser] = useState<string | null>();

  return (
    <ThemeProvider theme={theme}>
      {user ? (
        <ChatWindow username={user} />
      ) : (
        <JoinChat onUserJoin={setUser} />
      )}
    </ThemeProvider>
  );
}

export default App;
