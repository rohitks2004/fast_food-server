const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required for order"]
    },
    address: {
        type: String,
        required: function() {
            return this.orderType === 'delivery';
        },
        validate: {
            validator: function(v) {
                return this.orderType === 'delivery' ? !!v : true;
            },
            message: "Address is required for delivery orders"
        }
    },
    phone: {
        type: String,
        required: [true, "Phone number is required for order"]
    },
    items: [{
        itemId: {
            type: String,
            required: [true, "Item ID is required for order"]
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"]
        }
    }],
    orderTime: {
        type: Date,
        default: Date.now,
        required: [true, "Order time is required"]
    },
    availableTime: {
        type: Date,
        default :function(){
            const date = new Date;
            date.setTime(date.getTime() + 30 * 60000);
            return date
        },
        required: [true, "Available time is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required for order"]
    },
    orderType: {
        type: String,
        enum: ['pickup', 'delivery'],
        required: [true, "Order type is required"]
    }
});

// orderSchema.pre('save', function(next) {
//     if (!this.availableTime) {
//         const estimatedTime = 30; // Assume 30 minutes to prepare an order
//         this.availableTime = new Date(this.orderTime.getTime() + estimatedTime * 60000);
//     }
//     next();
// });

module.exports = mongoose.model('Order', orderSchema);

// const moment = require('moment');
// const formattedOrderTime = moment(order.orderTime).format('MMMM Do YYYY, h:mm:ss a');
// const formattedAvailableTime = moment(order.availableTime).format('MMMM Do YYYY, h:mm:ss a');

