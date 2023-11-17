CREATE SCHEMA `todoapp` ;

CREATE TABLE `todoapp`.`tasks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  `completed` TINYINT NULL,
  PRIMARY KEY (`id`));
