const socketIo = require("socket.io");

const handleConnection = (before) => ({ sessionId }, ack) => {
  before({ sessionId });
  ack({ sessionId });
};

module.exports = ({ http, updateCategories }) => {
  const io = socketIo(http);
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
};
