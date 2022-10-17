-- DropForeignKey
ALTER TABLE "Registrations" DROP CONSTRAINT "Registrations_rideId_fkey";

-- DropForeignKey
ALTER TABLE "Rides" DROP CONSTRAINT "Rides_userId_fkey";

-- AddForeignKey
ALTER TABLE "Rides" ADD CONSTRAINT "Rides_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrations" ADD CONSTRAINT "Registrations_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Rides"("id") ON DELETE CASCADE ON UPDATE CASCADE;
