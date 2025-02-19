CREATE DATABASE  IF NOT EXISTS `mdd`;
USE `mdd`;

DROP TABLE IF EXISTS `subscriptions`;
DROP TABLE IF EXISTS `comments`;
DROP TABLE IF EXISTS `articles`;
DROP TABLE IF EXISTS `topics`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `profile_name` varchar(16) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `topics` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(256) NOT NULL,
  `title` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK71rjsqaorlydivvwh8xgousre` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `articles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(2000) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `title` varchar(64) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `author_id` bigint NOT NULL,
  `topic_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKe02fs2ut6qqoabfhj325wcjul` (`author_id`),
  KEY `FKtr90v51q71w7rpslscsfjf3cv` (`topic_id`),
  CONSTRAINT `FKe02fs2ut6qqoabfhj325wcjul` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKtr90v51q71w7rpslscsfjf3cv` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `comments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comment` varchar(256) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `article_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk4ib6syde10dalk7r7xdl0m5p` (`article_id`),
  KEY `FK8omq0tc18jd43bu5tjh6jvraq` (`user_id`),
  CONSTRAINT `FK8omq0tc18jd43bu5tjh6jvraq` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKk4ib6syde10dalk7r7xdl0m5p` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `subscriptions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `topic_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfuag8et2vdg3ds9h8trqx2ldq` (`topic_id`),
  KEY `FKhro52ohfqfbay9774bev0qinr` (`user_id`),
  CONSTRAINT `FKfuag8et2vdg3ds9h8trqx2ldq` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`),
  CONSTRAINT `FKhro52ohfqfbay9774bev0qinr` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- INSERT DATA 

INSERT INTO users (`email`, `password`, `profile_name`, `created_at`, `updated_at`) 
VALUES ('josefa.fox@mdd.com', '$2y$10$DC7w9RMXSn.IiFC29AwoauJrvmwT4gzXAlV3pOulyZwl8SdmfmIge', 'josefa.fox', NOW(), NOW());


INSERT INTO topics (`description`, `title`) VALUES
('Un langage de programmation polyvalent et populaire, utilisé pour le développement web, mobile et backend.', 'JavaScript'),
('Un langage de programmation utilisé pour l''analyse de données, l''apprentissage automatique et le développement web.', 'Python'),
('Un langage orienté objet utilisé pour le développement d''applications d''entreprise.', 'Java'),
('Un framework frontend moderne permettant de construire des interfaces utilisateur interactives.', 'React'),
('Une bibliothèque JavaScript légère pour la manipulation du DOM et les interactions utilisateur.', 'jQuery'),
('Un framework backend basé sur Node.js, utilisé pour construire des API et des applications web.', 'Express.js'),
('Un framework PHP populaire utilisé pour le développement d''applications web évolutives.', 'Laravel'),
('Un framework Python full-stack utilisé pour le développement web rapide et sécurisé.', 'Django'),
('Un framework backend open-source basé sur Ruby, favorisant la convention sur la configuration.', 'Ruby on Rails'),
('Un modèle de conception utilisé pour séparer les préoccupations et faciliter la maintenance du code.', 'MVC'),
('Une architecture logicielle qui divise une application en petits services indépendants.', 'Microservices'),
('Un paradigme de programmation permettant d''exécuter du code de manière asynchrone.', 'Programmation événementielle'),
('Une approche permettant d''isoler les composants d''une application pour une meilleure testabilité.', 'Injection de dépendances'),
('Un langage de requête utilisé pour manipuler et interroger des bases de données relationnelles.', 'SQL'),
('Un système de gestion de bases de données NoSQL très performant et évolutif.', 'MongoDB'),
('Un format d''échange de données léger et lisible par les humains et les machines.', 'JSON'),
('Un protocole de communication utilisé pour les API web, basé sur HTTP.', 'REST'),
('Un protocole de communication alternatif à REST, plus structuré et flexible.', 'GraphQL'),
('Une technologie d''intelligence artificielle permettant aux machines d''apprendre à partir de données.', 'Machine Learning'),
('Un algorithme d''apprentissage automatique utilisé pour la classification et la régression.', 'Réseaux de neurones'),
('Un outil permettant d''automatiser le déploiement et la gestion d''applications en conteneurs.', 'Docker'),
('Un orchestrateur de conteneurs permettant de gérer des applications distribuées.', 'Kubernetes');