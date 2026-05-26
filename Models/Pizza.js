const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
    id: String,
    type: { type: String, required: true, default: 'veg' },
    price: Number,
    name: String,
    image: String,
    description: String,
    ingredients: [String],
    topping: [String]
}, {collection: 'pizzas'});

module.exports = mongoose.model('pizzas', PizzaSchema);
    