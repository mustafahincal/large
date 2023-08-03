import httpStatus from "http-status";
import { PrismaClient, Prisma, Follow } from "@prisma/client";

class FollowService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async list(where?: Prisma.FollowWhereInput): Promise<Follow[]> {
    return await this.prisma.follow.findMany({
      where: where,
    });
  }

  async get(where: Prisma.FollowWhereUniqueInput): Promise<Follow | null> {
    return await this.prisma.follow.findUnique({
      where: where,
    });
  }

  async create(follow: Prisma.FollowCreateInput): Promise<Follow> {
    return await this.prisma.follow.create({
      data: follow,
    });
  }

  async delete(where: Prisma.FollowWhereUniqueInput): Promise<void> {
    await this.prisma.follow.delete({
      where: where,
    });
  }
}

export default new FollowService();
