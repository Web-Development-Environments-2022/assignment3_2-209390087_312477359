var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", (req, res) => res.send("im here"));


/**
 * This path returns a full details of a recipe by its id
 */
router.get("/recipeId/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});


//get 3 random recipes

router.get("/random", async (req,res, next) => {
  try {
    const randomRecipes = await recipes_utils.getRandomRecipes();
    res.send(randomRecipes);
  } catch (error) {
    next(error);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const query = req.query.query;
    const number = req.query.number;
    const cuisine = req.query.cuisine;
    const diet = req.query.diet;
    const intolerances = req.query.intolerances;

    const recipes = await recipes_utils.searchRecipes(req, query, number, cuisine, diet, intolerances);
    res.send(recipes);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
