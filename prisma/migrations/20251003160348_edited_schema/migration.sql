/*
  Warnings:

  - Added the required column `clerkUserId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "clerkUserId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "clerkUserIdIndex" ON "Task"("clerkUserId");
