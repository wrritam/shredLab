/*
  Warnings:

  - You are about to drop the column `issueId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `pullRequestId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_issueId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pullRequestId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "issueId",
DROP COLUMN "pullRequestId";
