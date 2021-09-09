const express = require('express');
const Recipe = require('./recipes-model');

const router = express.Router();

router.get('/:recipe_id', async (req, res, next) => {
    const result = await Recipe.getRecipeById(req.params.recipe_id)
    res.json(`TBD ENDPOINT RESULT - THIS IS REQ-PARAMS-RECIPE_ID: ${req.params.recipe_id} - THIS IS RESULT: ${result}`);
});

module.exports = router;