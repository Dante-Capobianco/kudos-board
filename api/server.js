const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const Board = require("./board-model");
const Card = require("./card-model");
const Comment = require("./comment-model");

const corsOptions = {
  origin: /\.onrender\.com$/,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors(corsOptions));

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

server.delete("/board/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    await Board.delete(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

server.post("/board/:id/card", async (req, res, next) => {
  const boardId = Number(req.params.id);
  const newCard = req.body;

  try {
    const created = await Card.create({ ...newCard, boardId });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

server.get("/board/:id/card", async (req, res, next) => {
  const boardId = Number(req.params.id);

  try {
    const allCards = await Card.findAll(boardId);
    res.status(200).json(allCards);
  } catch (err) {
    next(err);
  }
});

server.patch("/board/:id/card/:cardId", async (req, res, next) => {
  const cardId = Number(req.params.cardId);
  const { newUpvoteCount } = req.body;

  try {
    await Card.updateUpvote(cardId, newUpvoteCount);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

server.delete("/board/:id/card/:cardId", async (req, res, next) => {
  const cardId = Number(req.params.cardId);
  try {
    await Card.delete(cardId);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

server.patch("/board/:id/card/pin/:cardId", async (req, res, next) => {
  const cardId = Number(req.params.cardId);
  const { newPinnedStatus } = req.body;

  try {
    await Card.updatePinnedStatus(cardId, newPinnedStatus);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

server.post("/board/:id/card/:cardId", async (req, res, next) => {
  const cardId = Number(req.params.cardId);
  const newComment = req.body;

  try {
    const created = await Comment.create({ ...newComment, cardId });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

server.get("/board/:id/card/:cardId", async (req, res, next) => {
  const cardId = Number(req.params.cardId);
  try {
    const card = await Card.findById(cardId);
    res.status(200).json(card);
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
