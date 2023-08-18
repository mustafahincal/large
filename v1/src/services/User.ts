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

  async get(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: where });
  }

  async getUserDetails(where:Prisma.UserWhereUniqueInput):Promise<User| null>{
    return await this.prisma.user.findUnique({
      where:where,
      include:{
        followedBy:true,
        blogs:true,
        following:true
      }
    })
  }

  async create(user: Prisma.UserCreateInput): Promise<User> {
    user.password = hashPassword(user.password);
    const created = await this.prisma.user.create({
      data: user,
    });
    return created;
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    user: Prisma.UserUpdateInput
  ): Promise<User> {
    return await this.prisma.user.update({
      where: where,
      data: user,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<void> {
    await this.prisma.user.delete({
      where: where,
    });
  }
}

export default new UserService();
