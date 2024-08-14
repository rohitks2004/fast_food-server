const express = require("express");
const app = express();
const mongoose = require('mongoose');
const itemRoutes = require('./routes/itemRoutes')
const userRoutes = require('./routes/userRoutes')
const cartRoutes =require('./routes/cartRoute.js')
const orderRoutes = require('./routes/orderRoute');

app.use(express.json());

mongoose.connect(
    'mongodb+srv://ksrohit25:ZqueG2A4I3eYg6HU@cluster0.rq5ngav.mongodb.net/fast_food'
    // 'mongodb://localhost:27017/food-delivery'
).then(()=>console.log("MongoDB connected")
).catch(()=>console.log("MongoDB connection Failed"))

app.use('/item',itemRoutes);
app.use('/user',userRoutes);
app.use('/cart',cartRoutes);
app.use('/order',orderRoutes);

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})