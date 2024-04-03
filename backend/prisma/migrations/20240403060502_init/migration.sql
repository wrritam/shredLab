/*
  Warnings:

  - Made the column `readme` on table `Repository` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Repository" ALTER COLUMN "readme" SET NOT NULL;

-- CreateTable
CREATE TABLE "LikedRepo" (
    "id" SERIAL NOT NULL,
    "repositoryId" INTEGER NOT NULL,
    "likedBySerId" INTEGER NOT NULL,

    CONSTRAINT "LikedRepo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikedRepo" ADD CONSTRAINT "LikedRepo_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedRepo" ADD CONSTRAINT "LikedRepo_likedBySerId_fkey" FOREIGN KEY ("likedBySerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
