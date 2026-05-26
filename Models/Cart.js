const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    pizza_id: String,
    name: String,
    price: Number,
    image: String,
    quantity: Number,
    toppings: [String]
}, { collection: 'shoppingcarts' });

module.exports = mongoose.model('shoppingcart', CartSchema);