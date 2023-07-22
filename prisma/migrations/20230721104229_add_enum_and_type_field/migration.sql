-- CreateEnum
CREATE TYPE "Type" AS ENUM ('TEXT', 'IMAGE', 'TITLE_TEXT', 'CODE');

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'TEXT';
