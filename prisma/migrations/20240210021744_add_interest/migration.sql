/*
  Warnings:

  - You are about to drop the column `month` on the `InfoFinance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InfoFinance" DROP COLUMN "month",
ADD COLUMN     "interest" INTEGER,
ADD COLUMN     "interestType" TEXT;
