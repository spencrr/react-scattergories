import axios from "axios";
import { io, Socket } from "socket.io-client";
import React, { useState, useEffect, FormEvent } from "react";
import {
  AppBar,
  Box,
  Button,
  createMuiTheme,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";

import CategoryList from "./components/CategoryList";
import { GameState } from "./types";

export default function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sessionId, setSessionId] = useState("");

  const updateCategories = ({ sessionId = "" } = {}) => {
    setSessionId(sessionId);
    axios.get(`/api/categories/${sessionId}`).then((v) => {
      setGameState(v.data);
    });
  };
  useEffect(() => {
    updateCategories();
    const socket = io();
    socket.connect();
    socket.on("updated", updateCategories);
    setSocket(socket);
  }, []);

  const handleButton = () => {
    socket?.emit("reset", { sessionId }, updateCategories);
  };

  const handleJoinSession = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      sessionId: { value: string };
    };
    const newSessionId = target.sessionId.value;
    socket?.emit("join", { sessionId: newSessionId }, updateCategories);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h5">Scattergories</Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleJoinSession}>
        <Grid container direction="row" justify="center">
          <Grid
            item
            md={6}
            container
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Box m={3}>
              <Grid item>
                <Typography variant="h3">
                  Letter: {gameState?.letter}
                </Typography>
              </Grid>
            </Box>
            <Grid item>
              {gameState != null && (
                <CategoryList categories={gameState.categories} />
              )}
            </Grid>
          </Grid>
          <Grid
            item
            md={6}
            container
            direction="row"
            justify="center"
            alignItems="stretch"
          >
            <Grid
              item
              container
              direction="column"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Box m={3}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleButton}
                  >
                    New Categories
                  </Button>
                </Box>
              </Grid>
              <Grid item>
                <TextField type="text" label="Session Name" name="sessionId" />
              </Grid>
              <Grid item>
                <Box m={3}>
                  <Button color="primary" variant="contained" type="submit">
                    Join Session
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
