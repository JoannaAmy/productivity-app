/*
  Warnings:

  - Made the column `dueDate` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dueTime` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "dueDate" SET NOT NULL,
ALTER COLUMN "dueTime" SET NOT NULL;
