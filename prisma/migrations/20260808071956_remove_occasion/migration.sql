/*
  Warnings:

  - You are about to drop the column `occasion` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "occasion";

-- DropEnum
DROP TYPE "Occasion";
