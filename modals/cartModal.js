const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: [true,"user id is required"] },
    orderType: {
        type: String,
        enum: ['pickup', 'delivery'],
        required: [true, "Order type is required"]
    },
    items:[
        {
            itemId: { type: String, required: [true,'product id is required']},
            quantity:  { type: Number, required: [true,'quantity is required']}
        }
    ]
})

module.exports = mongoose.model('cart',cartSchema);