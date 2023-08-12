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
      include:{
        user:{
          select:{
            id:true,
            first_name:true,
            last_name:true
          }
        }
      }
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

  async update(
    where:Prisma.CommentWhereUniqueInput,
    data:Prisma.CommentUpdateInput
    ):Promise<Comment>{
    return await this.prisma.comment.update({
      where:where,data:data
    })
  }

  async delete(where: Prisma.CommentWhereUniqueInput): Promise<void> {
    await this.prisma.comment.delete({
      where: where,
    });
  }
}

export default new CommentService();
