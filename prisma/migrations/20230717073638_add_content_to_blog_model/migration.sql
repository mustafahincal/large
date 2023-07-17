/*
  Warnings:

  - You are about to drop the column `content` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `subContent` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `subTitle` on the `Content` table. All the data in the column will be lost.
  - Added the required column `image` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blogId` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "content",
ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "subContent",
DROP COLUMN "subTitle",
ADD COLUMN     "blogId" INTEGER NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "title" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
