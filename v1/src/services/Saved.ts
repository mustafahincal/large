import httpStatus from 'http-status';
import { PrismaClient, Prisma, Saved } from '@prisma/client';

class SavedService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async list(where?: Prisma.SavedWhereInput): Promise<Saved[]> {
    return await this.prisma.saved.findMany({
      where: where,
      include: {
        blog: true,
      },
      /* include: {
        blog: {
          include: {
            sections: true,
            author: true,
          },
        },
      }, */
    });
  }

  async get(where: any): Promise<Saved | null> {
    return await this.prisma.saved.findFirst({
      where: where,
    });
  }

  async create(saved: Prisma.SavedCreateInput): Promise<Saved> {
    return await this.prisma.saved.create({
      data: saved,
    });
  }

  async delete(where: Prisma.SavedWhereUniqueInput): Promise<void> {
    await this.prisma.saved.delete({
      where: where,
    });
  }
}

export default new SavedService();
