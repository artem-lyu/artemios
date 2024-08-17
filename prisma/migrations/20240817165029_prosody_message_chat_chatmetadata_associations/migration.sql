-- CreateTable
CREATE TABLE "ChatMetadata" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "fromText" BOOLEAN NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prosody" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "scores" JSONB NOT NULL,
    "begin" DOUBLE PRECISION NOT NULL,
    "end" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Prosody_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatMetadata_chatId_key" ON "ChatMetadata"("chatId");

-- AddForeignKey
ALTER TABLE "ChatMetadata" ADD CONSTRAINT "ChatMetadata_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prosody" ADD CONSTRAINT "Prosody_id_fkey" FOREIGN KEY ("id") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
