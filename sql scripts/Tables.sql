CREATE TABLE Users(
    user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    country VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    profilePicUrl VARCHAR(255)
) DEFAULT CHARSET UTF8;

CREATE TABLE Recipe(  
    id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    image VARCHAR(255),
    popularity int,
    glutenFree BOOLEAN,
    vegan BOOLEAN,
    vegetarian BOOLEAN,
    servings int,
    recipeOwner VARCHAR(255),
    ready_in_minutes VARCHAR(255),
    user_id int,
    isFamilyRecipe BOOLEAN,
    instructions text,
    extended_ingredients text
    primary key (id, title)
) DEFAULT CHARSET UTF8;

CREATE TABLE `metadata` (
  `user_id` int NOT NULL,
  `FavoriteRecipes` json DEFAULT NULL,
  `WatchedRecipes` json DEFAULT NULL,
  `PersonalRecipes` json DEFAULT NULL,
  `Meal` json DEFAULT NULL,
  `FamilyRecipes` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci