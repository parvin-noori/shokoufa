/*
  Warnings:

  - Added the required column `size` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CartItem_cartId_productId_key";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "colors" "Color"[],
ADD COLUMN     "size" "Size" NOT NULL;
