/*
  Warnings:

  - Changed the type of `dueDate` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "dueDate",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Task_dueDate_idx" ON "Task"("dueDate");
