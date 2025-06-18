const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async create(newBoard) {
    const created = await prisma.board.create({ data: newBoard });
    return created;
  }
};
