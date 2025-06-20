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

  async findById(id) {
    const card = await prisma.card.findUnique({
      where: { id: id },
      include: {
        comments: true,
      },
    });
    return card;
  },

  async updateUpvote(cardId, newUpvoteCount) {
    await prisma.card.update({
      data: { upvotes: newUpvoteCount },
      where: { id: cardId },
    });
    return;
  },

  async delete(cardId) {
    await prisma.card.delete({ where: { id: cardId } });
    return;
  },

  async updatePinnedStatus(cardId, newPinnedStatus) {
    await prisma.card.update({
      data: { pinned: newPinnedStatus, updatedAt: new Date() },
      where: { id: cardId },
    });
    return;
  },
};
