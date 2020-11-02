const express = require("express");

const db = require("../data/dbConfig.js");
const router = require("../router");

const server = express();

server.use(express.json());
server.use("/api", router);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
