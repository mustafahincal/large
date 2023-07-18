/*
  Warnings:

  - Made the column `searchable_text` on table `Blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "searchable_text" SET NOT NULL;
