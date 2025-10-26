/*
  Warnings:

  - You are about to drop the column `uuid` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `move` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `supplyrelation` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Inventory_uuid_key` ON `inventory`;

-- DropIndex
DROP INDEX `Move_uuid_key` ON `move`;

-- DropIndex
DROP INDEX `Order_uuid_key` ON `order`;

-- DropIndex
DROP INDEX `Product_uuid_key` ON `product`;

-- DropIndex
DROP INDEX `Supplier_uuid_key` ON `supplier`;

-- DropIndex
DROP INDEX `SupplyRelation_uuid_key` ON `supplyrelation`;

-- DropIndex
DROP INDEX `User_uuid_key` ON `user`;

-- AlterTable
ALTER TABLE `inventory` DROP COLUMN `uuid`;

-- AlterTable
ALTER TABLE `move` DROP COLUMN `uuid`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `uuid`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `uuid`;

-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `uuid`;

-- AlterTable
ALTER TABLE `supplyrelation` DROP COLUMN `uuid`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `uuid`;
