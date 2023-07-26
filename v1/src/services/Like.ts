import httpStatus from "http-status";
import { PrismaClient, Prisma, Like } from "@prisma/client";

class LikeService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async list(where?: Prisma.LikeWhereInput): Promise<Like[]> {
    return await this.prisma.like.findMany({
      where: where,
      // include: { user: true },
    });
  }

  async get(where: any): Promise<Like | null> {
    return await this.prisma.like.findFirst({
      where: where,
    });
  }

  async create(like: Prisma.LikeCreateInput): Promise<Like> {
    return await this.prisma.like.create({
      data: like,
    });
  }

  async delete(where: Prisma.LikeWhereUniqueInput): Promise<void> {
    await this.prisma.like.delete({
      where: where,
    });
  }
}

export default new LikeService();
