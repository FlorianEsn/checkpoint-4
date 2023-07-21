DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nickname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `hashedPassword` VARCHAR(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--
LOCK TABLES `user` WRITE;

INSERT INTO
  `user`
VALUES
  (
    1,
    "test",
    "test@test.com",
    "test2"
  );

UNLOCK TABLES;

-- Création de la table "movie"
CREATE TABLE `movie` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `genre` ENUM('Drame', 'Action', 'Science fiction', 'Thriller', 'Comedy', 'Romance', 'Aventure', 'Documentaire') DEFAULT NULL,
  `rating` FLOAT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `released` DATE NULL,
  `image` VARCHAR(255) NULL
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

UNLOCK TABLES;

-- Création de la table "list"
CREATE TABLE `list` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) DEFAULT NULL,
  `user_id` INT NOT NULL,
  KEY `fk_list_user` (`user_id`),
  CONSTRAINT `fk_list_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

UNLOCK TABLES;

-- Création de la table "movie_list"
CREATE TABLE `movie_list` (
  `movie_id` INT NOT NULL,
  `list_id` INT NOT NULL,
  CONSTRAINT `fk_movie_list_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `fk_movie_list_list` FOREIGN KEY (`list_id`) REFERENCES `list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

UNLOCK TABLES;
