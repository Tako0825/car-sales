/*
  Warnings:

  - You are about to alter the column `quantity` on the `inventory` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `inventory` MODIFY `quantity` INTEGER UNSIGNED NOT NULL;
