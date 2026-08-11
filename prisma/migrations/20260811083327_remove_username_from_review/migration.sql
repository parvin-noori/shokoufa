/*
  Warnings:

  - You are about to drop the column `username` on the `Review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,productId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Review_username_productId_key";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "username";

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_productId_key" ON "Review"("userId", "productId");
