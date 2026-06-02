-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "date" VARCHAR(255);

-- CreateIndex
CREATE INDEX "Event_date_idx" ON "Event"("date");
