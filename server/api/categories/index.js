const router = require("express").Router();

const createCategories = require("../../utils/createCategories")(10);
const getLetter = require("../../utils/getLetter");

const refresh = () => ({
  categories: createCategories(),
  letter: getLetter(),
});

router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

router.get("/", (req, res) => {
  res.send(refresh());
});

let db = {};

const getSession = ({ update = false } = {}) => (req, res) => {
  const { sessionId } = req.params;
  if (update || !db[sessionId]) {
    updateCategories(sessionId);
  }
  res.send(db[sessionId]);
};

router.get("/:sessionId", getSession());

router.post("/:sessionId", getSession({ update: true }));

const handleConnection = (before) => ({ sessionId }, ack) => {
  before({ sessionId });
  ack({ sessionId });
};

const updateCategories = (sessionId) => {
  db[sessionId] = refresh();
};

module.exports = (io) => {
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
  return router;
};
