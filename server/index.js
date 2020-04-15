const path = require("path");
const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { api, updateCategories } = require("./api/categories");

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const handleConnection = (before) => ({ sessionId }, ack) => {
  before({ sessionId });
  ack({ sessionId });
};

io.on("connection", (socket) => {
  socket.on(
    "join",
    handleConnection(({ sessionId }) => {
      socket.join(`${sessionId}`);
    })
  );

  socket.on(
    "reset",
    handleConnection(({ sessionId }) => {
      updateCategories(sessionId);
      socket.to(`${sessionId}`).emit("updated", { sessionId });
    })
  );
});

app.use(express.static(path.join(__dirname, "../build")));

app.use("/api/categories", api);
