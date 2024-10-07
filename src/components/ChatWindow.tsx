import {
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  MoreVert as MoreVertIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface Message {
  user: string;
  text: string;
  timestamp: string;
  type?: "connection";
}

export default function Component({ username }: any) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [webSocket, setWebSocket] = useState<any>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");
    setWebSocket(socket);

    socket.onopen = () => {
      console.log("WebSocket connection established.");
      if (!webSocket) {
        socket.send(JSON.stringify({ type: "connection", user: username }));
      }
    };

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages([...messages, receivedMessage]);
    };

    return () => {
      socket.close();
    };
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      if (newMessage.trim() !== "") {
        const message = {
          text: newMessage,
          timestamp: new Date().toLocaleString("hr-HR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          user: username,
        };
        webSocket.send(JSON.stringify(message));
        setNewMessage("");
      }
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
      <Card
        sx={{
          width: "100%",
          maxWidth: 440,
          height: 600,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6" color="primary.contrastText">
              Simple Chat
            </Typography>
          }
          action={
            <IconButton color="inherit">
              <MoreVertIcon />
            </IconButton>
          }
          sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
        />
        <CardContent sx={{ flexGrow: 1, overflow: "auto", p: 0 }}>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {messages.map((message, index) => (
              <React.Fragment>
                {message.type === "connection" ? (
                  <ListItem alignItems="center" sx={{ py: 2 }}>
                    <ListItemText
                      primary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {message.user} has joined the chat
                        </Typography>
                      }
                      secondary={
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="caption"
                          color="text.secondary"
                        >
                          {message.timestamp}
                        </Typography>
                      }
                    />
                  </ListItem>
                ) : (
                  <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                    <Box
                      sx={{ display: "flex", width: "100%" }}
                      flexDirection={
                        message.user === username ? "row-reverse" : "row"
                      }
                      alignItems={
                        message.user === username ? "flex-end" : "flex-start"
                      }
                    >
                      {message.user !== username && (
                        <ListItemAvatar>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            variant="dot"
                            color={"primary"}
                          >
                            <Avatar alt={message.user} />
                          </Badge>
                        </ListItemAvatar>
                      )}

                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              display: "block",
                              textAlign:
                                message.user === username ? "right" : "left",
                            }}
                            component="span"
                            variant="subtitle2"
                            color="text.primary"
                          >
                            {message.user}
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Box
                              sx={{
                                display: "block",
                                textAlign:
                                  message.user === username ? "right" : "left",
                                m: 1,
                                mr: message.user === username ? 0 : 1,
                                ml: message.user !== username ? 0 : 1,
                              }}
                            >
                              <Typography
                                sx={{
                                  display: "inline",
                                  textAlign:
                                    message.user === username
                                      ? "right"
                                      : "left",
                                  bgcolor:
                                    message.user === username
                                      ? "primary.light"
                                      : "secondary.light",
                                  p: 1,
                                  borderRadius: 2,
                                }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {message.text}
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                display: "block",
                                textAlign:
                                  message.user === username ? "right" : "left",
                              }}
                              component="span"
                              variant="caption"
                              color="text.secondary"
                            >
                              {message.timestamp}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </Box>
                  </ListItem>
                )}
                <div ref={messagesEndRef} />
                {index < messages.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
        <Divider />
        <CardActions sx={{ p: 2, bgcolor: "background.paper" }}>
          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{ display: "flex", width: "100%", alignItems: "center" }}
          >
            <IconButton size="small" sx={{ mr: 1, color: "primary.main" }}>
              <EmojiEmotionsIcon />
            </IconButton>
            <IconButton size="small" sx={{ mr: 1, color: "primary.main" }}>
              <AttachFileIcon />
            </IconButton>
            <TextField
              fullWidth
              size="small"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              variant="outlined"
              sx={{ mr: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
