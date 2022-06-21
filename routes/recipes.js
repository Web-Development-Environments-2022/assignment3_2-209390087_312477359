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
    if (req.session && req.session.user_id) {
      req.session.last_search = req.body.query
    }

    const query = req.body.query;
    const return_num = req.body.number;
    const cuisine = req.body.cuisine;
    const diet = req.body.diet;
    const intolerances = req.body.intolerances;

    const recipes_to_return = await recipes_utils.searchRecipes(req, query, return_num, cuisine, diet, intolerances);
     if(recipes_to_return.data.results.length == 0){
       res.send("Thers is no results!")
    }
    console.log(recipes_to_return.data.results.length)
    console.log("recipes_to_return")

    console.log(recipes_to_return.data.results)

    ans = [];
    var toAdd;
    for(let i=0; i<recipes_to_return.data.results.length; i++){
      toAdd = await recipes_utils.getRecipeDetails(recipes_to_return.data.results[i].id);
      ans.push(toAdd)
    }
    res.send(ans);
  } catch (error) {
    next(error);
  }
});
router.get("/getLastRecipeSearch", async (req, res, next) => {
  try {

    if (req.session && req.session.user_id) {
      result = req.session.last_search 
      
    }

    else {
      result = "you shoul be logged in!"
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
