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

  async update(id: string, blog: Prisma.BlogUpdateInput): Promise<Blog> {
    return await this.prisma.blog.update({
      where: { id: Number(id) },
      data: blog,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.blog.delete({
      where: { id: Number(id) },
    });
  }

  async get(id: string): Promise<Blog | null> {
    return await this.prisma.blog.findUnique({
      where: { id: Number(id) },
    });
  }
}

export default new BlogService();
