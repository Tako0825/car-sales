-- AlterTable
ALTER TABLE `move` ADD COLUMN `createtime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `order` ADD COLUMN `createtime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `supply` ADD COLUMN `createtime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);