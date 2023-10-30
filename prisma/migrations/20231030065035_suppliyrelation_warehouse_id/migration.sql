/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `warehouseId` to the `SupplyRelation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `supplyrelation` ADD COLUMN `warehouseId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Supplier_phone_key` ON `Supplier`(`phone`);

-- AddForeignKey
ALTER TABLE `SupplyRelation` ADD CONSTRAINT `SupplyRelation_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
