-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rides" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "start_date_registration" TIMESTAMP(3) NOT NULL,
    "end_date_registration" TIMESTAMP(3) NOT NULL,
    "additional_information" TEXT NOT NULL,
    "start_place" TEXT NOT NULL,
    "participants_limit" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Rides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registratration" (
    "id" TEXT NOT NULL,
    "subscription_date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "RideId" TEXT NOT NULL,

    CONSTRAINT "Registratration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Rides" ADD CONSTRAINT "Rides_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registratration" ADD CONSTRAINT "Registratration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registratration" ADD CONSTRAINT "Registratration_RideId_fkey" FOREIGN KEY ("RideId") REFERENCES "Rides"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
