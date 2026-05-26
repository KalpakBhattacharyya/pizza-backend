const express = require('express');
const router = express.Router();
const Cart = require('../Models/Cart')

router.post('/cart', async (req, res) => {
    try {
        const { userId, pizza_id, name, price, image, toppings } = req.body;
        
        const existingItem = await Cart.findOne({ 
            userId,
            pizza_id, 
            toppings: { $exists: true, $eq: [] } 
        });

            if (existingItem && (!toppings || toppings.length === 0)) {
            existingItem.quantity += 1;
            await existingItem.save();
            res.json(existingItem);
        } else {
                const newItem = new Cart({ 
                userId, pizza_id, name, price, image, 
                quantity: 1, 
                toppings: toppings || [] 
            });
            await newItem.save();
            res.json(newItem);
        }
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/cart', async (req, res) => {
    const {userId} = req.query;
    if(!userId) return res.json([])
    const items = await Cart.find({userId});
    res.json(items);
});

router.put('/cart/:id/customize', async (req, res) => {
    try {
        const { toppings, price } = req.body;
        const updatedCartItem = await Cart.findByIdAndUpdate(
            req.params.id,
            { toppings: toppings, price: price },
            { returnDocument: 'after' }
        );

        if (!updatedCartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.json(updatedCartItem);
    } catch (err) {
        res.status(500).json({ message: "Error updating customization", error: err.message });
    }
});

router.delete('/cart/:id', async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

router.delete('/cart', async (req, res) => {
    try {
        const {userId}=req.query;
        await Cart.deleteMany({userId});
        res.json({ message: "Cart cleared successfully" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/cart/:id', async (req, res) => {
    try {
        const { quantity } = req.body;
        const updatedItem = await Cart.findByIdAndUpdate(
            req.params.id, 
            { quantity: quantity }, 
            { new: true }
        );
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;