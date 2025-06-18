const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const Board = require("./board-model");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

server.post("/board", async (req, res, next) => {
  const newBoard = req.body;

  try {
    const created = await Board.create(newBoard);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

server.get("/board", async (req, res, next) => {
  try {
    const allBoards = await Board.findAll();
    res.status(200).json(allBoards);
  } catch (err) {
    next(err);
  }
});

server.use("/", (req, res, next) => {
  next({ status: 404, message: "Endpoint not found" });
});

server.use((err, req, res, next) => {
  const { message, status = 500 } = err;
  res.status(status).json({ message });
});

module.exports = server;
