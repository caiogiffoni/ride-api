/*
  Warnings:

  - You are about to drop the column `RideId` on the `Registratration` table. All the data in the column will be lost.
  - Added the required column `rideId` to the `Registratration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Registratration" DROP CONSTRAINT "Registratration_RideId_fkey";

-- AlterTable
ALTER TABLE "Registratration" DROP COLUMN "RideId",
ADD COLUMN     "rideId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Registratration" ADD CONSTRAINT "Registratration_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Rides"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
