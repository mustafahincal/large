/*
  Warnings:

  - Added the required column `searchable_text` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "searchable_text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Section" ALTER COLUMN "content" DROP NOT NULL;
