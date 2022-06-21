const DButils = require("./DButils");



async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into FavoriteRecipes values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from FavoriteRecipes where user_id='${user_id}'`);
    return recipes_id;
}

async function markAsWatched(user_id, recipe_id){
    await DButils.execQuery(`insert into watchedrecipes values('${user_id}',${recipe_id})`);

}

async function getWatchedRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from watchedrecipes where user_id='${user_id}' ORDER BY currtime DESC LIMIT 3`);
    return recipes_id;
}


//add personal recipe: //tested
async function addNEwRecipe(title,image,popularity,glutenFree,vegan,vegetarian,servings,recipeOwner,ready_in_minutes,user_id,FamilyRecipe,PersonalRecipe,instructions,extended_ingredients,WhenPrepared){
    if(title==undefined || image==undefined || popularity==undefined || glutenFree==undefined || vegan==undefined || vegetarian==undefined || servings==undefined || recipeOwner==undefined || ready_in_minutes==undefined   || instructions==undefined  || extended_ingredients==undefined || WhenPrepared==undefined){
        throw { status: 422, message: "There is a Missing Value!" }; 
    }
    else{
        await DButils.execQuery(`insert into mydb.recipe values (NULL,'${title}','${image}','${popularity}','${glutenFree}','${vegan}','${vegetarian}','${servings}','${recipeOwner}','${ready_in_minutes}','${user_id}','${FamilyRecipe}','${PersonalRecipe}','${instructions}','${extended_ingredients}','${WhenPrepared}')`);
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

async function get3LastWatched(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from WatchedRecipes where user_id='${user_id}' ORDER BY watched_date DESC LIMIT 3`);
    return recipes_id;
}
async function returnFamilyRecipes(recipesId){
    ans = []
    for (let i=0; i<recipesId.length; i++){
        toAdd = await DButils.execQuery(`select title,WhenPrepared,popularity,servings,recipeOwner,ready_in_minutes,instructions, extended_ingredients,image from mydb.recipe where id='${recipesId[i].id}';`)
        console.log(toAdd)
        ans.push(toAdd);
    }
    return ans;
}
//add recipe to family recipes-get




exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.markAsWatched=markAsWatched;
exports.getWatchedRecipes=getWatchedRecipes;
exports.addNEwRecipe=addNEwRecipe;
exports.get3LastWatched=get3LastWatched;
exports.getFamilyRecipes=getFamilyRecipes;
exports.getPersonalRecipes=getPersonalRecipes;
exports.returnFamilyRecipes=returnFamilyRecipes;