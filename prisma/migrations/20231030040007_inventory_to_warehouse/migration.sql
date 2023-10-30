/*
  Warnings:

  - You are about to drop the `inventory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `Inventory_productId_fkey`;

-- DropForeignKey
ALTER TABLE `move` DROP FOREIGN KEY `Move_inboundId_fkey`;

-- DropForeignKey
ALTER TABLE `move` DROP FOREIGN KEY `Move_outboundId_fkey`;

-- DropTable
DROP TABLE `inventory`;

-- CreateTable
CREATE TABLE `WareHouse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Move` ADD CONSTRAINT `Move_outboundId_fkey` FOREIGN KEY (`outboundId`) REFERENCES `WareHouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Move` ADD CONSTRAINT `Move_inboundId_fkey` FOREIGN KEY (`inboundId`) REFERENCES `WareHouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
