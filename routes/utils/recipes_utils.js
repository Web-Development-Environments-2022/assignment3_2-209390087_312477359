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
        console.log(res)
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

async function getRecipePreview(recipe_id) {
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

async function getAllRecipesPreview(ids) {
    let results = []
    for (let i = 0; i < ids.length; i++) {
        let preview= await getRecipePreview(recipes_id[i]);
        results.push(preview)
    }
    return results
}


async function searchRecipes(req, query, return_num, cuisine, diet, intolerances) {
    if(!return_num){
        return_num = 5 //by deafult
    }
    let res = await axios.get(`${api_domain}/complexSearch`,
    {
        params: {
            user_id: req.session.user_id,
            apiKey: process.env.spooncular_apiKey,
            query: query, 
            number: return_num,
            cuisine: cuisine, 
            diet: diet,
            intolerances: intolerances,
            instructionsRequired: true,
            addRecipeInformation: true
        },
        

    });

    return res
//     console.log("res")
//     console.log(res.data.results)
//     ids_of_recipes_return = [];
//     // res.forEach(element => {
//     //     ids_of_recipes_return.push(element.id)
//     // })
//     // for (let i=0; i<res.length; i++)
//     // ids_of_recipes_return.push(res.data.results[i].id);
     
//     console.log(ids_of_recipes_return)
//     ids_of_recipes_return.forEach(element => {
//         return getRecipeDetails(element)
//     });
//   //  return getRecipeDetails(ids_of_recipes_return)

}



exports.getRecipeDetails = getRecipeDetails;
exports.searchRecipes= searchRecipes;
exports.getRecipePreview=getRecipePreview;
exports.getAllRecipesPreview=getAllRecipesPreview;
exports.getRandomRecipes = getRandomRecipes;
exports.ShowRecipe = ShowRecipe;



