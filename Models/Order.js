const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    customerName: { type: String, default: 'Customer' },
    items: [{ name: String, quantity: Number, price: Number, toppings: [String], image: String, pizza_id: String }],
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, default: "Received" }
},
{ timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);