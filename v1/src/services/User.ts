import httpStatus from "http-status";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { hashPassword } from "../utils/helpers";

class UserService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async list(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async create(user: Prisma.UserCreateInput): Promise<User> {
    user.password = hashPassword(user.password);
    const created = await this.prisma.user.create({
      data: user,
    });
    return created;
  }

  async update(id: string, user: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({
      where: { id: Number(id) },
      data: user,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: Number(id) },
    });
  }

  async get(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email: email },
    });
  }
}

export default new UserService();
