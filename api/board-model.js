const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async create(newBoard) {
    const created = await prisma.board.create({ data: newBoard });
    return created;
  },

  async findAll() {
    const allBoards = await prisma.board.findMany();
    return allBoards;
  },

  async delete(id) {
    await prisma.board.delete({ where: { id: id } });
    return;
  },
};
