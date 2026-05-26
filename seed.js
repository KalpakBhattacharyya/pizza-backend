const mongoose = require('mongoose');
const Pizza = require('./Models/Pizza');
const Ingredient = require('./Models/Ingredient');

const ingredientsData = [
  { "id": 101, "tname": "Pepperoni", "price": 110, "image": "https://thumb1.shutterstock.com/display_pic_with_logo/55755/161642033/stock-photo-single-slice-of-pepperoni-meat-isolated-on-white-with-path-shot-from-above-161642033.jpg" },
  { "id": 102, "tname": "Mushroom", "price": 35, "image": "https://thumb9.shutterstock.com/display_pic_with_logo/1207547/568114672/stock-photo-fresh-cultivated-button-mushrooms-and-twigs-of-parsley-in-the-wooden-basket-one-whole-mushroom-and-568114672.jpg" },
  { "id": 103, "tname": "Black beans", "price": 45, "image": "https://thumb1.shutterstock.com/display_pic_with_logo/180783430/755093356/stock-photo-black-beans-grain-on-white-background-755093356.jpg" },
  { "id": 104, "tname": "Black olive", "price": 50, "image": "https://thumb7.shutterstock.com/display_pic_with_logo/137002/244097551/stock-photo-black-cut-olive-rings-isolated-on-white-244097551.jpg" },
  { "id": 105, "tname": "Green olive", "price": 50, "image": "https://thumb7.shutterstock.com/display_pic_with_logo/4526794/639321544/stock-photo-stuffed-olives-isolated-on-white-background-639321544.jpg" },
  { "id": 106, "tname": "Jalapeno", "price": 45, "image": "https://thumb7.shutterstock.com/display_pic_with_logo/999701/250939984/stock-photo-sliced-green-jalapeno-peppers-on-white-background-250939984.jpg" },
  { "id": 107, "tname": "Chicken", "price": 60, "image": "https://thumb7.shutterstock.com/display_pic_with_logo/371512/583587001/stock-photo-fresh-raw-chicken-isolated-on-white-583587001.jpg" },
  { "id": 108, "tname": "Tomato", "price": 20, "image": "https://thumb1.shutterstock.com/display_pic_with_logo/721492/400195690/stock-photo-tomatoes-isolated-on-white-background-400195690.jpg" },
  { "id": 109, "tname": "Red Paprika", "price": 30, "image": "https://thumb9.shutterstock.com/display_pic_with_logo/676765/343609895/stock-photo-chili-pepper-isolated-on-a-white-background-343609895.jpg" },
  { "id": 110, "tname": "Paneer", "price": 45, "image": "https://thumb7.shutterstock.com/display_pic_with_logo/605002/195341264/stock-photo-piece-of-cheese-or-paneer-isolated-on-a-white-background-195341264.jpg" },
  { "id": 111, "tname": "Fried Onion", "price": 18, "image": "https://thumb1.shutterstock.com/display_pic_with_logo/152950/630261116/stock-photo-delicious-crispy-fried-onion-rings-isolated-on-white-630261116.jpg" },
  { "id": 112, "tname": "Capsicum", "price": 15, "image": "https://thumb7.shutterstock.com/display_pic_with_logo/259963/259963,1235208469,1/stock-photo-vegetables-bulgarian-pepper-on-a-white-background-isolated-25335661.jpg" },
  { "id": 114, "tname": "Sweet corn", "price": 38, "image": "https://thumb7.shutterstock.com/display_pic_with_logo/3102608/706329457/stock-photo-sweet-corn-in-wooden-bowl-and-spoon-isolated-on-white-background-706329457.jpg" }
];

const pizzasData = [
  { "id": "0001", "type": "veg", "price": 290, "name": "Paneer Tikka", "image": "https://thumb9.shutterstock.com/display_pic_with_logo/376831/127528958/stock-photo-delicious-italian-pizza-over-white-127528958.jpg", "description": "Marinated tikka sauce and paneer", "ingredients": ["dough", "sauce", "cheese"], "topping": ["Paneer", "Onion", "Olive", "Capsicum"] },
  { "id": "0002", "type": "nonveg", "price": 350, "name": "Chicken Italiaona", "image": "https://thumb7.shutterstock.com/display_pic_with_logo/96886/96886,1274350207,7/stock-photo-pizza-53553874.jpg", "description": "Sugary taste and creamy touch", "ingredients": ["pizza mix", "cheese", "butter"], "topping": ["Pepperoni", "Sausage", "Mushroom", "Capsicum"] },
  { "id": "0003", "type": "veg", "price": 310, "name": "Veggie Supreme", "image": "https://thumb1.shutterstock.com/display_pic_with_logo/1003451/770556520/stock-photo-hot-pizza-with-pepperoni-sausage-on-a-dark-background-with-copy-space-pizza-with-mushrooms-770556520.jpg", "description": "Crushed garlic and herbs", "ingredients": ["pizza mix", "garlic", "butter"], "topping": ["Onion", "Corn", "Mushroom", "Capsicum"] },
  { "id": "0004", "type": "nonveg", "price": 400, "name": "Tripple Chicken Feast", "image": "https://thumb9.shutterstock.com/display_pic_with_logo/2793292/332497832/stock-photo-mixture-pizza-italian-food-332497832.jpg", "description": "Greek dressing with keema", "ingredients": ["dough", "cheese", "dressing"], "topping": ["Keema", "Onion", "Meat ball", "Capsicum"] },
  { "id": "0005", "type": "nonveg", "price": 625, "name": "Ultimate Chicken", "image": "https://thumb7.shutterstock.com/display_pic_with_logo/2793292/246331354/stock-photo-pizza-margherita-italian-246331354.jpg", "description": "BBA sauce and flavored butter", "ingredients": ["deep dish mix", "BBQ sauce", "butter"], "topping": ["Pepperoni", "Meat ball", "Sausage", "Keema"] }
];

mongoose.connect('mongodb://127.0.0.1:27017/pizzaria')
    .then(async () => {
        console.log("Seeding Database...");
        await Pizza.deleteMany({});
        await Ingredient.deleteMany({});
        await Pizza.insertMany(pizzasData);
        await Ingredient.insertMany(ingredientsData);
        console.log("Data Seeded Successfully!");
        process.exit();
    })
    .catch(err => console.log(err));