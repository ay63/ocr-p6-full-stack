
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP(6) DEFAULT NULL,
  email VARCHAR(64) NOT NULL UNIQUE,
  password VARCHAR(64) NOT NULL,
  profile_name VARCHAR(16) NOT NULL,
  updated_at TIMESTAMP(6) DEFAULT NULL
);


CREATE TABLE topics (
  id BIGSERIAL PRIMARY KEY,
  description VARCHAR(256) NOT NULL,
  title VARCHAR(32) NOT NULL UNIQUE
);


CREATE TABLE articles (
  id BIGSERIAL PRIMARY KEY,
  content VARCHAR(2000) NOT NULL,
  created_at TIMESTAMP(6) DEFAULT NULL,
  title VARCHAR(64) NOT NULL,
  updated_at TIMESTAMP(6) DEFAULT NULL,
  author_id BIGINT NOT NULL,
  topic_id BIGINT NOT NULL,
  CONSTRAINT fk_articles_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_articles_topic FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
);


CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  comment VARCHAR(256) NOT NULL,
  created_at TIMESTAMP(6) DEFAULT NULL,
  updated_at TIMESTAMP(6) DEFAULT NULL,
  article_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  CONSTRAINT fk_comments_article FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE subscriptions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP(6) DEFAULT NULL,
  topic_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  CONSTRAINT fk_subscriptions_topic FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE,
  CONSTRAINT fk_subscriptions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


INSERT INTO users (email, password, profile_name, created_at, updated_at) 
VALUES ('josefa.fox@mdd.com', 
        '$2y$10$DC7w9RMXSn.IiFC29AwoauJrvmwT4gzXAlV3pOulyZwl8SdmfmIge', 
        'josefa.fox', 
        NOW(), NOW());

INSERT INTO topics (description, title) VALUES
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


INSERT INTO articles (title, content, created_at, updated_at, author_id, topic_id) VALUES
(
  'Les bases du langage Python',
  'Python est un langage de programmation interprété, facile à apprendre et utilisé dans de nombreux domaines comme le développement web, l''intelligence artificielle et l''automatisation. Sa syntaxe simple et lisible en fait un excellent choix pour les débutants. L''écosystème Python est très riche, avec des bibliothèques comme Django pour le web, NumPy pour les calculs scientifiques et TensorFlow pour l''apprentissage automatique. De plus, sa large communauté garantit un support constant et une évolution rapide du langage.',
  '2024-01-10 10:15:00',
  '2024-01-11 12:00:00',
  1,
  2
),
(
  'Introduction aux bases de données relationnelles',
  'Les bases de données relationnelles permettent de stocker et d''organiser des données de manière structurée. Elles reposent sur le modèle relationnel, où les données sont stockées sous forme de tables reliées entre elles par des clés primaires et étrangères. PostgreSQL et MySQL sont deux SGBD populaires qui implémentent ce modèle. Les requêtes SQL permettent d''interagir avec la base pour insérer, modifier, supprimer et récupérer des informations. La normalisation des bases de données est un processus essentiel pour éviter la redondance et garantir l''intégrité des données. Elle se divise en plusieurs formes normales qui structurent progressivement les données.',
  '2024-02-05 14:30:00',
  '2024-02-06 09:45:00',
  1,
  2
),
(
  'Comprendre le modèle MVC en développement web',
  'Le modèle MVC (Modèle-Vue-Contrôleur) est une architecture logicielle qui sépare les préoccupations d''une application en trois couches distinctes. Le Modèle représente les données et la logique métier. La Vue gère l''affichage des données à l''utilisateur. Le Contrôleur traite les entrées utilisateur et met à jour le modèle ou la vue en conséquence. Cette séparation améliore la maintenabilité et la scalabilité des applications. Des frameworks comme Django, Ruby on Rails et Laravel adoptent cette approche.',
  '2024-02-20 09:00:00',
  '2024-02-21 11:30:00',
  1,
  14
),
(
  'Pourquoi choisir TypeScript pour vos projets JavaScript',
  'TypeScript est un surensemble de JavaScript qui ajoute un système de typage statique et des fonctionnalités modernes pour rendre le développement plus robuste. Il détecte les erreurs à la compilation, évitant ainsi de nombreux bugs à l''exécution. Il permet une meilleure lisibilité et maintenabilité du code grâce à l''utilisation d''interfaces et de types stricts. Il est entièrement compatible avec JavaScript, ce qui facilite l''intégration progressive dans un projet existant. TypeScript est utilisé par de grandes entreprises comme Microsoft, Google et Airbnb pour assurer une meilleure qualité de code dans leurs applications web complexes.',
  '2024-03-01 16:45:00',
  '2024-03-02 08:20:00',
  1,
  1
),
(
  'Les bonnes pratiques en programmation orientée objet',
  'La programmation orientée objet (POO) repose sur quatre principes fondamentaux : l''encapsulation, l''héritage, le polymorphisme et l''abstraction. L''encapsulation permet de regrouper les données et les méthodes qui les manipulent au sein d''une même entité (classe). L''héritage permet à une classe d''hériter des propriétés et méthodes d''une autre classe pour éviter la duplication de code. Le polymorphisme utilise une même interface pour différentes implémentations, ce qui favorise la flexibilité du code. L''abstraction cache les détails d''implémentation et n''expose que l''essentiel aux utilisateurs de la classe. Respecter ces principes permet d''écrire un code plus modulaire, facile à comprendre et à maintenir.',
  '2024-03-15 13:10:00',
  '2024-03-16 14:00:00',
  1,
  3
);
