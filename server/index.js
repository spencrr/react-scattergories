const path = require("path");
const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const api = require("./api/categories")(io);

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use(express.static(path.join(__dirname, "../build")));

app.use("/api/categories", api);
