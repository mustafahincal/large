-- CreateEnum
CREATE TYPE "Role" AS ENUM ('READER', 'WRITER', 'ADMIN', 'MANAGER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'READER',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE';