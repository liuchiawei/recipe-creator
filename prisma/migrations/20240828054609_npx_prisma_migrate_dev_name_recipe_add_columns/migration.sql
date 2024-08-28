-- DropForeignKey
ALTER TABLE `ingredients` DROP FOREIGN KEY `ingredients_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `steps` DROP FOREIGN KEY `steps_recipeId_fkey`;

-- AlterTable
ALTER TABLE `recipes` ADD COLUMN `genre` VARCHAR(191) NULL,
    ADD COLUMN `keywords` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ingredients` ADD CONSTRAINT `ingredients_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `recipes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `steps` ADD CONSTRAINT `steps_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `recipes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
