import { Login as LoginIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function Component({ onUserJoin }: any) {
  const [username, setUsername] = useState("");

  const handleJoinChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() !== "") {
      onUserJoin(username.trim());
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400 }}>
        <CardHeader
          title={
            <Typography variant="h6" color="primary.contrastText">
              Join Chat
            </Typography>
          }
          sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
        />
        <CardContent sx={{ p: 3 }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Enter your username to join the chat
          </Typography>
          <form onSubmit={handleJoinChat}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              endIcon={<LoginIcon />}
              disabled={!username.trim()}
            >
              Join Chat
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
