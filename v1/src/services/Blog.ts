import httpStatus from "http-status";
import { PrismaClient, Blog, Prisma } from "@prisma/client";

class BlogService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async list(): Promise<Blog[]> {
    return await this.prisma.blog.findMany({
      include: { sections: true },
    });
  }

  async create(blog: Prisma.BlogCreateInput): Promise<Blog> {
    blog.updatedAt = new Date();
    blog.searchable_text = blog.title;
    if (blog.tags && Array.isArray(blog.tags)) {
      blog?.tags?.forEach((tag) => (blog.searchable_text += `, ${tag}`));
    }
    return await this.prisma.blog.create({
      data: blog,
    });
  }

  async update(id: string, blog: Prisma.BlogUpdateInput): Promise<Blog> {
    return await this.prisma.blog.update({
      where: { id: id },
      data: blog,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.blog.delete({
      where: { id: id },
    });
  }

  async get(id: string): Promise<Blog | null> {
    return await this.prisma.blog.findUnique({
      where: { id: id },
    });
  }
}

export default new BlogService();
