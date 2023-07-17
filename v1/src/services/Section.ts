import httpStatus from "http-status";
import { PrismaClient, Prisma, Section } from "@prisma/client";

class SectionService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async list(): Promise<Section[]> {
    return await this.prisma.section.findMany();
  }

  async create(section: any): Promise<Section> {
    return await this.prisma.section.create({
      data: section,
    });
  }

  async createMany(sections: Prisma.SectionCreateManyInput): Promise<any> {
    return await this.prisma.section.createMany({
      data: sections,
    });
  }
}

export default new SectionService();
