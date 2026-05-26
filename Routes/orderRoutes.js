const express = require('express');
const router = express.Router();
const Order = require('../Models/Order');
const Cart = require('../Models/Cart');
const {isAdmin} = require('../Middleware/authMiddleware');
const { generateInvoicePDF } = require('../utils/invoiceGenerator');

router.post('/orders/checkout', async (req, res) => {
    try {
        const { userId, customerName, totalAmount, address } = req.body;
        if (!address) {
            return res.status(400).json({ message: "Delivery address is required!" });
        }
        const cartItems = await Cart.find({ userId });
        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        const newOrder = new Order({
            userId,
            customerName,
            totalAmount,
            address,
            items: cartItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                toppings: item.toppings,
                image: item.image,
                pizza_id: item.pizza_id
            }))
        });
        await newOrder.save();
        await Cart.deleteMany({ userId });
        res.json({ message: "Order placed successfully", orderId: newOrder._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/orders', async (req, res) => {
    try {
        const { userId } = req.query;
        const orders = await Order.find({ userId }).sort({ orderDate: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/admin/all', isAdmin, async (req, res) => {
    try {
        // .sort({ createdAt: -1 }) brings the newest orders to the top
        const allOrders = await Order.find().sort({ createdAt: -1 });
        res.json(allOrders);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch orders." });
    }
});

router.get('/admin/stats', isAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        
        // 1. Setup "Today" boundary
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        // 2. Calculations
        let totalRevenue = 0;
        let todaysRevenue = 0;
        let todaysOrdersCount = 0;
        const itemCounts = {};

        orders.forEach(order => {
            const orderAmount = order.totalAmount || 0;
            totalRevenue += orderAmount;

            // Check if order was placed today
            if (new Date(order.createdAt) >= startOfToday) {
                todaysRevenue += orderAmount;
                todaysOrdersCount++;
            }

            // Count items for Top Seller (All-time)
            order.items.forEach(item => {
                itemCounts[item.name] = (itemCounts[item.name] || 0) + (item.quantity || 1);
            });
        });

        // 3. Determine Top Seller
        const topSeller = Object.keys(itemCounts).length > 0 
            ? Object.keys(itemCounts).reduce((a, b) => itemCounts[a] > itemCounts[b] ? a : b) 
            : "N/A";

        // 4. SEND EVERYTHING BACK
        res.json({
            totalRevenue,
            todaysRevenue,
            totalOrders: orders.length,
            todaysOrdersCount,
            topSeller
        });
    } catch (err) {
        res.status(500).json({ message: "Error calculating stats", error: err.message });
    }
});

router.get('/orders/invoice/:orderId', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        generateInvoicePDF(order, (pdfBuffer) => {
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=invoice_${order._id.toString().slice(-6)}.pdf`,
                'Content-Length': pdfBuffer.length
            });
            res.end(pdfBuffer);
        });
    } catch (err) {
        res.status(500).json({ message: "Error generating invoice", error: err.message });
    }
});

router.put('/admin/order/:id/status', isAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        // Find the order by ID and update just the status field
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            { status: status }, 
            { returnDocument: 'after' }
        );
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: "Failed to update order status." });
    }
});

module.exports = router;