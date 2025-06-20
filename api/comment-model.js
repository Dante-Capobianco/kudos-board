const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async create(newComment) {
    const created = await prisma.comment.create({ data: newComment });
    return created;
  },
};
