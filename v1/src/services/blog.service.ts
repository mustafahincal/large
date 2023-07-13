import httpStatus from "http-status";
import { PrismaClient, Blog, Prisma } from "@prisma/client";

class BlogService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async list(): Promise<Blog[]> {
    return await this.prisma.blog.findMany();
  }
  async create(blog: Prisma.BlogCreateInput): Promise<Blog> {
    return await this.prisma.blog.create({
      data: blog,
    });
  }
}

export default new BlogService();
