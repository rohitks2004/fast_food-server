const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
        id:{
            type:String,
            required:[true,'item id is required']
        },
        name:{
            type:String,
            required:[true,"item name is required"]
        },
        description:{
            type:String,
            required:[true,"item description is required"]
        },
        price:{
            type:Number,
            required:[true,"item price is requied"]
        },
        image:{
            type:String,
            required:[true,"item image is required"]
        },
        category:{
            type:String,
            requirered:[true,"item categary is required"]
        }
})

module.exports = mongoose.model('item',itemSchema);