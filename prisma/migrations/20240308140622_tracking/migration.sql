/*
  Warnings:

  - You are about to drop the column `isHealth` on the `Calculation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "WishList_idUser_key";

-- AlterTable
ALTER TABLE "Calculation" DROP COLUMN "isHealth";

-- AlterTable
ALTER TABLE "InfoFinance" ADD COLUMN     "paidOff" INTEGER;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "isHealth" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Tracking" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "outFor" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tracking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tracking" ADD CONSTRAINT "Tracking_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
