import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CategoryList from "./components/CategoryList";

import axios from "axios";
import io from "socket.io-client";
import Letter from "./components/Letter";

export default function App() {
  const [gameState, setGameState] = useState({});
  const [socket, setSocket] = useState({});
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
    socket.emit("reset", { sessionId }, updateCategories);
  };

  const handleJoinSession = (e) => {
    e.preventDefault();
    const newSessionId = e.target.sessionId.value;
    socket.emit("join", { sessionId: newSessionId }, updateCategories);
  };

  return (
    <div>
      <Header />
      <Letter letter={gameState.letter} />
      <CategoryList categories={gameState.categories} />
      <button onClick={handleButton}>New Categories</button>
      <form onSubmit={handleJoinSession}>
        <input type="text" name="sessionId" />
        <button type="submit">Join Session</button>
      </form>
    </div>
  );
}
