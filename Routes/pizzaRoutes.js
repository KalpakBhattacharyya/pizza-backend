const express = require('express');
const router = express.Router();
const Pizza = require('../Models/Pizza');
const Ingredient = require('../Models/Ingredient');
const { isAdmin } = require('../Middleware/authMiddleware');

router.get('/pizzas', async (req, res) => {
    const pizzas = await Pizza.find();
    res.json(pizzas);
});

router.get('/ingredients', async (req, res) => {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
});

router.post('/add', isAdmin, async (req, res) => {
    try {
        const newPizza = new Pizza(req.body);
        await newPizza.save();
        res.status(201).json(newPizza);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', isAdmin, async (req, res) => {
    await Pizza.findByIdAndDelete(req.params.id);
    res.json({ message: "Pizza deleted successfully" });
});

module.exports = router;