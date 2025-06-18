const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async create(newCard) {
    const created = await prisma.card.create({ data: newCard });
    return created;
  },

  async findAll(boardId) {
    const allCards = await prisma.card.findMany({
      where: { boardId: boardId },
    });
    return allCards;
  },
};
