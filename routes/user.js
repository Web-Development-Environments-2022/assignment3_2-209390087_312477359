var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    // const user_id = 1;
    // const recipe_id = 2;
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});


//personal recipies:
router.post('/personal', async (req,res,next) => {
  try{
    const title = req.body.title;
    const image = req.body.image;
    const popularity = req.body.popularity;
    const glutenFree = req.body.glutenFree;
    const vegan = req.body.vegan;
    const vegetarian = req.body.vegetarian;
    const servings = req.body.recipe_id;
    const recipeOwner = req.body.recipeOwner;
    const ready_in_minutes = req.body.ready_in_minutes;
    const number_of_servings = req.body.number_of_servings;
    const FamilyRecipe = false;
    const PersonalRecipe = true;
    const instructions = req.body.instructions;
    const extended_ingredients = req.body.extended_ingredients;
    await user_utils.addNEwRecipe(title,image,popularity,glutenFree,vegan,vegetarian,servings,recipeOwner,ready_in_minutes,number_of_servings,FamilyRecipe,PersonalRecipe,instructions,extended_ingredients);
    res.status(200).send("The Recipe successfully saved as personal recipe!");
    } catch(error){
    next(error);
  }
})

 router.get('/personal', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;

    const recipes_id = await user_utils.getPersonalRecipes(user_id,true);
    // const my_recipes = recipes_id;
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

router.post('/family', async (req,res,next) => {
  try{
    const user_id = req.body.user_id;
    console.log(user_id);
    const title = req.body.title;
    const image = req.body.image;
    const popularity = req.body.popularity;
    const glutenFree = req.body.glutenFree;
    const vegan = req.body.vegan;
    const vegetarian = req.body.vegetarian;
    const servings = req.body.servings;
    const recipeOwner = req.body.recipeOwner;
    const ready_in_minutes = req.body.ready_in_minutes;
    const number_of_servings = req.body.number_of_servings;
    const FamilyRecipe = 1;
    const PersonalRecipe = 0;
    const instructions = req.body.instructions;
    const extended_ingredients = req.body.extended_ingredients;
    await user_utils.addNEwRecipe(title,image,popularity,glutenFree,vegan,vegetarian,servings,recipeOwner,ready_in_minutes,user_id,number_of_servings,FamilyRecipe,PersonalRecipe,instructions,extended_ingredients);
    res.status(200).send("The Recipe successfully saved as family recipe!");
    } catch(error){
    next(error);
  }
})

router.get('/family', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;

    const recipes_id = await user_utils.getFamilyRecipes(user_id,true);
    // const my_recipes = recipes_id;
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

router.post('/watched', async (req,res,next) => { //works
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.markAsWatched(user_id,recipe_id);
    res.status(200).send("Watched");
    } catch(error){
    next(error);
  }
})
/**
 * This path returns the visited recipes that were saved by the logged-in user
 */
//  router.get('/watched', async (req,res,next) => {
//   try{
//     const user_id = req.session.user_id;
//     const recipes_id = await user_utils.getWatchedRecipes(user_id);
//     let recipes_array = [];
//     recipes_id.map((element) => recipes_array.push(element.recipe_id)); // recipe ids to array
//     res.status(200).send("succuess");
//   } catch(error){
//     next(error); 
//   }
// });

router.get('/watched', async (req,res,next) => {
  try{
    if (req.session && req.session.user_id) {
      const user_id = req.session.user_id;
      const recipes_id = await user_utils.get3LastWatched(user_id);
      if (recipes_id.length>0)
      {
        let recipes_array = [];
        recipes_id.map((element) => recipes_array.push(element.recipe_id)); 
        const results = await recipe_utils.getRecipesPreview(user_id,recipes_id_array);
        res.status(200).send(results);
      }else
        res.status(200).send(recipes_id);
    }
    else{
      throw { status: 401, message: "you aren't logged in" };
    }
  } catch(error){
    next(error); 
  }
});


router.get('/getLastSeen', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.get3LastSeenRecipes(user_id);
    let recipes_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); 
    const results = await recipe_utils.getRecipesPreview(recipes_array);
    res.status(200).send((results));
  } catch(error){
    next(error); 
  }
});
module.exports = router;
