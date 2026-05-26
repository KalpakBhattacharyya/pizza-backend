const express = require('express');
const router = express.Router();
const Ingredient = require('../Models/Ingredient');

router.get('/', async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.json(ingredients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newIngredient = new Ingredient(req.body);
        await newIngredient.save();
        res.status(201).json(newIngredient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Ingredient.findByIdAndDelete(req.params.id);
        res.json({ message: "Ingredient deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;