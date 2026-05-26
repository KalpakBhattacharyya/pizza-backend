const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const pizzaRoutes = require('./Routes/pizzaRoutes'); 
const cartRoutes = require('./Routes/cartRoutes');
const authRoutes = require('./Routes/authRoutes');
const orderRoutes = require('./Routes/orderRoutes')
const ingredientRoutes = require('./Routes/ingredientRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/pizzaria')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

app.use('/', pizzaRoutes);
app.use('/', cartRoutes);
app.use('/auth', authRoutes);
app.use('/', orderRoutes);
app.use('/ingredients', ingredientRoutes);

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});