const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into FavoriteRecipes values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from FavoriteRecipes where user_id='${user_id}'`);
    return recipes_id;
}

//add personal recipe:
async function addNEwRecipe(title,image,popularity,glutenFree,vegan,vegetarian,servings,recipeOwner,ready_in_minutes,number_of_servings,FamilyRecipe,PersonalRecipe,instructions,extended_ingredients){
    if(title==undefined || image==undefined || popularity==undefined || glutenFree==undefined || vegan==undefined || vegetarian==undefined || servings==undefined || recipeOwner==undefined || ready_in_minutes==undefined || number_of_servings==undefined || FamilyRecipe==undefined  || PersonalRecipe==undefined  || instructions==undefined  || extended_ingredients==undefined ){
        throw { status: 422, message: "There is a Missing Value!" }; 
    }
    else{
        await DButils.execQuery(`insert into mydb.recipe values ('${title}','${image}','${popularity}','${glutenFree}','${vegan}','${vegetarian}','${servings}','${recipeOwner}','${ready_in_minutes}','${number_of_servings}','${FamilyRecipe}','${PersonalRecipe}','${instructions}','${extended_ingredients}')`);
    }
}
async function getPersonalRecipes(user_id,PersonalRecipe){
    const recipes_id = await DButils.execQuery(`select * from mydb.recipe where user_id='${user_id}' AND PersonalRecipe=${PersonalRecipe};`);
    return recipes_id;
}

async function getFamilyRecipes(user_id,FamilyRecipe){
    const recipes_id = await DButils.execQuery(`select * from mydb.recipe where user_id='${user_id}' AND FamilyRecipe=${FamilyRecipe};`);
    return recipes_id;
}


//add recipe to family recipes-get



exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
