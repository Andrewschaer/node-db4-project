const express = require('express');
const Recipe = require('./recipes-model');

const router = express.Router();

router.get('/:recipe_id', async (req, res, next) => {
    const { recipe_id } = req.params;
    Recipe.getRecipeById(recipe_id)
        .then(recipe => {
        res.status(200).json(recipe)
        })
        .catch(next)
});

module.exports = router;