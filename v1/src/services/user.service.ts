import httpStatus from "http-status";
import { Prisma, PrismaClient, User } from "@prisma/client";

class UserService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async list(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async create(user: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data: user,
    });
  }
}

export default new UserService();
