import httpStatus from "http-status";
import { PrismaClient, Blog } from "@prisma/client";

class BlogService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async list(): Promise<Blog[]> {
    return await this.prisma.blog.findMany();
  }
}

export default new BlogService();
