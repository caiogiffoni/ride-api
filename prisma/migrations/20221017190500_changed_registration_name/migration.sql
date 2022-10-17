/*
  Warnings:

  - You are about to drop the `Registratration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Registratration" DROP CONSTRAINT "Registratration_rideId_fkey";

-- DropForeignKey
ALTER TABLE "Registratration" DROP CONSTRAINT "Registratration_userId_fkey";

-- DropTable
DROP TABLE "Registratration";

-- CreateTable
CREATE TABLE "Registrations" (
    "id" TEXT NOT NULL,
    "subscription_date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "rideId" TEXT NOT NULL,

    CONSTRAINT "Registrations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Registrations" ADD CONSTRAINT "Registrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrations" ADD CONSTRAINT "Registrations_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Rides"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
