-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "time" VARCHAR(255) NOT NULL,
    "title" TEXT NOT NULL,
    "speaker" VARCHAR(255) NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "career" VARCHAR(255) NOT NULL,
    "meetLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Event_createdAt_idx" ON "Event"("createdAt");
