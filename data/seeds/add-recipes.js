
exports.seed = async function(knex) {
  await knex('recipes').truncate()
  await knex('recipes').insert([
    {recipe_name: 'Bowl of Cereal'},
    {recipe_name: 'Glass of Milk'},
    {recipe_name: 'PB&J'}
  ])
  await knex('steps').truncate()
  await knex('steps').insert([
    {step_number: 1, 
    step_instructions: "Pour cereal into bowl",
    recipe_id: 1
    },
    {step_number: 2, 
    step_instructions: "Pour milk into bowl",
    recipe_id: 1
    },
    {step_number: 3, 
    step_instructions: "Stir with spoon",
    recipe_id: 1
    },
    {step_number: 4, 
    step_instructions: "Wait for 2 minutes & enjoy!",
    recipe_id: 1
    },
    {step_number: 1, 
    step_instructions: "Pour milk into cup",
    recipe_id: 2
    },
    {step_number: 2, 
    step_instructions: "Enjoy! Milk is good for your bones!",
    recipe_id: 2
    },
    {step_number: 1, 
    step_instructions: "Get bread",
    recipe_id: 3
    },
    {step_number: 2, 
    step_instructions: "Put peanut butter on bread",
    recipe_id: 3
    },
    {step_number: 3, 
    step_instructions: "Put jelly on bread",
    recipe_id: 3
    },
    {step_number: 4, 
    step_instructions: "Put bread together into a sandwich",
    recipe_id: 3
    },
    {step_number: 5, 
    step_instructions: "Yummy! Take a bite and enjoy!",
    recipe_id: 3
    }
  ])
  await knex('ingredients').truncate()
  await knex('ingredients').insert([
    {ingredient_name: 'Cereal'},
    {ingredient_name: 'Milk'},
    {ingredient_name: 'Bread'},
    {ingredient_name: 'Peanut Butter'},
    {ingredient_name: 'Jelly'},
    {ingredient_name: 'Bowl'}
  ])
  await knex('ingredient_quantities').truncate()
  await knex('ingredient_quantities').insert([
    {quantity: 0.5, 
    step_id: 1,
    ingredient_id: 1
    },
    {quantity: 2.25, 
    step_id: 2,
    ingredient_id: 2
    },
    {quantity: 3.5, 
    step_id: 5,
    ingredient_id: 2
    },
    {quantity: 2, 
    step_id: 7,
    ingredient_id: 3
    },
    {quantity: 0.85, 
    step_id: 8,
    ingredient_id: 4
    },
    {quantity: 0.85, 
    step_id: 9,
    ingredient_id: 5
    },
    {quantity: 1, 
    step_id: 1,
    ingredient_id: 6
    }
  ])
};
