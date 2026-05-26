const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    tname: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    }
});

module.exports = mongoose.models.Ingredient || mongoose.model('Ingredient', ingredientSchema);