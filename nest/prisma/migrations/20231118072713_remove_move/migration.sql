/*
  Warnings:

  - You are about to drop the `move` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `move` DROP FOREIGN KEY `Move_inboundId_fkey`;

-- DropForeignKey
ALTER TABLE `move` DROP FOREIGN KEY `Move_operatorId_fkey`;

-- DropForeignKey
ALTER TABLE `move` DROP FOREIGN KEY `Move_outboundId_fkey`;

-- DropForeignKey
ALTER TABLE `move` DROP FOREIGN KEY `Move_productId_fkey`;

-- DropTable
DROP TABLE `move`;
