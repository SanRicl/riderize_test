/*
  Warnings:

  - Made the column `userId` on table `rides` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "rides" DROP CONSTRAINT "rides_userId_fkey";

-- AlterTable
ALTER TABLE "rides" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
