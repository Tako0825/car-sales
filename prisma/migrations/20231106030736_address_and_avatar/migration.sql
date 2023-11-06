-- AlterTable
ALTER TABLE `user` ADD COLUMN `address` VARCHAR(191) NOT NULL DEFAULT '这个家伙很神秘, 还没有留下任何地址哦~',
    ADD COLUMN `avatar` VARCHAR(191) NOT NULL DEFAULT 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
