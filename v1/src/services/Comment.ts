import httpStatus from "http-status";
import { PrismaClient, Prisma, Comment } from "@prisma/client";

class CommentService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async list(where?: Prisma.CommentWhereInput): Promise<Comment[]> {
    return await this.prisma.comment.findMany({
      where: where,
    });
  }

  async get(where: any): Promise<Comment | null> {
    return await this.prisma.comment.findUnique({
      where: where,
    });
  }

  async create(comment: Prisma.CommentCreateInput): Promise<Comment> {
    return await this.prisma.comment.create({
      data: comment,
    });
  }

  async delete(where: Prisma.CommentWhereUniqueInput): Promise<void> {
    await this.prisma.comment.delete({
      where: where,
    });
  }
}

export default new CommentService();
