/*
  Warnings:

  - You are about to drop the column `joineddate` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `joineddate`,
    ADD COLUMN `joined_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
