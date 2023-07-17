-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "subTitle" VARCHAR(255),
    "subContent" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);
