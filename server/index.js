const path = require("path");
const express = require("express");
const app = express();
const http = require("http").createServer(app);

const { categoryAPI, updateCategories } = require("./api/categories");

const socketHandler = require("./socket-handler");

socketHandler({ http, updateCategories });

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use(express.static(path.join(__dirname, "..", "build")));

app.use("/api/categories", categoryAPI);
