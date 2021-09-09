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
        LEFT JOIN ingredient_quantities as q ON s.step_id = q.step_id
        LEFT JOIN ingredients as i ON q.ingredient_id = i.ingredient_id; */
    const dbResult = await db('recipes as r')
        .leftJoin('steps as s', 'r.recipe_id', 's.recipe_id')
        .leftJoin('ingredient_quantities as q', 's.step_id', 'q.step_id')
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
    const dbResultByStep = await db ('steps as s')
        .leftJoin ('recipes as r', 's.recipe_id', 'r.recipe_id')
        .select('s.step_id', 's.step_number', 's.step_instructions')
        .where('r.recipe_id', recipe_id);

    const uniqueSteps = []
    dbResult.filter(function(obj){
        let i = uniqueSteps.findIndex(x => (x.step_id == obj.step_id))
        if(i <= -1){
            uniqueSteps.push({step_id: obj.step_id, step_number: obj.step_number, step_instructions: obj.step_instructions});
        }
        return null
    })

    // const result = {
    //     recipe_id: dbResult[0].recipe_id,
    //     recipe_name: dbResult[0].recipe_name,
    //     created_at: dbResult[0].created_at,
    //     steps: uniqueSteps.map(obj => ({
    //         step_id: obj.step_id,
    //         step_number: obj.step_number,
    //         instructions: obj.instructions,
    //         ingredients: dbResult.map(obj2 => (
    //             if (obj2.step_id === obj.step_id) {
    //                 ingredient_id: obj2.ingredient_id 
    //             }
    //         ))
    //     }))
    // }

    return dbResultByStep;
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