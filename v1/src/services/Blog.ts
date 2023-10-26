import httpStatus from 'http-status';
import { PrismaClient, Blog, Prisma } from '@prisma/client';

class BlogService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async list(where?: Prisma.BlogWhereInput): Promise<Blog[]> {
    return await this.prisma.blog.findMany({
      where: where,
      include: {
        sections: true,
        // savedBlogs: true,
        author: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        likes: {
          select: {
            userId: true,
            // user: true,
          },
        },
      },
    });
  }

  async get(where: Prisma.BlogWhereUniqueInput): Promise<Blog | null> {
    return await this.prisma.blog.findUnique({
      where: where,
      include: {
        sections: true,
        // savedBlogs: true,
        author: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        likes: {
          select: {
            userId: true,
            // user: true,
          },
        },
      },
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
      where: { id },
      data: blog,
    });
  }

  async delete(where: Prisma.BlogWhereUniqueInput): Promise<void> {
    await this.prisma.blog.delete({
      where: where,
    });
  }
}

export default new BlogService();
