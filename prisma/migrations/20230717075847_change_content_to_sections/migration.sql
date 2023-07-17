/*
  Warnings:

  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_blogId_fkey";

-- DropTable
DROP TABLE "Content";

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT NOT NULL,
    "image" TEXT,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
