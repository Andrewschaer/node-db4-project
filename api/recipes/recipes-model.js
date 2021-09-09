const db = require('../../data/db-config');

async function getRecipeById(recipe_id) {
    /* SQL QUERY TO MODEL FUNCTION OFF OF:
        SELECT r.recipe_id,
            r.recipe_name,
            r.created_at
            s.step_id,
            s.step_number,
            s.step_instructions,
            q.quantity,
            i.ingredient_name,
            i.ingredient_id
        FROM recipes as r
        LEFT JOIN steps as s ON r.recipe_id = s.recipe_id
        LEFT JOIN step_ingredients as q ON s.step_id = q.step_id
        LEFT JOIN ingredients as i ON q.ingredient_id = i.ingredient_id; */
    const dbResult = await db('recipes as r')
        .leftJoin('steps as s', 'r.recipe_id', 's.recipe_id')
        .leftJoin('step_ingredients as q', 's.step_id', 'q.step_id')
        .leftJoin('ingredients as i', 'q.ingredient_id', 'i.ingredient_id')
        .select('r.recipe_id', 'r.recipe_name', 'r.created_at', 
        's.step_id', 's.step_number', 's.step_instructions', 
        'q.quantity', 'i.ingredient_name', 'i.ingredient_id')
        .where('r.recipe_id', recipe_id);
    /* SQL QUERY TO MODEL FUNCTION OFF OF:
        SELECT s.step_id, s.step_number, s.step_instructions
        FROM steps as s
        LEFT JOIN recipes as r on s.recipe_id = r.recipe_id
        WHERE r.recipe_id = 1 */11

    const uniqueSteps = []
    dbResult.filter(function(obj){
        let i = uniqueSteps.findIndex(x => (x.step_id == obj.step_id))
        if(i <= -1){
            uniqueSteps.push({step_id: obj.step_id, step_number: obj.step_number, step_instructions: obj.step_instructions, ingredients: []});
        }
        return null
    })

    for (let i = 1; i < uniqueSteps.length + 1; i++) {
        dbResult.forEach(obj => {
            if (obj.step_number === i && obj.ingredient_id !== null) {
                uniqueSteps[i-1].ingredients.push({ingredient_id: obj.ingredient_id, ingredient_name: obj.ingredient_name, quantity: obj.quantity})
            }
        })
    }

    const result = {
        recipe_id: dbResult[0].recipe_id,
        recipe_name: dbResult[0].recipe_name,
        created_at: dbResult[0].created_at,
        steps: uniqueSteps
    }

    return result;
}

/*{
  "recipe_id" : 1,
  "recipe_name": "Spaghetti Bolognese",
  "created_at": "2021-01-01 08:23:19.120",
  "steps": [
    {
      "step_id": 11,
      "step_number": 1,
      "step_instructions": "Put a large saucepan on a medium heat",
      "ingredients": []
    },
    {
      "step_id": 12,
      "step_number": 2,
      "step_instructions": "Add 1 tbsp olive oil",
      "ingredients": [
        { "ingredient_id": 27, "ingredient_name": "olive oil", "quantity": 0.014 }
      ]
    },
  ]
}*/

module.exports = { getRecipeById };