/*
  Warnings:

  - A unique constraint covering the columns `[messageId]` on the table `Prosody` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Prosody" DROP CONSTRAINT "Prosody_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Prosody_messageId_key" ON "Prosody"("messageId");

-- AddForeignKey
ALTER TABLE "Prosody" ADD CONSTRAINT "Prosody_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
