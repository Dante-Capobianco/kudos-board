const express = require("express");
const helmet = require("helmet");

const server = express();
server.use(helmet());
server.use(express.json());

server.use("/*splat", (req, res, next) => {
  next({ status: 404, message: "Endpoint not found" });
});

server.use((err, req, res, next) => {
  const { message, status = 500 } = err;
  res.status(status).json({ message });
});

module.exports = server;
