/*
  Warnings:

  - You are about to drop the column `begin` on the `Prosody` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `Prosody` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Prosody" DROP COLUMN "begin",
DROP COLUMN "end";
