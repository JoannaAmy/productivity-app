/*
  Warnings:

  - Added the required column `clerkUserId` to the `Reminder` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `repeat` on the `Reminder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PERSONAL', 'WORK', 'HEALTH', 'EDUCATION', 'FINANCE', 'SHOPPING', 'OTHER');

-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "clerkUserId" TEXT NOT NULL,
DROP COLUMN "repeat",
ADD COLUMN     "repeat" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "taskTitle" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "dueTime" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "clerkUserId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "clerkUserIdIndexTask" ON "Task"("clerkUserId");

-- CreateIndex
CREATE INDEX "Task_dueDate_idx" ON "Task"("dueDate");

-- CreateIndex
CREATE INDEX "Task_priority_idx" ON "Task"("priority");

-- CreateIndex
CREATE INDEX "Task_category_idx" ON "Task"("category");

-- CreateIndex
CREATE INDEX "Reminder_repeat_idx" ON "Reminder"("repeat");

-- CreateIndex
CREATE INDEX "clerkUserIdIndexReminder" ON "Reminder"("clerkUserId");
