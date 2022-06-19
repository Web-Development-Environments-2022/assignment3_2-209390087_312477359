const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}



async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        
    }
}

async function getRandomRecipes() {
    // TODO fetch random recipes from Spooncaular API
    let randoms = [] 
            number = 3
            randoms = await axios.get(`${api_domain}/random`, {
                params: {
                    apiKey: process.env.spooncular_apiKey,
                    number: number
                }
            })
        let res = []
        for (let i = 0; i< randoms.data["recipes"].length; i++){
            res.push(await getRecipeDetails( randoms.data["recipes"][i].id))
        }  
        return ShowRecipe(res)


}

function ShowRecipe(recipes) {
return recipes.map((recipe) => {
        const {
            id,
            title,
            readyInMinutes,
            aggregateLikes,
            servings,
            vegetarian,
            vegan,
            glutenFree,
            image,
        } = recipe;
        return {
            id: id,
            title: title,
            ready_in_minutes: readyInMinutes,
            aggregate_likes: aggregateLikes,
            serving: servings,
            vegetarian: vegetarian,
            vegan: vegan,
            gluten_free: glutenFree,
            image: image,
        }
    }
);
}
exports.getRecipeDetails = getRecipeDetails;
exports.getRandomRecipes = getRandomRecipes;
exports.ShowRecipe = ShowRecipe;



