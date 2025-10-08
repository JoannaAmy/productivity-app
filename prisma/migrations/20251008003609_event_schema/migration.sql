/*
  Warnings:

  - You are about to drop the column `duration` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `eventDateTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `guests` on the `Event` table. All the data in the column will be lost.
  - Added the required column `clerkUserId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "duration",
DROP COLUMN "eventDateTime",
DROP COLUMN "guests",
ADD COLUMN     "clerkUserId" TEXT NOT NULL,
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "guestEmails" TEXT[],
ADD COLUMN     "time" TEXT NOT NULL;

-- DropEnum
DROP TYPE "public"."Category";

-- DropEnum
DROP TYPE "public"."Priority";

-- DropEnum
DROP TYPE "public"."RepeatType";

-- CreateIndex
CREATE INDEX "Event_clerkUserId_idx" ON "Event"("clerkUserId");
