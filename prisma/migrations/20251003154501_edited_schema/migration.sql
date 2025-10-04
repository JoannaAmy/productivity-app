-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PERSONAL', 'WORK', 'HEALTH', 'EDUCATION', 'FINANCE', 'SHOPPING', 'OTHER');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "taskTitle" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3),
    "dueTime" TEXT,
    "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
    "category" "Category" NOT NULL DEFAULT 'PERSONAL',
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Task_dueDate_idx" ON "Task"("dueDate");

-- CreateIndex
CREATE INDEX "Task_priority_idx" ON "Task"("priority");

-- CreateIndex
CREATE INDEX "Task_category_idx" ON "Task"("category");
